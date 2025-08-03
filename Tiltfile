# Create kind cluster if it doesn't exist
local_resource(
    'ensure-kind-cluster',
    cmd='kind get clusters | grep -q "lawrences-tech" || kind create cluster --config=kind-config.yaml',
    deps=['kind-config.yaml'],
    labels=['setup'],
)

# Ensure we're using the right Kubernetes context for kind
allow_k8s_contexts('kind-lawrences-tech')

# Install NGINX Ingress Controller if it doesn't exist
# This replaces the need for setup scripts
local_resource(
    'nginx-ingress',
    cmd='kubectl get deployment -n ingress-nginx ingress-nginx-controller > /dev/null 2>&1 || kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml',
    deps=[],
    resource_deps=['ensure-kind-cluster'],
    labels=['setup'],
)

# Wait for ingress controller to be ready before deploying apps
local_resource(
    'wait-for-ingress',
    cmd='''
    echo "⏳ Waiting for NGINX Ingress Controller to be ready..."
    
    # Wait for deployment to be available
    kubectl wait --namespace ingress-nginx --for=condition=available deployment/ingress-nginx-controller --timeout=300s
    
    # Wait for pods to be ready
    kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=300s
    
    echo "✅ NGINX Ingress Controller is ready"
    ''',
    deps=[],
    resource_deps=['nginx-ingress'],
    labels=['setup'],
)

# Install MongoDB Community Operator CRDs
local_resource(
    'mongodb-crd',
    cmd='kubectl get crd mongodbcommunity.mongodbcommunity.mongodb.com > /dev/null 2>&1 || kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes-operator/master/config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml',
    deps=[],
    resource_deps=['ensure-kind-cluster'],
    labels=['setup'],
)

# Set up MongoDB namespace and RBAC
local_resource(
    'mongodb-setup',
    cmd='''
    echo "🍃 Setting up MongoDB Community Operator..."
    
    # Create MongoDB namespace
    kubectl apply -f k8s/mongodb-namespace.yaml
    
    # Generate or use existing MongoDB password
    if kubectl get secret lawrences-tech-mongodb-password -n lawrences-tech > /dev/null 2>&1; then
        echo "✅ MongoDB password secret already exists"
    else
        echo "🔐 Creating MongoDB password secret..."
        # Generate a random password if MONGODB_PASSWORD env var is not set
        MONGODB_PASSWORD=${MONGODB_PASSWORD:-$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)}
        kubectl create secret generic lawrences-tech-mongodb-password -n lawrences-tech --from-literal=password="$MONGODB_PASSWORD"
        echo "✅ MongoDB password secret created"
    fi
    
    # Set up RBAC for MongoDB operator
    kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes-operator/master/config/rbac/service_account.yaml --namespace lawrences-tech
    kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes-operator/master/config/rbac/role.yaml --namespace lawrences-tech  
    kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes-operator/master/config/rbac/role_binding.yaml --namespace lawrences-tech
    
    echo "✅ MongoDB namespace and RBAC configured"
    ''',
    deps=['k8s/mongodb-namespace.yaml'],
    resource_deps=['mongodb-crd'],
    labels=['setup'],
)

# Deploy MongoDB Community Operator
local_resource(
    'mongodb-operator',
    cmd='''
    echo "🚀 Deploying MongoDB Community Operator..."
    
    # Install the operator if not already running
    if kubectl get deployment mongodb-kubernetes-operator -n lawrences-tech > /dev/null 2>&1; then
        echo "✅ MongoDB operator is already deployed"
    else
        kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes-operator/master/config/manager/manager.yaml --namespace lawrences-tech
        echo "⏳ Waiting for MongoDB operator to be ready..."
        kubectl wait --for=condition=available deployment/mongodb-kubernetes-operator --namespace lawrences-tech --timeout=300s
    fi
    ''',
    deps=[],
    resource_deps=['mongodb-setup'],
    labels=['setup'],
)



# Deploy MongoDB
k8s_yaml("k8s/mongodb.yaml")

# Apply Kubernetes manifests using Kustomize
k8s_yaml(kustomize("k8s"))

# Build and deploy the server
docker_build(
    "lawrences-tech-server:latest",
    context="./server",
    dockerfile="./server/Dockerfile",
    live_update=[
        # Sync source code changes for faster development
        sync("./server", "/app"),
        # Restart the Node.js process when changes are detected
        run(
            "npm install",
            trigger=["./server/package.json", "./server/package-lock.json"],
        ),
    ],
)

# Build and deploy the client
docker_build(
    "lawrences-tech-client:latest", context="./client", dockerfile="./client/Dockerfile"
)

# Set up port forwarding for local access
k8s_resource("server", port_forwards="5050:5050", resource_deps=['wait-for-ingress', 'mongodb-operator'])
k8s_resource("client", port_forwards="8080:80", resource_deps=['wait-for-ingress'])

# Group resources for better organization in Tilt UI
k8s_resource(
    new_name="lawrences-tech-app",
    objects=[
        "lawrences-tech:namespace",
        "app-config:configmap",
        "app-secrets:secret",
        "lawrences-tech-ingress:ingress",
    ],
    resource_deps=['wait-for-ingress'],
)

k8s_resource(
    new_name="mongodb-cluster",
    objects=[
        "lawrences-tech-mongodb:mongodbcommunity",
    ],
    resource_deps=['mongodb-operator'],
)

# Optional: Cleanup resource to tear down the cluster
local_resource(
    'cleanup-cluster',
    cmd='kind delete cluster --name lawrences-tech',
    deps=[],
    auto_init=False,
    trigger_mode=TRIGGER_MODE_MANUAL,
    labels=['cleanup'],
)

# Configure the Tilt UI
print("🚀 Lawrences Tech is starting up!")
print("🌐 Once ready, access your app at:")
print("   📱 Frontend: http://localhost:8080")
print("   🔧 Backend: http://localhost:5050")
print("   🎛️  Tilt UI: http://localhost:10350")
print("")
print("🧹 To cleanup: Run the 'cleanup-cluster' resource manually in Tilt UI")
