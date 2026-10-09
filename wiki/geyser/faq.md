---
title: Frequently Asked Questions
description: Common EduGeyser questions and troubleshooting answers.
---

# Frequently Asked Questions

## Why is regular MCXboxBroadcast not working with EduGeyser?

Regular MCXboxBroadcast is not compatible with EduGeyser's NetherNet implementation.

EduGeyser includes native NetherNet support and uses its own connection handling through its API. The standard MCXboxBroadcast setup was designed for the normal Geyser environment and does not include the EduGeyser-specific integration required for native connections.

To use Xbox friends list broadcasting with EduGeyser, use the EduGeyser fork of MCXboxBroadcast:

https://github.com/EduGeyser/MCXboxBroadcast

The EduGeyser version is built to work with EduGeyser's API and NetherNet support.

If you previously installed the regular MCXboxBroadcast extension, remove it before installing the EduGeyser-compatible version to prevent extension conflicts.
