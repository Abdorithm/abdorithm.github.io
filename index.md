## initiate the socks proxy
```shell
ssh -i .ssh/vm_key.pem -D 6886 -N abdo@20.0.106.79
```
## connect using the .ovpn file
```shell
sudo openvpn --config rithmtunnel.ovpn
```

## conf:
```shell
client
proto tcp-client
remote 20.52.186.52 52920 # ip and port
dev tun
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
verify-x509-name server_yvWPsKF48KjTyByE name
auth SHA256
auth-nocache
cipher AES-128-GCM
tls-client
tls-version-min 1.2
tls-cipher TLS-ECDHE-ECDSA-WITH-AES-128-GCM-SHA256
ignore-unknown-option block-outside-dns
setenv opt block-outside-dns # Prevent Windows 10 DNS leak
verb 3
socks-proxy localhost 6886
socks-proxy-retry
route 20.0.106.79 255.255.255.255 net_gateway # ip
```
