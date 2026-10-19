# EduGeyser Website

This is the EduGeyser documentation website, built using [Docusaurus 3](https://docusaurus.io/).

This repository is a fork of the original Geyser website adapted for **EduGeyser**. Documentation, examples, links, and development references should target the EduGeyser project instead of upstream GeyserMC.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Project Structure

- [`blog/`](/blog/): Blog markdown files
- [`wiki/`](/wiki/): Wiki markdown files
    - [`api/`](/wiki/api/): REST API documentation
    - [`floodgate/`](/wiki/floodgate/): EduFloodgate documentation
    - [`geyser/`](/wiki/geyser/): EduGeyser documentation
    - [`other/`](/wiki/other/): Other projects documentation
- [`i18n/`](/i18n/): Translations for the website
- [`openapi/`](/openapi/): OpenAPI specification files used to generate REST API documentation
- [`src/`](/src/): Source of the website
    - [`components/`](/src/components/): React components
    - [`css/`](/src/css/): Styles
    - [`data/`](/src/data/): Data files, such as hosting providers and supported Minecraft versions
    - [`pages/`](/src/pages/): Pages of the website
    - [`renderer/`](/src/renderer/): Renderer for thumbnails
    - [`theme/`](/src/theme/): Overrides to the base Docusaurus theme, such as Font Awesome icons
    - [`types/`](/src/types/): TypeScript types
- [`static/`](/static/): Static content
    - [`img/`](/static/img/): Images
- [`docusaurus.config.ts`](/docusaurus.config.ts): Docusaurus configuration file
- [`package.json`](/package.json): Node.js project file and scripts
- [`sidebars.ts`](/sidebars.ts): Site sidebar configuration
- [`tsconfig.json`](/tsconfig.json): TypeScript configuration file
- [`yarn.lock`](/yarn.lock): Yarn lock file for Node.js dependencies

## API Documentation Generation

The REST API documentation is generated from the OpenAPI specifications in `openapi/` using the Docusaurus OpenAPI Docs plugin. The generated documentation should be regenerated when its source specifications change.

With the project's Yarn scripts, run:

```sh
yarn gen-all
```

To clean the generated API documentation before regenerating it, run:

```sh
yarn re-gen
```

The individual scripts are also available: `gen-api-docs`, `clean-api-docs`, `gen-api-docs:version`, and `clean-api-docs:version`. The `gen-all` and `re-gen` scripts include the versioned API documentation tasks defined in `package.json`.

## Quick Start

The project requires Node.js 22 or later and uses Yarn 4. Clone the repository, install dependencies, and start the local development server:

```sh
git clone https://github.com/EduGeyser/EduGeyserWebsite
cd EduGeyserWebsite
yarn
yarn start
```

To check a production build locally, run:

```sh
yarn build
yarn serve
```

The development server reflects most changes automatically. The production build is useful for catching build-time errors and broken links before submitting changes.
