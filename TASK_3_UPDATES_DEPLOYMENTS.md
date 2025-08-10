## Task 3: Updates & Deployments 🚀

### OS Package Updates:

- How would you safely update the installed packages on the Ubuntu server? What commands would you use?
  - Answer:
    - first run `sudo apt update` for fetches the latest package information from the repositories (perhaps there will be deprecated package on your existing plate)
    - upgrade the package by run `sudo apt upgrade -y`
    - if you want to remove unused package `sudo apt autoremove -y`
    - then reboot `sudo reboot`

### Backend Application Update:

- Assume you have received a new pre-built version of the NestJS backend application (e.g., a set of files or an archive). Outline the general steps you would take to deploy this update to the existing systemd-managed service. Include steps like stopping the service, replacing files, and restarting.
- Answer:
  - enter ssh by run `ssh <user>@<ip>`
  - stop existing service `sudo sytemctl stop<service_name>`
  - backup your current service `sudo cp -r /var/www/<servce_name> /var/www/<servce_name>-backup-$(date +%F)`
  - upload new build `scp backend-build.tar.gz <user></user>@<ip>:/tmp/``
  - extract and replace files `sudo tar -xzf /tmp/backend-build.tar.gz -C /var/www/<service_name> --strip-components=1`
  - run npm install
  - start service `sudo systemctl start <service_name>`
  - check service status `sudo systemctl status <service_name>`

### Frontend Deployment:

- Briefly explain how updates to the Next.js frontend application are typically handled when using Vercel for deployment (especially if connected to a Git repository).
  - Answer:
    - I haven't used vercel but I have used Netlify and AWS Cloudfront
    - Netlify:
      - Pulls the latest code.
      - Runs the build command (e.g., npm install && npm run build).
      - Deploys the build output to Netlify’s CDN.
    - AWS Cloudfront:
      - Build the Next.js application into static files (next export or other build outputs).
      - Upload the build output to an AWS S3 bucket.
      - Configure CloudFront to serve files from S3 and deliver them globally via CDN
  