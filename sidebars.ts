import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    geyserSidebar: [
        'geyser/index',
        {
            type: 'category',
            label: 'Education Edition',
            link: { type: 'doc', id: 'geyser/education/setup' },
            items: [
                'geyser/education/connection-methods',
                'geyser/education/edufloodgate',
                'geyser/education/troubleshooting',
            ],
        },
        {
            type: 'category',
            label: 'Setup',
            link: { type: 'doc', id: 'geyser/setup' },
            items: [
                'geyser/supported-hosting-providers',
                'geyser/using-geyser-with-consoles',
                'geyser/playit-gg',
                'geyser/creating-a-startup-script',
                'geyser/port-forwarding',
            ],
        },
        {
            type: 'category',
            label: 'Common issues',
            link: { type: 'doc', id: 'geyser/common-issues' },
            items: ['geyser/fixing-unable-to-connect-to-world'],
        },
        {
            type: 'category',
            label: 'Configuration',
            items: [
                'geyser/commands',
                'geyser/translations',
                'geyser/geyser-command-line-arguments-and-system-properties',
            ],
        },
        {
            type: 'category',
            label: 'FAQ',
            link: { type: 'doc', id: 'geyser/faq' },
            items: [
                'geyser/supported-versions',
                'geyser/anticheat-compatibility',
                'geyser/current-limitations',
            ],
        },
        {
            type: 'category',
            label: 'Custom content',
            link: { type: 'doc', id: 'geyser/custom-content' },
            items: [
                'geyser/packs',
                'geyser/custom-items',
                'geyser/custom-blocks',
                'geyser/custom-skulls',
                'geyser/custom-waypoints',
                'geyser/custom-entities',
            ],
        },
        {
            type: 'category',
            label: 'EduGeyser API',
            link: { type: 'doc', id: 'geyser/api' },
            items: [
                'geyser/getting-started-with-the-api',
                'geyser/events',
                'geyser/forms',
            ],
        },
        'geyser/extensions',
    ],

    floodgateSidebar: [
        'floodgate/index',
        'floodgate/setup',
        'floodgate/issues',
        'floodgate/faq',
        'floodgate/features',
        'floodgate/commands',
        'floodgate/api',
        'floodgate/linking',
    ],
};

export default sidebars;
