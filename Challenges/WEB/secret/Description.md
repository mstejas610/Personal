## SECRET

### Difficulty: MEDIUM
### Description:
Can you pentest this website???

### Docker commands

build
```bash
docker build -t secret .
```

run
```bash
docker run --detach --name {port} -p {port}:3000 secret
```

stop
```bash
docker stop {port} && docker rm {port}
```