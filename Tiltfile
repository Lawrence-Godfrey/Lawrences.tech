
load('ext://namespace', 'namespace_create')


# Create kind cluster if it doesn't exist
local_resource(
    'ensure-kind-cluster',
    cmd='kind get clusters | grep -q "lawrences-tech" || kind create cluster --config=kind-config.yaml',
    deps=['kind-config.yaml'],
    labels=['setup'],
)

# Switch to the kind context automatically
local_resource(
    'switch-context',
    cmd='kubectl config use-context kind-lawrences-tech',
    deps=[],
    resource_deps=['ensure-kind-cluster'],
    labels=['setup'],
)

# Ensure we're using the right Kubernetes context for kind
allow_k8s_contexts('kind-lawrences-tech')

# Safety check: warn if using default namespace without explicit intent
if k8s_namespace() == 'default':
    print("⚠️  WARNING: Deploying to 'default' namespace")
    print("   Consider using: tilt up --namespace=dev")
    print("   Current namespace: %s" % k8s_namespace())

# Create namespace if it doesn't exist (similar to helm's --create-namespace)
namespace_create(k8s_namespace())

# Install NGINX Ingress Controller if it doesn't exist
# This replaces the need for setup scripts
local_resource(
    'nginx-ingress',
    cmd='kubectl get deployment -n ingress-nginx ingress-nginx-controller > /dev/null 2>&1 || kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml',
    deps=[],
    resource_deps=['switch-context'],
    labels=['setup'],
)

# Wait for ingress controller to be ready before deploying apps
local_resource(
    'wait-for-ingress',
    cmd='''
    echo "⏳ Waiting for NGINX Ingress Controller to be ready..."
    
    # Wait for admission webhook jobs to complete (if they exist - they may have been cleaned up)
    echo "⏳ Waiting for admission webhook jobs..."
    kubectl wait --namespace ingress-nginx --for=condition=complete job/ingress-nginx-admission-create --timeout=300s 2>/dev/null || true
    kubectl wait --namespace ingress-nginx --for=condition=complete job/ingress-nginx-admission-patch --timeout=300s 2>/dev/null || true
    
    # Wait for deployment to be available
    echo "⏳ Waiting for controller deployment..."
    kubectl wait --namespace ingress-nginx --for=condition=available deployment/ingress-nginx-controller --timeout=300s
    
    # Wait for pods to be ready
    echo "⏳ Waiting for controller pods..."
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
    resource_deps=['switch-context'],
    labels=['setup'],
)

# Apply Kubernetes manifests using Kustomize (includes MongoDB operator, RBAC, and secrets)
k8s_yaml(kustomize("k8s"))

# Build and deploy the server
docker_build(
    "server:latest",
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
    "client:latest", context="./client", dockerfile="./client/Dockerfile"
)

# Set up port forwarding for local access
k8s_resource("server", port_forwards="5050:5050", resource_deps=['wait-for-ingress', 'mongodb-kubernetes-operator'])
k8s_resource("client", port_forwards="8080:80", resource_deps=['wait-for-ingress'])

# MongoDB operator resource
k8s_resource(
    "mongodb-kubernetes-operator",
    resource_deps=['mongodb-crd'],
    labels=['database'],
)

# Group resources for better organization in Tilt UI
k8s_resource(
    new_name="lawrences-tech-app",
    objects=[
        "app-config:configmap",
        "app-secrets:secret",
        "mongodb-password:secret",
        "ingress:ingress",
    ],
    resource_deps=['wait-for-ingress'],
)

k8s_resource(
    new_name="mongodb-cluster",
    objects=[
        "mongodb:mongodbcommunity",
    ],
    resource_deps=['mongodb-kubernetes-operator'],
)

k8s_resource(
    new_name="mongodb-rbac",
    objects=[
        "mongodb-kubernetes-operator:serviceaccount",
        "mongodb-database:serviceaccount",
        "mongodb-kubernetes-operator:role",
        "mongodb-kubernetes-operator:rolebinding",
    ],
    labels=['database'],
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
print("📦 Deploying to namespace: %s" % k8s_namespace())
print("🌐 Once ready, access your app at:")
print("   📱 Frontend: http://localhost:8080")
print("   🔧 Backend: http://localhost:5050")
print("   🎛️  Tilt UI: http://localhost:10350")
print("")
print("🧹 To cleanup: Run the 'cleanup-cluster' resource manually in Tilt UI")
