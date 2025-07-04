# CarusoMA Website

This is the official website for CarusoMA, built with [Next.js](https://nextjs.org) and optimized for Windows 11.

## System Requirements

- Windows 11 (version 24H2 or later)
- Node.js 18.x or later
- PowerShell 7 or later
- Git for Windows

## Development Environment Setup

1. **Install Node.js**
   - Download and install Node.js from [nodejs.org](https://nodejs.org)
   - Recommended version: 18.x LTS or later

2. **Install Git for Windows**
   - Download from [git-scm.com](https://git-scm.com/download/win)
   - Use the default installation options

3. **Clone the Repository**
   ```powershell
   git clone https://github.com/somacaru/carusoma.com.git
   cd carusoma.com
   ```

4. **Install Dependencies**
   ```powershell
   npm install
   ```

5. **Start Development Server**
   ```powershell
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
carusoma.com/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── about/       # About page
│   │   ├── services/    # Services page
│   │   ├── resources/   # Resources page
│   │   ├── contact/     # Contact page
│   │   └── page.tsx     # Home page
│   └── components/      # Reusable components
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- Next.js 15.2.4
- React 18.2.0
- TypeScript
- Tailwind CSS
- ESLint

## Deployment

### Google Cloud Run Deployment (Recommended)

This project is configured for deployment on Google Cloud Run using Docker containers.

#### Prerequisites

1. **Install Google Cloud SDK**
   - Download from [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install)
   - Run `gcloud init` to set up your account

2. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Cloud Run API

3. **Install Docker Desktop**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)
   - Ensure Docker is running

#### Quick Deployment

1. **Update the deployment script**
   ```bash
   # Edit deploy.sh and replace "your-project-id" with your actual project ID
   PROJECT_ID="your-actual-project-id"
   ```

2. **Make the script executable and run it**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

#### Manual Deployment Steps

1. **Authenticate with Google Cloud**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Build and push the Docker image**
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/carusoma-website .
   docker push gcr.io/YOUR_PROJECT_ID/carusoma-website
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy carusoma-website \
     --image gcr.io/YOUR_PROJECT_ID/carusoma-website \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 3000
   ```

#### Automated Deployment with Cloud Build

1. **Enable Cloud Build API**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   ```

2. **Deploy using Cloud Build**
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

### Alternative Deployment Options

- **Vercel**: For simple deployments with automatic scaling
- **AWS Amplify**: For AWS ecosystem integration
- **Azure Static Web Apps**: For Microsoft ecosystem integration

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Support

For Windows 11 specific issues:
- Ensure you're running the latest Windows updates
- Use PowerShell 7 for all terminal commands
- If you encounter path-related issues, use forward slashes (/) in your code and backslashes (\\) in PowerShell commands

For Google Cloud deployment issues:
- Check the [Cloud Run documentation](https://cloud.google.com/run/docs)
- Ensure all required APIs are enabled
- Verify your project has billing enabled

## License

[Add your license information here]
