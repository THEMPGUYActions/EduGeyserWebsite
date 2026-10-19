# EduGeyser website

This repository contains the public website and wiki for [EduGeyser](https://github.com/EduGeyser/EduGeyser), a Geyser fork that lets Minecraft: Education Edition players connect to Minecraft: Java Edition servers.

The production site is [edugeyser.org](https://edugeyser.org). It is built with Docusaurus 3 and deployed to GitHub Pages through GitHub Actions.

## Project repositories

- Main source and commit history: [EduGeyser/EduGeyser](https://github.com/EduGeyser/EduGeyser)
- Codeberg fallback mirror: [SendableMetatype/EduGeyser](https://codeberg.org/SendableMetatype/EduGeyser)
- Related authentication project: [EduFloodgate](https://github.com/EduGeyser/EduFloodgate)
- This website and its wiki source: [THEMPGUYActions/EduGeyserWebsite](https://github.com/THEMPGUYActions/EduGeyserWebsite)

The website reads EduGeyser releases and recent commits from GitHub first. If GitHub's API is unavailable, it falls back to the EduGeyser Codeberg mirror. Wiki pages are authored in this repository, so the edit links point here rather than to a code repository that does not contain those pages.

## Development

Requirements: Node.js 22 or later and Yarn 4.

```sh
git clone https://github.com/THEMPGUYActions/EduGeyserWebsite.git
cd EduGeyserWebsite
corepack enable
yarn install
yarn start
```

Build and type-check the site:

```sh
yarn build
yarn typecheck
```

## Attribution

EduGeyser is based on Geyser. Upstream attribution is retained where relevant, while project downloads, commit history, documentation navigation, and support links use EduGeyser destinations.
