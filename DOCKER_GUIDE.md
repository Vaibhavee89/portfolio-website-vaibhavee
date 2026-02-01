# Docker Deployment Guide

## 🐳 Docker Setup for Portfolio Application

This guide covers how to containerize and run your portfolio application using Docker.

## Prerequisites

- Docker installed: https://docs.docker.com/get-docker/
- Docker Compose installed (included with Docker Desktop)
- Supabase project set up and running

## Files Created

- `Dockerfile` - Multi-stage build configuration
- `docker-compose.yml` - Docker Compose configuration
- `nginx.conf` - Nginx server configuration
- `.dockerignore` - Files to exclude from Docker build

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

Your app will be available at: http://localhost

### 2. Build and Run with Docker (without Compose)

```bash
# Build the image
docker build \
  --build-arg VITE_SUPABASE_URL=https://ncuvbphblhoulljlxcdx.supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=your_anon_key \
  -t portfolio-app .

# Run the container
docker run -d \
  -p 80:80 \
  --name portfolio \
  portfolio-app

# View logs
docker logs -f portfolio

# Stop and remove
docker stop portfolio
docker rm portfolio
```

## Environment Variables

The application requires these environment variables at **build time**:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

These are baked into the build, so you need to rebuild if they change.

## Docker Architecture

### Multi-Stage Build

**Stage 1: Builder**
- Uses Node.js 18 Alpine
- Installs dependencies
- Builds the Vite application
- Output: `/app/dist` directory

**Stage 2: Production**
- Uses Nginx Alpine (lightweight)
- Copies built assets from builder
- Serves static files
- Handles SPA routing

### Benefits

- ✅ Small image size (~25MB)
- ✅ Fast startup time
- ✅ Production-optimized
- ✅ Secure (no Node.js in production)

## Nginx Configuration

The `nginx.conf` includes:

- **SPA Routing**: All routes serve `index.html`
- **Gzip Compression**: Reduces bandwidth
- **Static Asset Caching**: 1-year cache for assets
- **Security Headers**: X-Frame-Options, X-XSS-Protection
- **Health Check**: `/health` endpoint

## Docker Compose Features

- **Automatic restart**: Container restarts on failure
- **Health checks**: Monitors container health
- **Network isolation**: Dedicated Docker network
- **Environment variables**: Loaded from `.env` file

## Production Deployment

### Deploy to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag the image
docker tag portfolio-app yourusername/portfolio-app:latest

# Push to Docker Hub
docker push yourusername/portfolio-app:latest
```

### Deploy to AWS ECS

1. Push image to Amazon ECR
2. Create ECS task definition
3. Create ECS service
4. Configure load balancer

### Deploy to DigitalOcean App Platform

1. Connect GitHub repository
2. Select Dockerfile deployment
3. Add environment variables
4. Deploy

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set VITE_SUPABASE_URL=your_url
railway variables set VITE_SUPABASE_ANON_KEY=your_key

# Deploy
railway up
```

## Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View logs
docker logs portfolio

# Follow logs
docker logs -f portfolio

# Execute command in container
docker exec -it portfolio sh

# View container stats
docker stats portfolio

# Inspect container
docker inspect portfolio

# Remove image
docker rmi portfolio-app

# Prune unused resources
docker system prune -a
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs portfolio

# Check if port 80 is already in use
lsof -i :80

# Use different port
docker run -p 8080:80 portfolio-app
```

### Environment Variables Not Working

Environment variables must be set at **build time** for Vite:

```bash
# Rebuild with correct variables
docker-compose build --no-cache
docker-compose up -d
```

### Image Too Large

The multi-stage build should produce a ~25MB image. If larger:

```bash
# Check image size
docker images portfolio-app

# Ensure .dockerignore is working
cat .dockerignore
```

### Health Check Failing

```bash
# Test health endpoint
curl http://localhost/health

# Check nginx logs
docker exec portfolio cat /var/log/nginx/error.log
```

## Development with Docker

For development with hot reload:

```bash
# Create docker-compose.dev.yml
version: '3.8'
services:
  portfolio-dev:
    build:
      context: .
      target: builder
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    command: npm run dev -- --host

# Run development container
docker-compose -f docker-compose.dev.yml up
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          docker build \
            --build-arg VITE_SUPABASE_URL=${{ secrets.VITE_SUPABASE_URL }} \
            --build-arg VITE_SUPABASE_ANON_KEY=${{ secrets.VITE_SUPABASE_ANON_KEY }} \
            -t portfolio-app .
      
      - name: Push to Docker Hub
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push yourusername/portfolio-app:latest
```

## Security Best Practices

1. **Don't commit `.env`**: Already in `.gitignore`
2. **Use secrets management**: For production deployments
3. **Regular updates**: Keep base images updated
4. **Scan for vulnerabilities**: Use `docker scan portfolio-app`
5. **Run as non-root**: Nginx Alpine already does this
6. **Limit resources**: Use Docker resource constraints

## Performance Optimization

### Enable HTTP/2

Update `nginx.conf`:
```nginx
listen 80 http2;
```

### Add CDN

Use CloudFlare or AWS CloudFront in front of your container.

### Resource Limits

```yaml
# In docker-compose.yml
services:
  portfolio:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## Monitoring

### Container Logs

```bash
# View logs
docker-compose logs -f

# Export logs
docker logs portfolio > app.log
```

### Health Monitoring

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' portfolio

# Continuous monitoring
watch -n 5 'docker inspect --format="{{.State.Health.Status}}" portfolio'
```

## Cost Comparison

| Platform | Free Tier | Cost (Small App) |
|----------|-----------|------------------|
| Vercel | ✅ Yes | Free |
| Railway | 500 hrs/month | $5/month |
| DigitalOcean | No | $5/month |
| AWS ECS | Limited | ~$10/month |
| Self-hosted VPS | No | $5-10/month |

## Summary

Your portfolio is now fully containerized with:

- ✅ Multi-stage Docker build
- ✅ Nginx production server
- ✅ Docker Compose orchestration
- ✅ Health checks and monitoring
- ✅ Production-ready configuration
- ✅ Small image size (~25MB)
- ✅ Fast deployment

Choose Docker when you need:
- Full control over infrastructure
- Self-hosting capability
- Consistent environments
- Easy scaling with orchestration tools
