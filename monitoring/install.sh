#!/bin/bash

# Create namespace
kubectl create namespace monitoring

# Add repos
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts

helm repo update

# Install Prometheus + Grafana
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring

# Install Loki (without Grafana conflict)
helm install loki grafana/loki-stack \
  -n monitoring \
  --set grafana.enabled=false \
  --set persistence.enabled=false
