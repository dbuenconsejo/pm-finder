#!/bin/bash
# =====================================================
# PM Finder — Bare Metal Kubernetes Deployment Script
# =====================================================
# Usage:
#   ./k8s/deploy.sh              # Full deploy
#   ./k8s/deploy.sh build        # Build & push images only
#   ./k8s/deploy.sh apply        # Apply K8s manifests only
#   ./k8s/deploy.sh rollout      # Rolling restart app pods
# =====================================================

set -euo pipefail

# ─── Configuration ───────────────────────────────────
# Change these to your registry
REGISTRY="${REGISTRY:-localhost:5000}"
APP_IMAGE="${REGISTRY}/pmfinder-app"
NGINX_IMAGE="${REGISTRY}/pmfinder-nginx"
TAG="${TAG:-latest}"
NAMESPACE="pmfinder"

# For k3s use: KUBECTL="k3s kubectl"
KUBECTL="${KUBECTL:-kubectl}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }
info() { echo -e "${BLUE}[i]${NC} $1"; }

# ─── Functions ───────────────────────────────────────

build_images() {
    info "Building production Docker images..."

    echo ""
    log "Building PHP-FPM app image..."
    docker build \
        -f docker/php/Dockerfile.prod \
        -t "${APP_IMAGE}:${TAG}" \
        .

    log "Building Nginx image..."
    docker build \
        -f docker/nginx/Dockerfile.prod \
        -t "${NGINX_IMAGE}:${TAG}" \
        docker/nginx/

    echo ""
    log "Images built successfully!"
}

push_images() {
    info "Pushing images to registry: ${REGISTRY}"
    docker push "${APP_IMAGE}:${TAG}"
    docker push "${NGINX_IMAGE}:${TAG}"
    log "Images pushed successfully!"
}

apply_manifests() {
    info "Applying Kubernetes manifests..."

    ${KUBECTL} apply -f k8s/00-namespace.yaml
    log "Namespace created"

    ${KUBECTL} apply -f k8s/01-secrets.yaml
    log "Secrets applied"

    ${KUBECTL} apply -f k8s/02-configmap.yaml
    log "ConfigMaps applied"

    ${KUBECTL} apply -f k8s/03-mysql.yaml
    log "MySQL deployed"

    # Wait for MySQL to be ready before deploying app
    info "Waiting for MySQL to be ready..."
    ${KUBECTL} rollout status statefulset/pmfinder-mysql -n ${NAMESPACE} --timeout=120s

    ${KUBECTL} apply -f k8s/04-redis.yaml
    log "Redis deployed"

    ${KUBECTL} apply -f k8s/05-app-deployment.yaml
    log "App deployed"

    ${KUBECTL} apply -f k8s/06-queue-scheduler.yaml
    log "Queue worker & scheduler deployed"

    ${KUBECTL} apply -f k8s/07-ingress.yaml
    log "Ingress configured"

    echo ""
    log "All manifests applied!"
}

rollout() {
    info "Rolling restart of app pods..."
    ${KUBECTL} rollout restart deployment/pmfinder-app -n ${NAMESPACE}
    ${KUBECTL} rollout restart deployment/pmfinder-queue -n ${NAMESPACE}
    ${KUBECTL} rollout status deployment/pmfinder-app -n ${NAMESPACE} --timeout=120s
    log "Rollout complete!"
}

status() {
    echo ""
    info "Cluster status for namespace: ${NAMESPACE}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ${KUBECTL} get pods -n ${NAMESPACE} -o wide
    echo ""
    ${KUBECTL} get svc -n ${NAMESPACE}
    echo ""
    ${KUBECTL} get ingress -n ${NAMESPACE}
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

full_deploy() {
    build_images
    push_images
    apply_manifests
    echo ""
    info "Waiting for pods to be ready..."
    sleep 10
    status
    echo ""
    log "🚀 PM Finder deployed to Kubernetes!"
}

# ─── Main ────────────────────────────────────────────

cd "$(dirname "$0")/.."

case "${1:-full}" in
    build)
        build_images
        ;;
    push)
        push_images
        ;;
    apply)
        apply_manifests
        status
        ;;
    rollout|restart)
        rollout
        ;;
    status)
        status
        ;;
    full|deploy)
        full_deploy
        ;;
    *)
        echo "Usage: $0 {build|push|apply|rollout|status|full}"
        exit 1
        ;;
esac
