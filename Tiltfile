# -*- mode: Python -*-

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
k8s_resource("server", port_forwards="5050:5050")
k8s_resource("client", port_forwards="8080:80")

# Group resources for better organization in Tilt UI
k8s_resource(
    new_name="lawrences-tech-app",
    objects=[
        "lawrences-tech:namespace",
        "app-config:configmap",
        "app-secrets:secret",
        "lawrences-tech-ingress:ingress",
    ],
)

# Configure the Tilt UI
print("🚀 Lawrences Tech is starting up!")
print("📱 Frontend will be available at: http://localhost:8080")
print("🔧 Backend will be available at: http://localhost:5050")
print("🎛️  Tilt UI available at: http://localhost:10350")
