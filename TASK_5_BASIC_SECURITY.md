## Task 5: Basic Security 🛡️

### Server Security:

- What are two basic security practices you would ensure are implemented and maintained for the Ubuntu server hosted on DigitalOcean (e.g., related to access, firewall)? 
-Answer:  
  - secure SSH access:
    - used ssh authentice key only
    - whitelist access ssh for specific ip 
    - Change the default SSH port from 22 to a non-standard port. Brute force attack usually came from default port
  - enable firewall :
    - allow only necessary port
    - Deny all other inbound connections by default.


