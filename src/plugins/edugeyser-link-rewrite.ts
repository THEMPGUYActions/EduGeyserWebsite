type MarkdownNode = {
    type?: string;
    url?: unknown;
    name?: string;
    value?: unknown;
    children?: MarkdownNode[];
    attributes?: MarkdownNode[];
};

function rewriteLinks(value: string): string {
    return value
        .replace(/https?:\/\/github\.com\/GeyserMC\/GeyserWebsite(?=[\/#?]|$)/gi, 'https://github.com/THEMPGUYActions/EduGeyserWebsite')
        .replace(/https?:\/\/github\.com\/GeyserMC\/Geyser(?=[\/#?]|$)/gi, 'https://github.com/EduGeyser/EduGeyser')
        .replace(/https?:\/\/github\.com\/GeyserMC\/Floodgate(?=[\/#?]|$)/gi, 'https://github.com/EduGeyser/EduFloodgate')
        .replace(/https?:\/\/wiki\.geysermc\.org\/geyser(?=[\/#?]|$)/gi, 'https://edugeyser.org/wiki/geyser')
        .replace(/https?:\/\/wiki\.geysermc\.org\/floodgate(?=[\/#?]|$)/gi, 'https://edugeyser.org/wiki/floodgate')
        .replace(/https?:\/\/geysermc\.org\/wiki\/geyser(?=[\/#?]|$)/gi, 'https://edugeyser.org/wiki/geyser')
        .replace(/https?:\/\/geysermc\.org\/wiki\/floodgate(?=[\/#?]|$)/gi, 'https://edugeyser.org/wiki/floodgate')
        .replace(/https?:\/\/geysermc\.org\/download\/?(?=[#?]|$)/gi, 'https://edugeyser.org/download')
        .replace(/https?:\/\/discord\.geysermc\.org\/?/gi, 'https://edugeyser.org/discord');
}

function visit(node: MarkdownNode): void {
    if (typeof node.url === 'string') {
        node.url = rewriteLinks(node.url);
    }

    if (node.type === 'mdxJsxAttribute' && typeof node.value === 'string') {
        node.value = rewriteLinks(node.value);
    }

    if ((node.type === 'html' || node.type === 'text') && typeof node.value === 'string') {
        node.value = rewriteLinks(node.value);
    }

    node.children?.forEach(visit);
    node.attributes?.forEach(visit);
}

export default function eduGeyserLinkRewrite() {
    return (tree: MarkdownNode) => visit(tree);
}
