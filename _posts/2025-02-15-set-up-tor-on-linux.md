---
layout: post
title:  "How to set up TOR with an HTTP proxy on Linux"
date:   2025-02-15 17:49:28 +0200
categories: linux
---
## Installing Tor
### First, install the tor package from your distribution's package manager.

For Arch-based distros:
```shell
sudo pacman -S tor
```
### Start tor.
```shell
systemctl start tor
```
### Check tor status (wait for Bootstrapped 100% (done): Done)
```shell
journalctl -exft Tor
```
If it does not reach 100% and displays errors. This might be because tor traffic is blocked in your area. You probably need to use a bridge. You can get a bridge from [the tor project official site](https://bridges-test.torproject.org/).

Inside the TOR config file ``/etc/tor/torrc``, I use an obfs4 bridge. You will need to install the ``obfs4proxy`` package for your distro.
```shell
UseBridges 1 
ClientTransportPlugin obfs4 exec /usr/bin/obfs4proxy

Bridge BRIDGE-LINE-1
Bridge BRIDGE-LINE-2 
```
Now, start tor again and observe the status. It should be up and running. To forward traffic through it, there are multiple options.

## Forwarding traffic through tor
### 1. Tor's built-in HTTP CONNECT tunnel.
This is Tor's official way of doing it. Also, It is the method I use the most. Note that this is not a full HTTP Proxy. It is just an HTTP CONNECT tunnel. [RTFM (Read The Fantastic Manual)](https://2019.www.torproject.org/docs/tor-manual.html.en#HTTPTunnelPort).

You only need to add this line to ``/etc/tor/torrc``. Make sure no other app is using your specified port.
```shell
HTTPTunnelPort 127.0.0.1:8118
```
Use the following environment variable or configure proxy settings in your apps, if it exists.
```shell
https_proxy="127.0.0.1:8118"
```
This method does not support HTTP traffic without TLS. You will need to only use HTTPS.

To test it in a terminal, run this command:
```shell
https_proxy="127.0.0.1:8118" curl https://check.torproject.org/
```
If you get the page response (HTML document), your connection was successful. Note that I am enforcing HTTPS because otherwise it wouldn't work.

### 2. Using an HTTP Proxy like ``privoxy`` or ``proxychains``.

Install privoxy.
```shell
sudo pacman -S privoxy
```
Inside privoxy config ``/etc/privoxy/config``, uncomment this line:
```shell
forward-socks5 / localhost:9050 .
```
Start privoxy.
```shell
systemctl start privoxy
```
Use the following environment variables or configure proxy settings in your apps, if it exists.
```shell
http_proxy="127.0.0.1:8118"
https_proxy="127.0.0.1:8118"
```
To test if it works, you can try this in your terminal:
```shell
http_proxy="127.0.0.1:8118" curl check.torproject.org
```
If you get an instant ``301 Moved Permanently`` response, your connection was successful.

I won't bother with ``proxychains`` because it does not have support for proxying apps that use 32-bit libraries (like Steam and Java). You need to build a 32-bit ``proxychains`` yourself. [See this github issue](https://github.com/rofl0r/proxychains-ng/issues/434). However, If you want to use ``proxychains``, you should edit the config file in ``/etc/proxychains.conf`` and append ``proxychains`` to any command in the terminal.
```shell
proxychains firefox
```

