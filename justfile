# Lawrence's Tech Development Commands

default:
  @just --list --unsorted

# Start the complete development environment
dev:
    @echo "🚀 Starting development environment..."
    just cluster-start
    tilt up

# Start kind cluster
cluster-start:
    @echo "🔧 Starting kind cluster..."
    kind create cluster --name lawrences-tech || echo "Cluster may already exist"

# Stop everything
stop:
    @echo "🛑 Stopping development environment..."
    tilt down
    kind delete cluster --name lawrences-tech

# Just start the servers (assumes cluster is running)
servers:
    @echo "🖥️  Starting servers with Tilt..."
    tilt up

# Check cluster status
status:
    @echo "📊 Cluster status:"
    kubectl cluster-info --context kind-lawrences-tech
    @echo "\n📦 Pods:"
    kubectl get pods --all-namespaces

# View logs
logs:
    @echo "📜 Opening Tilt UI for logs..."
    open http://localhost:10350 || echo "Visit http://localhost:10350 for Tilt UI"

# Quick restart
restart:
    just stop
    just dev

# Clean up everything
clean:
    @echo "🧹 Cleaning up..."
    tilt down
    kind delete cluster --name lawrences-tech
    docker system prune -f

# Complete reset - delete everything and recreate cluster
reset:
    @echo "🔄 Performing complete reset..."
    @echo "🛑 Stopping Tilt..."
    tilt down || echo "Tilt not running"
    @echo "🗑️  Deleting kind cluster..."
    kind delete cluster --name lawrences-tech || echo "Cluster may not exist"
    @echo "🧹 Cleaning Docker resources..."
    docker system prune -f
    @echo "🏗️  Recreating kind cluster..."
    kind create cluster --name lawrences-tech
    @echo "✅ Reset complete! Run 'just dev' to start fresh"

# Show available endpoints
endpoints:
    @echo "🌐 Available endpoints:"
    @echo "Frontend: http://localhost:8080"
    @echo "Backend:  http://localhost:5050"
    @echo "Tilt UI:  http://localhost:10350"