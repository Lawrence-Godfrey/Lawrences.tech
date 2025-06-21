#!/bin/bash

# Cleanup script for local Kubernetes development

set -e

echo "🧹 Cleaning up Lawrences Tech development environment"

# Stop Tilt if it's running
if pgrep -x "tilt" > /dev/null; then
    echo "🛑 Stopping Tilt..."
    pkill -x "tilt" || true
    sleep 2
fi

# Ask user if they want to delete the kind cluster
read -p "🗑️  Do you want to delete the kind cluster 'lawrences-tech'? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if kind get clusters | grep -q "lawrences-tech"; then
        echo "🗑️  Deleting kind cluster 'lawrences-tech'..."
        kind delete cluster --name lawrences-tech
        echo "✅ Kind cluster deleted"
    else
        echo "ℹ️  Kind cluster 'lawrences-tech' doesn't exist"
    fi
else
    echo "ℹ️  Keeping kind cluster 'lawrences-tech'"
fi

# Clean up Docker images (optional)
read -p "🧹 Do you want to clean up Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Cleaning up Docker images..."
    docker image prune -f
    # Remove specific images if they exist
    docker rmi lawrences-tech-client:latest 2>/dev/null || true
    docker rmi lawrences-tech-server:latest 2>/dev/null || true
    echo "✅ Docker cleanup complete"
fi

echo "🎯 Cleanup complete!"
