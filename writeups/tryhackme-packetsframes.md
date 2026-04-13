# TryHackMe — Packets & Frames

**Date completed: April 2026**
**Platform:** TryHackMe
**Difficulty:** Easy
**Category:** Networking Fundamentals
**Room URL:** tryhackme.com/room/packetsframes

**MITRE ATT&CK Techniques:**
- T1040: Network Sniffing
- T1499: Endpoint Denial of Service
- T1557: Adversary-in-the-Middle

*Note: techniques from further research — not covered in the room itself.*

---

## Overview

A theory-based room covering how data is broken down into packets and frames for transmission across a network, how the TCP three-way handshake establishes connections, and how UDP differs from TCP. Builds directly on the OSI model room — packets operate at Layer 3 and frames at Layer 2.

---

## Key Concepts Covered

### Packets and Frames

**Frames  (Layer 2 - Data Link)**
A frame is the unit of data on Layer 2. It contains the source and destination of the MAC addresses and is used to transfer data between devices on a local network. Frames don't carry IP addresses as they operate on MAC addresses. When data crosses through a router to another network, the frame is stripped and a new one is created.

**Packets (Layer 3 - Network)**
A packet is the unit of data on Layer 3. It contains the source and destination IP addresses and is used to route data between different networks. A packet is encapsulated inside of a frame when travelling across a local network segment.

**Why the distinction matters**
Frames are used to talk between devices on the same network. Packets route data between different networks. A wireshark capture will show both - the frame headers at Layer 2 and the packet headers at Layer 3 sitting inside them. Understanding this is what makes packet analysis less confusing.

### TCP (Transmission Control Protocol)

TCP is a connection-oriented protocol operating on Layer 4. It guarentees delivery by establishing a connection before sending data and confirming reciept of every segment.

**The Three-Way Handshake**
Before data is sent, TCP establishes a connection using three steps:
1. **SYN** - the client sends a SYN (synchronise) packet to the server, indicating it wants an open connection
2. **SYN-ACK** - the server responds with a SYN-ACK (synchronise-acknowledge), confirming it recieved the SYN and is ready
3. **ACK** - the client sends a ACK (acknowledge), confirming it recieved the SYN-ACK. The connection is now established and data can flow

**The Four-Way Handshake**
 
 TCP also has a structured process for closing connections:
 1. **FIN** - one side sends a FIN (finish) packet indicating it has finished sending data
 2. **ACK** - the other side acknowledges the FIN
 3. **FIN** - the other side sends its own FIN
 4. **ACK** the original side acknowledges, the connection is closed


**TCP Headers**

TCP packets include several important header fields including: source and destination port numbers, sequence numbers (for reassembling segments in the correct order), acknowledgment numbers, and dlags (SYN, ACK, FIN, RST, PSh, URG)

### UDP (User Datagram Protocol)

UDP is a connectionless protocol also operating on Layer 4. Unlike TCP it does not establish a connection, does not guarentee delivery of the data and doesnt confirm reciept of delivery. Simply put data is sent and if it isnt recieved its not retransmitted.

**When UDP is used**
UDP is used when speed matters more than reliability - video streaming, DNS queries, VoIP calls, online gaming. A dropped packet in a video call is acceptable, a dropped packet in a file transfer is not.


**UDP vs TCP summary**
 
| | TCP | UDP |
|--|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | No guarantee |
| Speed | Slower | Faster |
| Use cases | File transfer, web browsing, email | Streaming, DNS, VoIP |

---

## Further Research

*This section covers topics not in the room that I looked into after completing it.*


**SYN flood attacks**
The TCP three-way-handshake has a well known vulnerability where an attacker can flood a server with ACK requests but never finish the handshake - the server allocates resources waiting for an ACK that will never arrive. With enough SYN packets the servers connection table will fill up meaning there is no room for legitimate connections. This is a DOS (denial of service) attack mapping to T1499 (Endpoint Denial of Service). To detect and prevent this a SIEM rule monitoring for a high volume of SYN packets from a single source with no ACK responses would flag this.

**TCP session hijacking**
Due to the fact TCP uses sequence numbers to track packets, an attacker who can predict or intercept the sequence numbers can inject malicous packets into an established TCP connection. This maps to T1557 (Adversary-in-the-Middle) - the attacker doesn't need to break the connection, just inject into it. Modern encryption methods like TLS will mitigate this significantly.

**Port numbers at Layer 4**
TCP and UDP both use port numbers to direct traffic to the correct application on a device. Well-known ports: HTTP (80), HTTPS (443), SSH (22), FTP (21), DNS (53), RDP (3389). Knowing these ports is useful for Nmap enumeration - when a scan returns an open port on 3389 on a Windows machine, this immediately suggests RDP is running and is a potential attack surface.


---

## Commands Used

No commands — theory room.

---

## MITRE ATT&CK Mapping

*From further research — not covered in the room itself.*


| Technique ID | Name | OSI Layer | Notes |
|--------------|------|-----------|-------|
| T1040 | Network Sniffing | Layer 2/3 | Capturing packets from network traffic |
| T1499 | Endpoint Denial of Service | Layer 4 | SYN flood exploits the TCP handshake |
| T1557 | Adversary-in-the-Middle | Layer 4 | TCP session hijacking via sequence number prediction |

---

## What I Learned

The three-way handshake is something I have studied before but completing this room concreted the knowledge for me. Undertsanding SYN, SYN-ACK and ACK as distinct steps explains how both TCP work and how SYN floods are effective - the vulnerability is in the design itself not a bug. The port numbers section is useful for my future work inside of university as I will be able to identify common ports in Nmap itself instead of looking them up. This room also tied together two previous write-ups: frames from the IntroToLAN ARP discussion, packets from the OSI model, and now the transport-layer protocols sitting above both.

---

*Write-up produced as part of home lab and portfolio work. github.com/Tagg02*
