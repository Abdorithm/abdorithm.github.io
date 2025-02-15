---
layout: post
title:  "How to set up TOR on linux"
date:   2025-02-15 17:49:28 +0200
categories: linux
---
First, install the tor and privoxy packages from your distribution's package manager.

Inside the TOR config file (torrc), I use an obfs4 bridge (obfs4proxy should be installed)
```
UseBridges 1 
ClientTransportPlugin obfs4 exec /usr/bin/obfs4proxy

Bridge obfs4 bla bla bla
Bridge obfs4 bla bla bla
```

Inside privoxy config
```
forward-socks5 / localhost:9050 .
```

Start tor and privoxy
```
systemctl start tor
```

```shell
systemctl start privoxy
```

Check tor status (wait for Bootstrapped 100% (done): Done)
```shell
journalctl -exft Tor
```

Append this or configure app settings to tunnel traffic through TOR using Privoxy
```
export http_proxy="http://127.0.0.1:8118/"
```
