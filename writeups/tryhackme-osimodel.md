# TryHackMe — OSI Model

**Date completed: April 2026**
**Platform:** TryHackMe
**Difficulty:** Easy
**Category:** Networking Fundamentals
**Room URL:** tryhackme.com/room/osimodelzi

**MITRE ATT&CK Techniques:**
- T1046: Network Service Discovery
- T1499: Endpoint Denial of Service
- T1557.002: ARP Cache Poisoning
- T1562: Impair Defenses
- T1190: Exploit Public-Facing Application

*Note: techniques from further research — not covered in the room itself.*
---

## Overview

A theory based room covering the OSI (Open Systems Interconnection) model - which is a 7 layer framework which standardises how data moves across a network. Understanding the OSI model is foundational in cyber security due to all attack, defence and detections operate on seperate layers of the model, knowing which layer each technique targets is essential for both offensive and defensive work.

---

## Key Concepts Covered

### The 7 Layers

The OSI model operates on seven layer, data travels down the layers on the sending side (encapsulation) and back up the layers on the recieving side (decapsulation).

### Layer 1 — Physical

This is the physical transmission of raw binary across a network - it could be electrical signals across coper wire, light pulses over fibre optic, radio waves over WiFi. Data on this layer is called bits.

### Layer 2 — Data Link

This layer is responsible for transferring data between devices on the same network using MAC addresses. Switches are functioning on this layer. Data on this layer is called a frame. Adds error checking to detect corruption during transmission.

### Layer 3 — Network

This layer is responsible for transmitting data between seperate networks using IP addresses. Router operate on this level. Data on this layer is called a Packet.

### Layer 4 — Transport

Responsible for end-to-end communication between devices. Breaks data into segments and reasembles them at the destination. There are two key protocols:
 - **TCP (Transmission Control Protocol)** - reliable, connection-oriented, guarentees delivery. Uses the three way handshake (SYN, SYN-ACK, ACK) to establish connecitons.
 - **UDP (User Datagram Protocol)** - faster, connectionless, no guarentee of delivery. Used where speed matters more than reliability - video streaming, DNS queries, VoIP.

### Layer 5 — Session

The session layer manages the opening, maintaining, and closing of sessions between devices. It ensures that the data from different applications is kept seperate. Handles authentication and reconection if a session drops.

### Layer 6 — Presentation

This layer is responsible for translating data into a format that the application data can understand. Handles encryption, decryption and data compression. HTTPS encryption and decryption happens here.

### Layer 7 — Application

This is the layer closest to the user. Where network applications and protocols operate - HTTP, HTTPS, FTP, DNS, SMTP. This is where user facing data originates and where web application attacks occur.

### Encapsulation and Decapsulation

As data travels through the layers on the sending device, each layer will add its own header (and sometimes trailer) containing relevant information - this is encapsulation. On the receiving device, each layer will strip its header as data travels back up the layers - this is decapsulation. Understanding encapsulation explains how wireshark can inspect traffic at different layers.

---

## Further Research

*This section covers topics not in the room that I looked into after completing it.*

**Why the OSI model matters for security — layer-specific attacks**
After completing this room I mapped out common attack types and the layer they target:
- Layer 1 (Physical): Physical cable tapping, hardware keyloggers
- Layer 2 (Data Link): ARP Cache Poisoning (T1557.002) from the previous room — this makes sense now as ARP operates at Layer 2
- Layer 3 (Network): IP spoofing (T1562), ICMP flood, routing attacks
- Layer 4 (Transport): SYN flood DDoS (T1499), port scanning (T1046), TCP session hijacking
- Layer 5 (Session): Session hijacking, cookie theft
- Layer 6 (Presentation): SSL stripping attacks, downgrade attacks on encryption
- Layer 7 (Application): SQL injection, XSS, phishing, HTTP floods

This mapping is practically useful - when investigating an incident in a SIEM, knowing which OSI layer the attack targets tells you where to look for evidence and what tools to use.

**Firewalls and the OSI model**
Standard firewalls (packet filtering) operate at Layer 3 and 4 - they inspect IP addresses and ports. Web Application Firewalls (WAFs) operate at Layer 7 -  they inspect application-layer requests like HTTP requests. This explains why a firewalls wouldnt stop a SQL injection attack as the traffic looks legit on Layer 3 and 4, the malicous content is only viewable on Layer 7.

**Wireshark and encapsulation**
Understanding encapsulation explains how Wireshark works - it captures raw frames at Layer 2 and decodes each of the Layers headers upwards. When I use Wireshark in my home lab I'll be looking at the practical result of everything this room covered theoretically.

---

## Commands Used

No commands — theory room.

---

## MITRE ATT&CK Mapping

| Technique ID | Name | Notes |
|--------------|------|-------|
| T1046 | Network Service Discovery | Layer 4 | Port scanning targets the transport layer |
| T1499 | Endpoint Denial of Service | Layer 4 | SYN flood exhausts TCP connection resources |
| T1557.002 | ARP Cache Poisoning | Layer 2 | Covered in previous room — now contextualised within OSI |
| T1562 | Impair Defenses | Layer 3 | IP spoofing operates at the network layer |
| T1190 | Exploit Public-Facing Application | Layer 7 | Web application attacks target the application layer |

---

## What I Learned

Understanding the OSI model helps me to understand everything else involved in Networking. By knowing which layer a protocol or attack operates at answers the question of which tool detects it, which control prevents it, and where in packet capture to look for evidence. The connection back to the previous room was useful - ARP Cache Poisoning now has a clearer context as a Layer 2 attack. Ill be applying this model whenever I use Wireshark in my home lab - capturing traffic and identifying which OSI layer each header belongs to is the practical version of what this room covered theoretically.

---

*Write-up produced as part of home lab and portfolio work. github.com/Tagg02*
