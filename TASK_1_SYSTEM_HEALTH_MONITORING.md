## Task 1: System Health & Monitoring 🩺

### Backend Service Status:

- How would you check the current status (e.g., running, failed, stopped) of the NestJS backend service managed by systemd on the Ubuntu server?
  - Answer: Run command `sudo systemctl status <service_name>`
- If the service was not running, how would you attempt to start it?
  - Answer:
    - Run command `sudo systemctl start <service_name>`
    - If stuck try to restart by run command `sudo systemctl restart <service_name>`

### Database Container Status:

- How would you list all running Docker containers on the Ubuntu server?
  - Answer:
    - Run command `docker ps` for all status run `docker ps -a`
- How would you check if the PostgreSQL and MongoDB containers are healthy and running?
  - Answer: Answered by this Run command `docker ps` for all status run `docker ps -a`

### Server Resource Monitoring:

- What are two key metrics you would monitor on the Ubuntu server on DigitalOcean to ensure its overall health (e.g., CPU, memory, disk)?
  - Answer: CPU & Memory Usage. But if you want be perfect for prod monitoring, check Disk Usage and Network Traffic as well.
- What command(s) could you use to quickly check these metrics from the command line?
  - Answer:
    - for CPU usage: Run command `top`
    - for disk usage: Run command `df -h`