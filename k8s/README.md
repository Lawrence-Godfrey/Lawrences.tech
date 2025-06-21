# Kubernetes Development Setup

This guide will help you run Lawrences Tech locally using Kubernetes and Tilt.

## Prerequisites

Before getting started, make sure you have the following installed:

1. **Docker** - For building container images
2. **kubectl** - Kubernetes command-line tool
3. **kind** - Kubernetes in Docker ([Install kind](https://kind.sigs.k8s.io/docs/user/quick-start/))
4. **Tilt** - Local Kubernetes development tool ([Install Tilt](https://docs.tilt.dev/install.html))

**Note**: The setup script will automatically create a kind cluster and install the NGINX ingress controller, so you don't need to worry about setting up Kubernetes manually.

## Quick Start

**Option 1: Using Make (Recommended)**
```bash
make setup  # Creates cluster, installs ingress controller
make up     # Starts Tilt development environment
```

**Option 2: Manual Steps**
1. **Run the setup script:**
   ```bash
   ./scripts/setup.sh
   ```

2. **Update secrets:**
   Edit `k8s/secrets.yaml` and replace placeholder values with your actual credentials:
   ```yaml
   # Replace these with your actual values
   MONGO_URL: "mongodb+srv://your-actual-connection-string"
   GOOGLE_OAUTH_CLIENT_ID: "your-google-client-id"
   GOOGLE_OAUTH_CLIENT_SECRET: "your-google-client-secret"
   # ... etc
   ```

3. **Start the development environment:**
   ```bash
   tilt up
   ```

4. **Access your application:**
   - 📱 **Frontend**: http://localhost:8080
   - 🔧 **Backend API**: http://localhost:5050
   - 🎛️ **Tilt Dashboard**: http://localhost:10350

## What's Running?

When you run `tilt up`, the following happens:

- **Builds Docker images** for both client and server
- **Deploys containers** to your local Kubernetes cluster
- **Sets up port forwarding** so you can access the apps locally
- **Enables live reload** - server code changes trigger automatic rebuilds
- **Opens the Tilt UI** for monitoring logs and status

## Project Structure

```
├── client/                 # React frontend
│   ├── Dockerfile         # Client container definition
│   └── nginx.conf         # Nginx configuration for serving React app
├── server/                # Node.js backend
│   └── Dockerfile         # Server container definition
├── k8s/                   # Kubernetes manifests
│   ├── namespace.yaml     # Creates lawrences-tech namespace
│   ├── configmap.yaml     # Non-sensitive configuration
│   ├── secrets.yaml       # Sensitive configuration (update this!)
│   ├── server.yaml        # Backend deployment and service
│   ├── client.yaml        # Frontend deployment and service
│   └── ingress.yaml       # Routes traffic between services
├── scripts/
│   └── setup.sh          # Setup verification script
└── Tiltfile              # Tilt configuration for development workflow
```

## Configuration Management

We've moved away from `.env` files to Kubernetes-native configuration:

- **ConfigMaps** (`k8s/configmap.yaml`) - Non-sensitive config like URLs and ports
- **Secrets** (`k8s/secrets.yaml`) - Sensitive data like API keys and database credentials

This approach provides:
- Better security (secrets are base64 encoded and can be encrypted at rest)
- Environment-specific configuration without code changes
- Native Kubernetes secret management integration

## Development Workflow

1. **Make code changes** - Edit files in `client/` or `server/`
2. **Tilt automatically rebuilds** - Watch the Tilt UI for build progress
3. **Test your changes** - App reloads automatically
4. **Check logs** - View container logs in the Tilt dashboard

## Stopping the Environment

```bash
tilt down  # Stops Tilt and cleans up resources
```

## Troubleshooting

### Port Conflicts
If ports 8080, 5050, or 10350 are already in use:
- Change the port forwards in the `Tiltfile`
- Or stop other services using those ports

### Docker Build Issues
- Make sure Docker is running
- Try: `docker system prune` to clean up old images

### Kubernetes Connection Issues
- Verify cluster is running: `kubectl cluster-info`
- Check your kubeconfig context: `kubectl config current-context`

### Secrets Not Working
- Ensure you've updated `k8s/secrets.yaml` with real values
- Check that secrets are created: `kubectl get secrets -n lawrences-tech`

## Production Considerations

This setup is optimized for **local development**. For production:

1. Use proper secret management (e.g., sealed-secrets, external secret operators)
2. Configure resource limits based on actual usage
3. Set up proper ingress with TLS termination
4. Consider using Helm charts for templating
5. Implement proper monitoring and logging
6. Use CI/CD pipelines instead of Tilt

## Next Steps

- **Add monitoring**: Integrate Prometheus and Grafana
- **Implement CI/CD**: Set up GitHub Actions for automated deployments
- **Scale components**: Adjust replica counts based on load
- **Add more environments**: Create staging and production configurations
