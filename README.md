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
   git clone https://github.com/yourusername/carusoma.com.git
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

- Next.js 14.1.0
- React 18.2.0
- TypeScript
- Tailwind CSS
- ESLint

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Deployment

The site is configured for deployment on Vercel. For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Support

For Windows 11 specific issues:
- Ensure you're running the latest Windows updates
- Use PowerShell 7 for all terminal commands
- If you encounter path-related issues, use forward slashes (/) in your code and backslashes (\\) in PowerShell commands

## License

[Add your license information here]
