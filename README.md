# BigEQ Authorize Dashboard

A modern dashboard application for BigEQ authorization management built with:

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for UI components
- Bun package manager support
- Docker for containerization

## Getting Started

These instructions will help you set up the project for local development.

### Prerequisites

- Node.js (v18 or higher)
- Bun package manager
- Docker (optional, for container-based development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kkeeling/bigeq-authorize-dashboard.git
   cd bigeq-authorize-dashboard
   ```

2. Install dependencies:
   ```bash
   bun install
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
   bun run dev
   ```

### Environment Variables

The application uses environment variables for configuration. These are managed through `.env` files:

- `.env.example`: Template with placeholder values (committed to repository)
- `.env`: Local development values (not committed to repository)

**Important**: Never commit sensitive information or actual API keys to the repository. Always use `.env` for local development and ensure it's listed in `.gitignore`.

## Available Scripts

- `bun run dev`: Start development server
- `bun run build`: Build for production
- `bun run preview`: Preview production build locally
- `bun run lint`: Run ESLint

## Project Structure

```
├── src/
│   ├── components/   # Reusable UI components
│   │   └── ui/      # shadcn/ui components
│   ├── pages/       # Page components/routes
│   ├── services/    # API and service integrations
│   └── lib/         # Utility functions and helpers
├── .env.example     # Example environment variables
├── Dockerfile       # Docker configuration
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.ts   # Vite configuration
└── ... configuration files
```

## Deployment

The application can be deployed in multiple ways:

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t bigeq-authorize-dashboard .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 -e VITE_API_URL=your_api_url bigeq-authorize-dashboard
   ```

The application will be available at http://localhost:8080

### Staging Environment (Digital Ocean)

The application is automatically deployed to Digital Ocean App Platform when changes are pushed to the `sprint-main` branch.

#### Required Environment Variables

Configure these in your deployment platform:

- `VITE_API_URL`: API endpoint URL
- `VITE_APP_TITLE`: Application title
- `VITE_AUTH_TOKEN`: Authentication token (if required)

#### GitHub Actions Secrets

Required secrets for automated deployments:

- `DIGITALOCEAN_ACCESS_TOKEN`: Digital Ocean API token
- `DOCKER_USERNAME`: Docker Hub username (for container deployments)
- `DOCKER_PASSWORD`: Docker Hub password

### Production Deployment

1. Build the production assets:
   ```bash
   bun run build
   ```

2. The built assets will be in the `dist` directory, ready to be served by any static file server or CDN.

3. For container deployment, use the production-optimized Docker image:
   ```bash
   docker build --build-arg NODE_ENV=production -t bigeq-authorize-dashboard:prod .
   ```

## Contributing

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Set up your development environment:
   - Copy `.env.example` to `.env`
   - Install dependencies
   - Ensure all tests pass with `bun run test`

3. Make your changes:
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. Submit a pull request:
   - Provide a clear description of the changes
   - Link any related issues
   - Ensure CI checks pass

### Development Guidelines

- Use TypeScript for all new code
- Follow the shadcn/ui component patterns
- Write unit tests for new features
- Update the README for significant changes

## License

This project is private and confidential.
