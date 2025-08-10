## Task 2: Database Maintenance & Backup 💾

### PostgreSQL Backup:

- Describe the general steps or commands you would use to perform a manual backup of the PostgreSQL database running inside a Docker container. Specify how you might execute pg_dump against the containerized instance.
- Answer:
  - search container id by run `docker ps`
  - run dump by command `docker exec -t <postgres_container_id> pg_dump -U <db_user> <db_name> > backup_postgres_$(date +%F).sql`
  - verify first
  - if its okay compress the backup by run `tar -czvf backup_postgres_$(date +%F).tar.gz backup_postgres_$(date +%F).sql`
  - if the data its super duper important, you can encrypted first `gpg --symmetric --cipher-algo AES256 backup_postgres_$(date +%F).tar.gz`. If not so, you can skip this step
  - put the backup file to sompelace, you can used S3 or anything else even Google Drive. Is depends on your budget :V
    `

### MongoDB Backup:

- Similarly, describe the general steps or commands for performing a manual backup of the MongoDB database running inside its Docker container, potentially using mongodump.
- Answer:
- search container id by run `docker ps`
- run dump by command `docker exec -t <mongo_container_name> mongodump --db <db_name> --out /tmp/mongobackup_$(date +%F)`
- verify first
- if its okay compress the backup by run `tar -czvf mongobackup_$(date +%F).tar.gz mongobackup_$(date +%F)/`
- if the data its super duper important, you can encrypted first `gpg --symmetric --cipher-algo AES256 mongobackup_$(date +%F).tar.gz`. If not so, you can skip this step
- put the backup file to sompelace, you can used S3 or anything else even Google Drive. Is depends on your budget :V

### Backup Storage:

- Where would you recommend storing these database backups securely? Briefly explain why.
  - Answer : AWS S3 bucket. I often used S3 Bucket. And for what i known its have super durability. However its quite expensive than digitalOcean. But I totally recommend AWS S3 bucket.
