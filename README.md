# EduGeyser Website

This is the EduGeyser documentation website built using [Docusaurus 3](https://docusaurus.io/).

This repository is a fork of the original Geyser website adapted for **EduGeyser**. Documentation, examples, links, and development references should target the EduGeyser project instead of upstream GeyserMC.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Project Structure

- [`blog/`](/blog/): Blog markdown files
- [`wiki/`](/wiki/): Wiki markdown files
    - [`api/`](/wiki/api/): REST API documentation
    - [`floodgate/`](/wiki/floodgate/): Floodgate documentation
    - [`geyser/`](/wiki/geyser): EduGeyser documentation
    - [`other/`](/wiki/other/): Other projects documentation
- [`i18n/`](/i18n/): Translations for the website
- [`openapi/`](/openapi/): OpenAPI specification files
- [`src/`](/src/): Source of the website
- [`static/`](/static/): Static content

## Quick Start

```sh
git clone https://github.com/EduGeyser/EduGeyserWebsite
cd EduGeyserWebsite
yarn
yarn start
```
