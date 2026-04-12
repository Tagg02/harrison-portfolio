# TryHackMe — Intro to LAN 

**Date completed: April 2026**
**Platform:** TryHackMe
**Difficulty:** Easy
**Category:** Networking Fundamentals
**Room URL:** tryhackme.com/room/introtolan

**MITRE ATT&CK Techniques:**
- T1046: Network Service Discovery
- T1557.002: ARP Cache Poisoning
- T1557.003: DHCP Spoofing

---

## Overview

A theory based room that covered LAN topologys, the ARP protocol and the process of DHCP. A focus on building foundation networking knowledge relevant to how traffic works across a network

---

## Key concepts Covered


### LAN topologies

**Star Topology**
All devices are connected to a central switch. This is most commonly useed inside of enterprise evnvironments due to it being the most efficient topology for transmitting data. The weak point is the switch - if it is compromised an attacker can monitor data of the whole network. It is the most resillient however as a device failing does not disable the network.

**Ring Topology**
Devices are connected in a closed loop - data travels around the loop in one direction passing through each device until it reaches its destination. Any device failing in this network will disable the entire ring. Still found in some legacy environments.

**Bus Topology**
All of the devices are connected to a single shared cable (the backbone). Data sent on the network by any device can be viewed by any other device on the network -  as they are checking if the data is addressed to them. From a security viewpoint this a significant weakpoint as any compromise device inside of the network will have access to all traffic without performing an active attack. This topology is obsolete in modern networks replaced by star topology typically.

### ARP (Address Resolution Protocol)

ARP is used to resolve IP addresses to MAC addresses on a local network. When a device wants to connect to another device it will send a broadcast requesting asking who has a specific IP address requesting the MAC address of said device. The device with the requested address will respond with their MAC address. The requesting device will map this to their ARP table and cache it.


### DHCP (Dynamic Host Configuration Protocol)

DHCP will automatically assign an IP address to devices joining a network - the process is four steps DORA:

- **Discover** - the new device broadcasts asking for an IP address
- **Offer** - a DHCP server responds with an available IP
- **Request** - the devices accepts the offered IP
- **Acknowledge** - the server confirms the assignment

---

## Further Research

*This section covers topics not in the room that I looked into after completing it.*

**ARP has no authentication**
After learning about the fundamentals of ARP I researched into the weaknesses of it from a security standpoint this led me to ARP Cache Poisoning. An attacker would sends ARP replies associating their own MAC address with legit IP addresses. Other devices will update their ARP mapping with this false mapping causing traffic to be sent to the attacker instead of the intended target, this creates a man-in-the-middle position. This maps to MITRE ATT&CK T1557.002 (Adversary-in-the-Middle: ARP Cache Poisoning). To detect this a SIEM rule monitoring for gratuitous ARP replies or multiple IP addresses claiming the samne MAC address would flag this behavior.

**DHCP has no authentication either**
The saame as ARP applies to DHCP, a rogue DHCP server on a network can respond to discover requests before the legitmate server can. This would mean the malicous DHCP server has itself assigned as the default gateway, all traffic would then be routed through the malicous server. This maps to T1557.003 (DHCP Spoofing). To detect this you would have to monitor for multiple DHCP servers responding on the same network.

**Topology relevance to defence**
The ring topology prompted me to look into OT and legacy network environments. Critical National Infrastructure organisations - including utilities like United Utilities where I completed a placement - sometimes run legacy topolgies and protocols that were designed for reliability, not security.



---

## Commands Used
 
No commands — theory room.

---

## MITRE ATT&CK Mapping

| Technique ID | Name | Notes |
|--------------|------|-------|
| T1046 | Network Service Discovery | Understanding LAN topology supports how attackers enumerate internal networks |
| T1557.002 | ARP Cache Poisoning | ARP's lack of authentication enables man-in-the-middle via spoofed replies |
| T1557.003 | DHCP Spoofing | Rogue DHCP server can intercept traffic from newly joined devices |

---

## What I Learned

ARP and DHCP were designed for functionality inside of safe networks and did not have security in consideration. Understanding this helps me to understand why proffesional environments have DHCP snooping and dynamic ARP inspection in place. The extra research section reinforced that foundational protocol knowledge is a starting point for understanding both how attacks work and how to detect them. I plan to build detection rules for T1557.002 and T1557.003 in my home Elastic SIEM lab to see what these attacks look like in practice.

---

*Write-up produced as part of home lab and portfolio work. github.com/Tagg02*
