# BigEQ Authorize Dashboard

A React + TypeScript dashboard application for BigEQ authorization management.

## Getting Started

These instructions will help you set up the project for local development.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kkeeling/bigeq-authorize-dashboard.git
   cd bigeq-authorize-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Open .env and update the values for your local development
   # Required variables:
   # - VITE_API_URL: Your local API endpoint
   # - VITE_APP_TITLE: Application title for development
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Environment Variables

The application uses environment variables for configuration. These are managed through `.env` files:

- `.env.example`: Template with placeholder values (committed to repository)
- `.env`: Local development values (not committed to repository)

**Important**: Never commit sensitive information or actual API keys to the repository. Always use `.env` for local development and ensure it's listed in `.gitignore`.

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## Project Structure

```
├── .do/              # Digital Ocean configuration
│   └── app.yaml      # App Platform specification
├── .github/
│   └── workflows/    # GitHub Actions workflows
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components/routes
│   ├── services/     # API and service integrations
│   └── lib/          # Utility functions and helpers
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore rules
└── ... configuration files
```

## Deployment

### Staging Environment

The application is automatically deployed to Digital Ocean App Platform when changes are pushed to the `sprint-main` branch. The staging environment is accessible at the URL provided by Digital Ocean after deployment.

#### Required Secrets for Staging Deployment

The following secrets need to be configured in GitHub repository settings:

- `DIGITALOCEAN_ACCESS_TOKEN`: Digital Ocean API token with app deployment permissions
- `VITE_API_URL`: API endpoint for the staging environment
- `VITE_AUTH_TOKEN`: Authentication token for the staging environment

To set up these secrets:
1. Go to your repository settings
2. Navigate to Secrets and Variables > Actions
3. Add each required secret with its corresponding value

The deployment process will:
1. Build the application with staging environment variables
2. Deploy to Digital Ocean App Platform
3. Make the application available at the staging URL

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

Ensure you've set up your environment variables correctly before starting development.

## License

This project is private and confidential.
