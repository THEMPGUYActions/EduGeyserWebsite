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

## Can I use normal Geyser plugins with EduGeyser?

EduGeyser is based on Geyser technology, but it includes additional changes and integrations for Minecraft Education Edition support. Plugins and extensions that depend on internal Geyser behavior may require changes to support EduGeyser.

Always check whether an extension explicitly supports EduGeyser before installing it on a production server.

## Why does my Minecraft Education Edition client fail to connect?

Check that you are using an EduGeyser-compatible setup, that your server supports the required Education Edition connection flow, and that any required EduFloodgate configuration is installed correctly.

If you are migrating from a regular Geyser setup, review the EduGeyser setup documentation because some configuration options differ.
