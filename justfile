# Autegry Site Development Commands
# Just is a command runner, similar to make but simpler
# Install just: https://github.com/casey/just

# Default recipe - show available commands
default:
    @just --list

install:
    @echo "📦 Installing dependencies..."
    npm install
    cd server && npm install

build:
    @echo "🏗️  Building frontend application..."
    npm run build

# Run in development mode (Docker)
dev:
    @echo "🚀 Starting development environment with Traefik..."
    docker compose -f docker-compose.dev.yaml up --build -d
    @echo "✅ Development server running at:"
    @echo "  🌐 Website: http://autegry.localhost"
    @echo "  📊 Traefik Dashboard: http://traefik.localhost:8080"
    @echo "  🏥 Health Check: http://autegry.localhost/api/health"

prod:
    @echo "🚀 Starting production environment with Traefik..."
    docker compose -f compose.yaml up --build -d
    @echo "✅ Production server running at:"
    @echo "  🌐 Website: https://autegry.com (configure your domain)"
    @echo "  🏥 Health Check: https://autegry.com/api/health"

build-docker:
    @echo "🐳 Building Docker image..."
    docker build -t autegry-site .


# Health check
health:
    @echo "🏥 Checking application health..."
    @curl -s http://autegry.localhost/api/health 2>/dev/null && echo "✅ Development server healthy" || echo "❌ Development server not responding"
    @curl -s https://autegry.com/api/health 2>/dev/null && echo "✅ Production server healthy" || echo "❌ Production server not responding (or domain not configured)"

# Test email functionality (development only)
test-email:
    @echo "📧 Testing email configuration..."
    @curl -s http://autegry.localhost/api/test-email 2>/dev/null || echo "❌ Development server not responding"

# Send test email
send-test-email:
    @echo "📧 Sending test email..."
    curl -X POST http://autegry.localhost/api/send-email \
        -H "Content-Type: application/json" \
        -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","subject":"Test Email","message":"This is a test message from justfile"}'

# Clean up Docker resources
# Stop all containers
stop:
    @echo "🛑 Stopping containers..."
    docker compose -f docker-compose.dev.yaml down 2>/dev/null || true
    docker compose -f compose.yaml down 2>/dev/null || true

# View logs (development)
logs:
    @echo "📋 Showing development logs..."
    docker compose -f docker-compose.dev.yaml logs -f

# View logs (production)
logs-prod:
    @echo "📋 Showing production logs..."
    docker compose -f compose.yaml logs -f

# Check container status
status:
    @echo "📊 Container status:"
    @echo "Development:"
    @docker compose -f docker-compose.dev.yaml ps 2>/dev/null || echo "  No development containers running"
    @echo "Production:"
    @docker compose -f compose.yaml ps 2>/dev/null || echo "  No production containers running"

clean:
    @echo "🧹 Cleaning up Docker resources..."
    docker compose -f docker-compose.dev.yaml down --rmi all --volumes --remove-orphans 2>/dev/null || true
    docker compose -f compose.yaml down --rmi all --volumes --remove-orphans 2>/dev/null || true
    docker system prune -f


lint:
    @echo "🔍 Linting code..."
    npm run lint


dev-frontend:
    @echo "🎨 Starting frontend development server..."
    npm run dev

dev-backend:
    @echo "⚙️  Starting backend development server..."
    cd server && npm run dev
