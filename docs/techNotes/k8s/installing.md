# Tech Book Club - Chapter 3

Quick summary of last session
Chapter 3 - Installing Kubernetes
Discussion


## Quick summary of last session

chapter 2 summary:

Masters: where the control plane runs.
 - Make all the deployment and schedulling decisions.
 - API server exposes the public rest interface

Nodes are where our microservices will run.
 - kublete: registers with the cluster /  communicates with control plane.
 - container runtime: docker / containerd
 - kube-proxy: networking on the node.

## Listen through this chapter, "Installing Kubernetes"


### play-with-k8s.com

A bit more set up when you start playing around every time, but it keeps your laptop clean and avoids any nasty surprises when running docker stuff for work.

1. Log in
2. click "+ ADD NEW INSTANCE", wait for it to give you a cli in the browser
3. copy the welcome message, you'll need to run those 3 commands
4. Paste and run the first command (`kubeadm init ...`), wait for it to finish and copy the `kubeadm join ...` that's printed out.
5. copy & paste the other 2 commands    
6. try running `kubectl get node`, you should see 1 master node that's ready

**Set up a second node**

1. click "+ ADD NEW INSTANCE", wait for it to give you a cli in the browser
2. paste the  `kubeadm join ...` command from step 4 above.
3. back in the node 1 cli, run `kubectl get node` (you may have to wait a bit for node2 to be ready)

### Docker Desktop

If you are looking to run kubernetes for work stuff, go for this one - it allows you to run it and connect to nexus to pull docker images. (minikube gets scuppered by pulse).

1. Enable Kubernetes & restart
2. run `kubectl get nodes`

**Set up a second node**

### minikube

### GKE

### kops on AWS

### kubeadm

This is what the dev ops guys will(may) be using to set up & manage k8s nodes on prem.
It's what you'll use if you want to turn each computer in your house into a node.

### kubectl

config -> clusters -> so you can talk to multiple different clusters from one laptop!
config -> users -> a cluster can have multiple with varying permissions
config -> contexts -> cluster + user = context. Eg, dev user + NFT cluster could be the nft-dev context

config lives in $HOME/.kube (it's a yaml file)

commands

kubeadm join 192.168.0.38:6443 --token gzl7lb.2ux6jba0mz1i9l5o --discovery-token-ca-cert-hash sha256:7d9abe91ce2198dd2cfa90d9ce662ac77c063763b25603dc06ed3971e21fa862

## Discussion

 - Any one tried any of these ways for running Kubernetes?
 - 