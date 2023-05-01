#!/bin/bash

# Retrieve the name of the Kubernetes pod running MongoDB
POD_NAME=$(kubectl get pods -l app=mongodb -o jsonpath='{.items[0].metadata.name}')

# Forward the local port 27017 to the remote port 27017 in the Kubernetes pod
kubectl port-forward pod/$POD_NAME 27017:27017 &