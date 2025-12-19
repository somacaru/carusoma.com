import { Storage } from '@google-cloud/storage';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

// Storage configuration
const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'arcanedigitalshield-contact-submissions';
const FILE_NAME = 'contact-submissions.json';

// Local file storage paths
const SUBMISSIONS_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, FILE_NAME);

// Check if we should use Cloud Storage
function shouldUseCloudStorage(): boolean {
  // Use Cloud Storage if:
  // 1. We're in production (NODE_ENV=production) - Cloud Run sets this
  // 2. GCS_BUCKET_NAME is explicitly set
  // 3. Running on Cloud Run (has GCP metadata server)
  const isProduction = process.env.NODE_ENV === 'production';
  const hasBucketName = !!process.env.GCS_BUCKET_NAME;
  const isCloudRun = !!process.env.K_SERVICE; // Cloud Run sets this
  
  // Only use Cloud Storage in production/Cloud Run environment
  // This prevents trying to use GCS in local dev unless explicitly configured
  return (isProduction || isCloudRun) && hasBucketName;
}

// Initialize Cloud Storage client (only if needed)
let storageClient: Storage | null = null;
let storageClientInitialized = false;
function getStorageClient(): Storage | null {
  if (!shouldUseCloudStorage()) {
    return null;
  }

  // Only try to initialize once
  if (storageClientInitialized) {
    return storageClient;
  }

  try {
    storageClient = new Storage();
    storageClientInitialized = true;
    return storageClient;
  } catch (error) {
    console.warn('Failed to initialize Cloud Storage, will use local storage fallback:', error);
    storageClientInitialized = true; // Mark as initialized to prevent retries
    return null;
  }
}

// Ensure local data directory exists
async function ensureDataDir() {
  if (!existsSync(SUBMISSIONS_DIR)) {
    await mkdir(SUBMISSIONS_DIR, { recursive: true });
  }
}

// Read submissions from Cloud Storage
async function readFromCloudStorage(): Promise<ContactSubmission[]> {
  const client = getStorageClient();
  if (!client) {
    throw new Error('Cloud Storage client not available');
  }

  try {
    const bucket = client.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      return [];
    }

    // Download and parse
    const [contents] = await file.download();
    const data = JSON.parse(contents.toString('utf-8'));
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    // If bucket doesn't exist or file doesn't exist, return empty array
    if (error.code === 404 || error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Write submissions to Cloud Storage
async function writeToCloudStorage(submissions: ContactSubmission[]): Promise<void> {
  const client = getStorageClient();
  if (!client) {
    throw new Error('Cloud Storage client not available');
  }

  try {
    const bucket = client.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_NAME);

    // Ensure bucket exists (create if it doesn't)
    const [bucketExists] = await bucket.exists();
    if (!bucketExists) {
      await bucket.create({
        location: 'us-central1',
        storageClass: 'STANDARD',
      });
    }

    // Upload JSON data
    const jsonData = JSON.stringify(submissions, null, 2);
    await file.save(jsonData, {
      contentType: 'application/json',
      metadata: {
        cacheControl: 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error writing to Cloud Storage:', error);
    throw error;
  }
}

// Read submissions from local file
async function readFromLocalFile(): Promise<ContactSubmission[]> {
  try {
    await ensureDataDir();
    if (!existsSync(SUBMISSIONS_FILE)) {
      return [];
    }
    const data = await readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local file:', error);
    return [];
  }
}

// Write submissions to local file
async function writeToLocalFile(submissions: ContactSubmission[]): Promise<void> {
  try {
    await ensureDataDir();
    await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local file:', error);
    throw error;
  }
}

// Main read function - tries Cloud Storage first, falls back to local
export async function readSubmissions(): Promise<ContactSubmission[]> {
  const client = getStorageClient();
  
  if (client) {
    try {
      return await readFromCloudStorage();
    } catch (error) {
      console.warn('Cloud Storage read failed, trying local fallback:', error);
      // Fall back to local storage
      return await readFromLocalFile();
    }
  }
  
  // Use local storage
  return await readFromLocalFile();
}

// Main write function - tries Cloud Storage first, falls back to local
export async function writeSubmissions(submissions: ContactSubmission[]): Promise<void> {
  const client = getStorageClient();
  
  if (client) {
    try {
      await writeToCloudStorage(submissions);
      // Also write to local as backup (optional)
      try {
        await writeToLocalFile(submissions);
      } catch (localError) {
        // Ignore local backup errors
        console.warn('Local backup write failed:', localError);
      }
      return;
    } catch (error) {
      console.warn('Cloud Storage write failed, using local fallback:', error);
      // Fall back to local storage
      await writeToLocalFile(submissions);
      return;
    }
  }
  
  // Use local storage
  await writeToLocalFile(submissions);
}
