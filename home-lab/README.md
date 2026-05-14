# Home Lab

Documentation for my home lab environment — setup guides, network architecture, and hands-on attack/detect exercises.

The lab runs on Proxmox VE hosted on a Viglen Genie VIG750S small form factor PC. It is used to practise offensive and defensive techniques in a controlled, isolated environment. Exercises focus on understanding attack paths and detecting or mitigating them using defensive tooling, with all techniques mapped to the MITRE ATT&CK framework.

---

## Setup

| Component | Description |
|-----------|-------------|
| Hypervisor | Proxmox VE 9.1.1 on Viglen Genie VIG750S (i5-7400, 16GB RAM, 240GB SSD) |
| Attacker VM | Kali Linux 2026.1 — full package installer, Xfce desktop |
| Target VM | Metasploitable 2 — deliberately vulnerable Linux server |
| Study VM | Ubuntu Desktop 22.04 LTS — university coursework and general use |
| Internal network | vmbr1 — isolated bridge with dnsmasq DHCP (192.168.100.0/24) |
| External network | vmbr0 — bridged to home router for internet-facing VMs |

Full setup documentation including issues encountered and resolutions: [setup.md](setup.md)

---

## Exercises

> Attack/detect walkthroughs will be added as the lab develops.

| Exercise | Technique | ATT&CK ID | Detection Method |
|----------|-----------|-----------|-----------------|
| — | — | — | — |

---

## Tools in Use

| Tool | Purpose |
|------|---------|
| Kali Linux | Attacker platform — Nmap, Metasploit, Burp Suite, Wireshark |
| Metasploitable 2 | Vulnerable target for exploitation practice |
| Nmap | Network enumeration and service discovery |
| Metasploit | Exploitation framework |
| Proxmox VE | Hypervisor — VM management and network isolation |

---

[← Back to portfolio](../README.md)