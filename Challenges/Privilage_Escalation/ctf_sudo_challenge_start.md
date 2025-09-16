# SUDO Privilege Escalation CTF — Quick Start Guide

## Overview
This is a beginner-to-intermediate **privilege escalation** CTF packaged as a Docker image. The container installs a specific version of `sudo` from source and exposes an SSH server. Your goal is to obtain **root** access inside the container and read the flag file located at `/root/fl4g.txt`.

This challenge tests:
- Local enumeration and system discovery
- Identifying version-specific vulnerabilities in `sudo`
- Safe, controlled exploitation in a disposable Docker environment

> **Important:** Do **not** publish the flag publicly. Use the environment for learning and testing only.

---

## Objectives
1. Start the Docker container for the challenge.
2. Connect over SSH as the non-root user.
3. Enumerate the system and the installed `sudo` binary to discover the attack surface.
4. Exploit the correct `sudo` version or misconfiguration to escalate to root.
5. Read `/root/fl4g.txt` once you have root.

---

## Prerequisites
- Docker installed and running on your host machine.
- Basic familiarity with Linux command line, SSH, and Docker.
- (Optional) Knowledge of `sudo` and common local privilege escalation techniques.

---

## Files included in the image
- `/root/fl4g.txt` — the flag (do not share publicly).
- A compiled `sudo` binary built from source (version used by the challenge).
- An SSH server configured to allow password-based login for the CTF user.

---

## Provided credentials
- Username: `ctfuser`  
- Password: `ctfuser@123`  
- Root password (for convenience or testing if you enable root login locally): `rootpassword`  
  *Note:* By default the SSH server is configured to allow only `ctfuser` (see `sshd_config` for `AllowUsers`).

---

## How to build and run (local Docker)

1. Build the Docker image (run in the directory that contains the Dockerfile):
```bash
docker build -t secret-sudo-chal .
```

2. Run the container, mapping a free host port (e.g., `22022`) to container SSH port `22`:
```bash
docker run --detach --name secret-22022 -p 22022:22 secret-sudo-chal
```
Replace `22022` with any free port you prefer.

3. Connect over SSH:
```bash
ssh ctfuser@localhost -p 22022
# password: ctfuser@123
```

4. When finished, stop and remove the container:
```bash
docker stop secret-22022 && docker rm secret-22022
```

---

## Quick enumeration checklist (first steps after login)
Run these commands to start your investigation:
```bash
id
uname -a
cat /etc/os-release
sudo -V        # shows sudo version and some build-time options
which sudo
ls -la /usr/bin/sudo /usr/local/bin/sudo
ls -la /root
env
sudo -l        # list allowed commands (if sudo is usable)
```

---

## Hints (strategic, non-spoiler)
- The image compiles a **specific** `sudo` version from source. Vulnerabilities or misbehaviors can be version-dependent.
- Compare the `sudo` version and compile options to public CVEs and advisories.
- Check whether `sudo` is setuid root and inspect the environment/shell interactions.
- Look for writable configuration files, unusual file permissions, or insecure runtime behavior.
- This challenge is meant to teach careful enumeration and matching the right exploit to the installed version — focus on discovery first.

---

## Safety & etiquette
- Use this image locally or in an isolated lab only.
- Do not deploy vulnerable images to public networks.
- If you’re practicing on shared infrastructure (e.g., a team server), coordinate with teammates so containers and ports don’t conflict.

---

## Troubleshooting
- If SSH connection fails: verify the container is running (`docker ps`) and the correct host port is forwarded.
- If `sudo` doesn’t behave as expected, check `sudo -V` for compile-time flags and examine `/usr` locations where `sudo` may be installed.
- If the user cannot log in via SSH, inspect `/var/log/auth.log` inside the container (you can use `docker exec -it secret-22022 /bin/sh` from the host to peek).

---

## Cleanup
After finishing:
```bash
docker stop secret-22022
docker rm secret-22022
docker rmi secret-sudo-chal
```

---

## Notes for challenge developers (optional)
- Consider adding deliberate red herrings or multiple `sudo` versions to increase difficulty.
- Provide a small hint file accessible to the CTF user if they get stuck (e.g., `/home/ctfuser/HINT.txt`).

---

Good luck — and enjoy learning about safe, responsible privilege escalation!
