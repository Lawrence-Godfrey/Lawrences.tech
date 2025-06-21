.PHONY: setup up down clean logs status help

# Default target
help: ## Show this help message
	@echo "🚀 Lawrences Tech - Kubernetes Development"
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Set up the development environment (creates cluster, installs ingress)
	@./scripts/setup.sh

up: ## Start the development environment with Tilt
	@echo "🚀 Starting Tilt development environment..."
	@tilt up

down: ## Stop Tilt (keeps cluster running)
	@echo "⏹️  Stopping Tilt..."
	@tilt down

clean: ## Clean up everything (stops Tilt, optionally deletes cluster)
	@./scripts/cleanup.sh

logs: ## Show logs from all pods
	@echo "📋 Showing logs from all pods in lawrences-tech namespace..."
	@kubectl logs -n lawrences-tech -l app=server --tail=50 -f &
	@kubectl logs -n lawrences-tech -l app=client --tail=50 -f &
	@wait

status: ## Show status of all resources
	@echo "📊 Kubernetes cluster status:"
	@kubectl cluster-info
	@echo ""
	@echo "📦 Pods in lawrences-tech namespace:"
	@kubectl get pods -n lawrences-tech -o wide 2>/dev/null || echo "Namespace not found - run 'make up' first"
	@echo ""
	@echo "🌐 Services in lawrences-tech namespace:"
	@kubectl get services -n lawrences-tech 2>/dev/null || echo "Namespace not found - run 'make up' first"

# Quick development workflow
dev: setup up ## Complete setup and start development environment

# Alternative spellings
start: up ## Alias for 'up'
stop: down ## Alias for 'down'
