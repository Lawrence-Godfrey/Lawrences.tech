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
    echo "Checking if NGINX Ingress Controller is ready..."
    if kubectl get pods -n ingress-nginx --selector=app.kubernetes.io/component=controller | grep -q "1/1.*Running"; then
        echo "✅ NGINX Ingress Controller is already running"
        exit 0
    else
        echo "⏳ Waiting for NGINX Ingress Controller to be ready..."
        kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=90s
    fi
    ''',
    deps=[],
    resource_deps=['nginx-ingress'],
    labels=['setup'],
)

# Set up the Kubernetes namespace
k8s_yaml("k8s/namespace.yaml")

# Apply Kubernetes manifests
k8s_yaml(
    [
        "k8s/configmap.yaml",
        "k8s/secrets.yaml",
        "k8s/server.yaml",
        "k8s/client.yaml",
        "k8s/ingress.yaml",
    ]
)

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
k8s_resource("server", port_forwards="5050:5050", resource_deps=['wait-for-ingress'])
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

# Optional: Cleanup resource for when you want to tear down the cluster
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
print("")
print("� Setup resources will run automatically:")
print("   ✅ Create kind cluster (if needed)")
print("   ✅ Install NGINX Ingress Controller") 
print("   ✅ Wait for ingress to be ready")
print("")
print("🌐 Once ready, access your app at:")
print("   📱 Frontend: http://localhost:8080")
print("   🔧 Backend: http://localhost:5050")
print("   🎛️  Tilt UI: http://localhost:10350")
print("")
print("🧹 To cleanup: Run the 'cleanup-cluster' resource manually in Tilt UI")
