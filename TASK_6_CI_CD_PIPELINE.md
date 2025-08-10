## Task 6: Simple CI/CD for a Dockerized Application ⚙️

Assume you are tasked with outlining a basic CI/CD (Continuous Integration/Continuous Deployment) pipeline for a new simple backend service that will be developed and deployed as a Docker container onto the existing Ubuntu server on DigitalOcean.

### Pipeline Trigger:

- What event in a code repository (e.g., GitHub, GitLab) would typically trigger this CI/CD pipeline to start automatically?
  - Answer: like push or merge to the main, dev, or staging repository

### Core Pipeline Stages:

- Describe the essential stages of this CI/CD pipeline. For each stage, briefly explain its purpose (e.g., code checkout, running tests, building a Docker image, pushing the image to a registry, deploying the new image).
- Answer: 
  - checkout code for fetch latest source code from repo
  - run npm install and npm test
  - build docker image
  - create tag to docker
  - push to docker image
  - deploy
  - 
### Role of Docker:

- Explain how Docker and a Dockerfile would be used specifically in the "build" stage of this pipeline.
  - Answer:
    - Define the application’s runtime environment (base image, dependencies, configs).
    - Bundle the application and its dependencies into a single, portable image.
    - Ensure the image will run the same way in development, staging, and production.


- What is the purpose of a Docker image registry (e.g., Docker Hub, GitHub Container Registry, AWS ECR) in this CI/CD process?
  - central storage
  - versioning

### Deployment to Server:

- Briefly outline how the "deployment" stage might update the service running on the Ubuntu server. This involves getting the new Docker image from the registry and running it. What common Docker commands might be involved on the server to stop an old container (if any), pull the new image, and start a new container based on it?
  - ssh enter
  - stop container
  - pull the new image from registry docker
  - run docker run
  - verify its running or no
  - 
