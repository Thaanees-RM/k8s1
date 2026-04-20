## 📊 Monitoring Setup

This project uses:

- Prometheus (metrics)
- Grafana (visualization)
- Loki (logs)

### Installation

```bash
cd monitoring
bash install.sh

kubectl port-forward svc/monitoring-grafana -n monitoring 4000:80  -->Access Grafana

kubectl get secret -n monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 -d   --> get psswd 


---

# 🚀 STEP 2 — PUSH TO GITHUB

```bash
git add .
git commit -m "Added monitoring setup (Prometheus, Grafana, Loki)"
git push origin main

GitHub repo
   ├── k8s/
   ├── argocd/
   ├── monitoring/
   │     ├── install.sh
   │     └── README.md
