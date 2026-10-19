import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { docOgRenderer, blogOgRenderer, pageOgRenderer } from './src/renderer/ImageRenderers';

const config: Config = {
    title: 'EduGeyser',
    tagline: 'Connect Minecraft Education Edition to Java Servers',
    favicon: 'img/favicon.ico',

    url: 'https://edugeyser.org',
    baseUrl: '/',

    organizationName: 'THEMPGUYActions',
    projectName: 'EduGeyserWebsite',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.ts'),
                    // Wiki pages live in this website repository. The project source is linked separately.
                    editUrl: 'https://github.com/THEMPGUYActions/EduGeyserWebsite/tree/master/',
                    routeBasePath: '/wiki',
                    path: 'wiki',
                    // These pages describe GeyserMC-hosted APIs and unrelated projects, not EduGeyser services.
                    exclude: ['api/**', 'other/**'],
                },
                blog: {},
                theme: {
                    customCss: './src/css/custom.scss',
                },
            } satisfies Preset.Options,
        ],
    ],

    markdown: {
        remarkPlugins: [require.resolve('./src/plugins/edugeyser-link-rewrite')],
    },

    plugins: [
        [
            '@kas-tle/docusaurus-og',
            {
                path: './preview-images',
                imageRenderers: {
                    'docusaurus-plugin-content-docs': docOgRenderer,
                    'docusaurus-plugin-content-pages': pageOgRenderer,
                    'docusaurus-plugin-content-blog': blogOgRenderer,
                },
            },
        ],
        'docusaurus-plugin-sass',
        './src/plugins/create-versions-json.ts',
        './src/plugins/create-providers-json.ts',
    ],

    themeConfig: {
        image: 'img/site/geyser.png',
        navbar: {
            title: 'EduGeyser',
            logo: {
                alt: 'EduGeyser logo',
                src: 'img/apple-touch-icon.png',
            },
            items: [
                {
                    type: 'dropdown',
                    label: 'Wiki',
                    className: 'header-wiki-link',
                    position: 'left',
                    to: 'wiki/',
                    items: [
                        {
                            type: 'doc',
                            docId: 'geyser/index',
                            label: 'EduGeyser',
                        },
                        {
                            type: 'doc',
                            docId: 'floodgate/index',
                            label: 'EduFloodgate',
                        },
                    ],
                },
                {
                    to: 'blog',
                    label: 'Blog',
                    position: 'left',
                    className: 'header-blog-link',
                },
                {
                    to: 'download',
                    label: 'Download',
                    position: 'left',
                    className: 'header-download-link',
                },
                {
                    href: 'https://github.com/EduGeyser/EduGeyser',
                    label: 'GitHub',
                    position: 'right',
                    className: 'header-github-link',
                },
                {
                    href: 'https://codeberg.org/SendableMetatype/EduGeyser',
                    label: 'Codeberg mirror',
                    position: 'right',
                },
                {
                    href: 'https://edugeyser.org/discord',
                    label: 'Discord',
                    position: 'right',
                    className: 'header-discord-link',
                },
            ],
        },
        footer: {
            logo: {
                alt: 'EduGeyser logo',
                src: 'img/site/geyser-text.svg',
                href: '/',
                width: 430,
            },
            copyright: `Copyright © ${new Date().getFullYear()} EduGeyser. Built with Docusaurus.<br>This website is not an official Minecraft website and is not associated with Mojang Studios or Microsoft. All product and company names are trademarks or registered trademarks of their respective holders. Use of these names does not imply any affiliation or endorsement by them.`,
            links: [
                {
                    title: 'Wiki',
                    items: [
                        { label: 'EduGeyser setup', to: 'wiki/geyser/setup' },
                        { label: 'Education connection methods', to: 'wiki/geyser/education/connection-methods' },
                        { label: 'EduFloodgate setup', to: 'wiki/floodgate/setup' },
                    ],
                },
                {
                    title: 'Downloads',
                    items: [
                        { label: 'GitHub releases', href: 'https://github.com/EduGeyser/EduGeyser/releases' },
                        { label: 'Codeberg mirror', href: 'https://codeberg.org/SendableMetatype/EduGeyser/releases' },
                        { label: 'EduFloodgate', href: 'https://github.com/EduGeyser/EduFloodgate/releases' },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        { label: 'Discord', href: 'https://edugeyser.org/discord' },
                        { label: 'GitHub source', href: 'https://github.com/EduGeyser/EduGeyser' },
                        { label: 'Codeberg mirror', href: 'https://codeberg.org/SendableMetatype/EduGeyser' },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        { label: 'Blog', to: 'blog' },
                        { label: 'Website source', href: 'https://github.com/THEMPGUYActions/EduGeyserWebsite' },
                    ],
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: [
                'bash', 'batch', 'java', 'json',
                'php', 'powershell', 'csharp', 'ruby',
            ],
        },
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: false,
            respectPrefersColorScheme: false,
        },
        docs: {
            sidebar: {
                hideable: true,
            },
        },
        metadata: [
            { name: 'theme-color', content: '#6d5ae6' },
        ],
    } satisfies Preset.ThemeConfig,
};

export default config;
