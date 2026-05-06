# Kubernetes Full-Stack Application

A complete Kubernetes deployment with React frontend, Node.js backend, ArgoCD GitOps, and monitoring stack.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Node.js API    │    │   Monitoring   │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Grafana)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        ┌─────────────────┐
                        │   Kubernetes    │
                        │   Ingress       │
                        └─────────────────┘
                                 │
                        ┌─────────────────┐
                        │     ArgoCD      │
                        │   GitOps        │
                        └─────────────────┘
```

## Prerequisites

- Docker installed
- Kubernetes cluster (minikube, kind, or cloud)
- kubectl configured
- Node.js 18+ (for local development)
- Git

## Local Development

### 1. Clone and Setup

```bash
git clone https://github.com/Thaanees-RM/k8s1.git
cd k8s1
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run build

# Or install separately
npm run build:backend
npm run build:frontend
```

### 3. Start Services Locally

```bash
# Start backend (port 3000)
npm run start:backend

# Start frontend (port 3000) - in separate terminal
npm run start:frontend
```

### 4. Test Locally

```bash
# Test backend API
curl http://localhost:3000/api

# Access frontend
open http://localhost:3000
```

## Docker Build & Push

### 1. Build Docker Images

```bash
# Build backend image
docker build -t rafeekthaanees/backend:v1 ./backend

# Build frontend image
docker build -t rafeekthaanees/frontend:v1 ./frontend
```

### 2. Push to Registry

```bash
# Push to Docker Hub (update username as needed)
docker push rafeekthaanees/backend:v1
docker push rafeekthaanees/frontend:v1
```

## Kubernetes Deployment

### Option 1: Manual Deployment

```bash
# Apply all manifests
kubectl apply -f k8s/base/

# Check deployment status
kubectl get pods
kubectl get services
kubectl get ingress
```

### Option 2: ArgoCD GitOps (Recommended)

#### 1. Install ArgoCD

```bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

#### 2. Access ArgoCD UI

```bash
# Forward ArgoCD UI port
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get initial password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Access UI at: https://localhost:8080
# Username: admin
# Password: [from command above]
```

#### 3. Deploy Application via ArgoCD

```bash
# Apply the ArgoCD application manifest
kubectl apply -f argocd/application.yaml

# Monitor sync status
kubectl get application practice -n argocd
```

## Service URLs & Endpoints

### After Kubernetes Deployment

```bash
# Get ingress IP
kubectl get ingress app-ingress

# Access services (update IP/hostname accordingly)
# Frontend: http://<ingress-ip>/
# Backend API: http://<ingress-ip>/api
```

### Local Development

- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

## Testing

### 1. Backend API Tests

```bash
# Test health endpoint
curl http://localhost:3000/api

# Expected response:
# {"message":"Hello from Kubernetes Backend 🚀","time":"2024-..."}
```

### 2. Frontend Tests

```bash
# Run frontend tests
cd frontend
npm test
```

### 3. Kubernetes Health Checks

```bash
# Check pod status
kubectl get pods -l app=backend
kubectl get pods -l app=frontend

# Check services
kubectl get services

# Check logs
kubectl logs -l app=backend
kubectl logs -l app=frontend
```

### 4. Ingress Testing

```bash
# Test ingress routing
curl -H "Host: myapp.local" http://<ingress-ip>/api
curl -H "Host: myapp.local" http://<ingress-ip>/
```

## Monitoring Setup

### 1. Install Monitoring Stack

```bash
# Navigate to monitoring directory
cd monitoring

# Run installation script
chmod +x install.sh
./install.sh
```

### 2. Access Monitoring Tools

```bash
# Grafana Dashboard
kubectl port-forward svc/grafana 3000:3000 -n monitoring
# Access: http://localhost:3000
# Default credentials: admin/admin

# Prometheus UI
kubectl port-forward svc/prometheus 9090:9090 -n monitoring
# Access: http://localhost:9090
```

### 3. Monitoring Endpoints

- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Application Metrics**: `/metrics` endpoint on backend service

## Troubleshooting

### Common Issues

#### 1. Pod Not Starting
```bash
# Check pod events
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>
```

#### 2. Ingress Not Working
```bash
# Check ingress controller
kubectl get pods -n ingress-nginx

# Check ingress rules
kubectl describe ingress app-ingress
```

#### 3. ArgoCD Sync Issues
```bash
# Check ArgoCD application status
kubectl get application practice -n argocd -o yaml

# Force sync
kubectl argocd app sync practice -n argocd
```

#### 4. Image Pull Errors
```bash
# Check image pull secrets
kubectl get secrets

# Verify image exists
docker pull rafeekthaanees/backend:v1
```

### Reset Everything

```bash
# Delete all resources
kubectl delete -f k8s/base/
kubectl delete -f argocd/application.yaml

# Delete monitoring (if installed)
kubectl delete -f monitoring/

# Delete ArgoCD
kubectl delete -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

## Development Workflow

### 1. Make Changes
```bash
# Edit code in backend/ or frontend/
```

### 2. Test Locally
```bash
# Stop and restart services
npm run start:backend
npm run start:frontend
```

### 3. Update Docker Images
```bash
# Build new versions
docker build -t rafeekthaanees/backend:v2 ./backend
docker build -t rafeekthaanees/frontend:v2 ./frontend

# Push new versions
docker push rafeekthaanees/backend:v2
docker push rafeekthaanees/frontend:v2
```

### 4. Update Kubernetes
```bash
# Update image tags in deployment files
# ArgoCD will automatically detect and apply changes
```

## File Structure

```
k8s1/
├── backend/                 # Node.js API
│   ├── index.js            # Express server
│   ├── package.json        # Dependencies
│   ├── Dockerfile          # Backend container
│   └── .dockerignore       # Docker exclusions
├── frontend/               # React app
│   ├── src/               # React source
│   ├── public/            # Static assets
│   ├── package.json       # Dependencies
│   ├── Dockerfile         # Frontend container
│   └── .dockerignore      # Docker exclusions
├── k8s/base/              # Kubernetes manifests
│   ├── backend/           # Backend resources
│   ├── frontend/          # Frontend resources
│   └── ingress.yaml       # Routing rules
├── argocd/                # ArgoCD configuration
│   └── application.yaml   # GitOps app definition
├── monitoring/            # Monitoring stack
│   ├── install.sh         # Setup script
│   └── README.md          # Monitoring docs
├── package.json           # Root scripts
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Test locally
4. Update documentation
5. Submit pull request

## License

ISC License
