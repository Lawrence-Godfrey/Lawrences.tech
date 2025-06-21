#!/bin/bash

# Setup script for local Kubernetes development with Tilt

set -e

echo "🚀 Setting up Lawrences Tech for Kubernetes development"

# Check if required tools are installed
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed. Please install Docker first."; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo "❌ kubectl is required but not installed. Please install kubectl first."; exit 1; }
command -v kind >/dev/null 2>&1 || { echo "❌ kind is required but not installed. Please install kind first (https://kind.sigs.k8s.io/docs/user/quick-start/)"; exit 1; }
command -v tilt >/dev/null 2>&1 || { echo "❌ Tilt is required but not installed. Please install Tilt first (https://tilt.dev/)"; exit 1; }

echo "✅ All prerequisites are installed"

# Check if kind cluster already exists
if kind get clusters | grep -q "lawrences-tech"; then
    echo "📦 Kind cluster 'lawrences-tech' already exists"
    kubectl config use-context kind-lawrences-tech
else
    echo "🏗️  Creating kind cluster 'lawrences-tech'..."
    kind create cluster --config=kind-config.yaml
    
    echo "⏳ Waiting for cluster to be ready..."
    kubectl wait --for=condition=Ready nodes --all --timeout=300s
    
    echo "🌐 Installing NGINX Ingress Controller..."
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
    
    echo "⏳ Waiting for NGINX Ingress Controller to be ready..."
    kubectl wait --namespace ingress-nginx \
      --for=condition=ready pod \
      --selector=app.kubernetes.io/component=controller \
      --timeout=90s || {
        echo "⚠️  Timeout waiting for ingress controller, but checking if it's actually running..."
        if kubectl get pods -n ingress-nginx | grep -q "Running"; then
            echo "✅ NGINX Ingress Controller is running (ignore timeout warning)"
        else
            echo "❌ NGINX Ingress Controller failed to start properly"
            echo "   Check status with: kubectl get pods -n ingress-nginx"
            exit 1
        fi
    }
fi

# Verify cluster is accessible
kubectl cluster-info >/dev/null 2>&1 || { 
    echo "❌ Failed to connect to Kubernetes cluster. Please check your setup."
    exit 1; 
}

echo "✅ Kubernetes cluster is ready"

# Create secrets file if it doesn't exist
if [ ! -f "k8s/secrets.yaml" ]; then
    echo "⚠️  secrets.yaml not found. Please update k8s/secrets.yaml with your actual values before running Tilt."
else
    echo "📝 Please make sure to update k8s/secrets.yaml with your actual secret values"
fi

echo "🎯 Setup complete! You can now run:"
echo "   tilt up"
echo ""
echo "This will:"
echo "   - Build Docker images for client and server"
echo "   - Deploy to your local Kubernetes cluster"
echo "   - Set up port forwarding"
echo "   - Open the Tilt UI for monitoring"
echo ""
echo "📱 Frontend: http://localhost:8080"
echo "🔧 Backend: http://localhost:5050"
echo "🎛️  Tilt UI: http://localhost:10350"
