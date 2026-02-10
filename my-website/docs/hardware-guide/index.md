---
sidebar_position: 1
title: "Hardware Setup Guide"
sidebar_label: "Overview"
description: "Setup guides for three hardware configurations -- Digital Twin Workstation, Physical AI Edge Kit, and Cloud-Native development."
keywords: [hardware, setup, workstation, jetson, cloud, installation]
estimated_time: "10 minutes"
prerequisites: []
learning_objectives:
  - "Compare the three supported hardware configurations and their tradeoffs"
  - "Select the hardware path that matches your budget, goals, and available equipment"
  - "Understand the setup time and requirements for each configuration"
---

**Estimated Time**: 10 minutes

:::info[What You'll Learn]
- Compare the three supported hardware configurations and their tradeoffs
- Select the hardware path that matches your budget, goals, and available equipment
- Understand the setup time and requirements for each configuration
:::

:::note[Prerequisites]
No prerequisites -- you can start here.
:::

Choose one of three supported hardware configurations for this course. Each configuration provides a complete development environment for Physical AI.

## Configuration Comparison

| Feature | Workstation | Jetson Edge | Cloud |
|---------|-------------|-------------|-------|
| **Best For** | Full simulation | Edge deployment | No local hardware |
| **GPU Required** | RTX 3060+ | Built-in | Included |
| **Cost** | High | Medium | Pay-as-you-go |
| **Setup Time** | 2-3 hours | 1-2 hours | 30 min |

:::tip[Which Path Should You Choose?]
If you have a gaming PC with an NVIDIA GPU, choose the **Workstation** path for the best experience. If you want to deploy to physical hardware, add the **Jetson Edge Kit**. If you have no local GPU hardware, the **Cloud** path gets you started quickly.
:::

## Choose Your Path

### [Digital Twin Workstation](./workstation.md)

Full-featured local development with GPU-accelerated simulation.

**Requirements:**
- Gaming PC with NVIDIA RTX 3060+ (12GB VRAM)
- 32GB RAM, 100GB SSD
- Ubuntu 24.04 LTS

### [Physical AI Edge Kit](./jetson.md)

NVIDIA Jetson for edge deployment and real hardware.

**Requirements:**
- NVIDIA Jetson Orin Nano or higher
- microSD card (64GB+)
- USB peripherals

### [Cloud-Native Setup](./cloud-options.md)

Cloud-based development without local hardware.

**Requirements:**
- Browser with good internet
- Cloud account (AWS, GCP, or Azure)

:::tip[Key Takeaways]
- Three hardware paths are supported: Workstation (full simulation), Jetson (edge deployment), and Cloud (no local hardware)
- The Workstation path provides the most complete experience with GPU-accelerated simulation
- Cloud setup is fastest (30 minutes) but may have limitations for GPU-intensive simulation chapters
- You can combine paths -- for example, develop on a workstation and deploy to Jetson
:::

## Next Steps

1. Choose the configuration that matches your hardware
2. Follow the step-by-step installation guide for your chosen path
3. Complete the verification checklist
4. Return to the [Introduction](../introduction/index.md) and start learning
