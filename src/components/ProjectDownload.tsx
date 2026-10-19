import React, { useEffect, useState } from 'react';
import { Grid } from './Grid';

const GITHUB_REPO = 'EduGeyser/EduGeyser';
const CODEBERG_REPO = 'SendableMetatype/EduGeyser';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}`;
const CODEBERG_API = `https://codeberg.org/api/v1/repos/${CODEBERG_REPO}`;

type ReleaseAsset = {
    name: string;
    browser_download_url?: string;
    size?: number;
};

type Release = {
    tag_name?: string;
    name?: string;
    html_url?: string;
    published_at?: string;
    assets: ReleaseAsset[];
};

type CommitEntry = {
    sha: string;
    html_url?: string;
    created?: string;
    commit?: {
        message?: string;
        author?: { date?: string; name?: string } | null;
    };
};

type Loaded<T> = { value: T; source: 'GitHub' | 'Codeberg' };

async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) {
        throw new Error(`Request failed (${response.status}) for ${url}`);
    }
    return response.json() as Promise<T>;
}

async function loadRelease(): Promise<Loaded<Release>> {
    try {
        const release = await getJson<Release>(`${GITHUB_API}/releases/latest`);
        if (!release.tag_name || !Array.isArray(release.assets)) {
            throw new Error('GitHub returned an invalid release response');
        }
        return { value: release, source: 'GitHub' };
    } catch {
        const releases = await getJson<Release[]>(`${CODEBERG_API}/releases?limit=10`);
        const release = releases.find((item) => !item.tag_name?.toLowerCase().includes('draft') && Array.isArray(item.assets) && item.assets.length > 0);
        if (!release) {
            throw new Error('Neither repository returned a release with downloadable assets');
        }
        return { value: release, source: 'Codeberg' };
    }
}

async function loadCommits(): Promise<Loaded<CommitEntry[]>> {
    try {
        const commits = await getJson<CommitEntry[]>(`${GITHUB_API}/commits?per_page=12`);
        if (!Array.isArray(commits) || commits.length === 0) {
            throw new Error('GitHub returned no commits');
        }
        return { value: commits, source: 'GitHub' };
    } catch {
        const commits = await getJson<CommitEntry[]>(`${CODEBERG_API}/commits?limit=12`);
        if (!Array.isArray(commits) || commits.length === 0) {
            throw new Error('Neither repository returned commit history');
        }
        return { value: commits, source: 'Codeberg' };
    }
}

function formatDate(value?: string): string {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
}

function assetLabel(name: string): string {
    return name
        .replace(/^EduGeyser[-_]?/i, '')
        .replace(/\.jar$/i, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]/g, ' ') || name;
}

export const ProjectDownload: React.FC = () => {
    const [release, setRelease] = useState<Loaded<Release> | null>(null);
    const [commits, setCommits] = useState<Loaded<CommitEntry[]> | null>(null);
    const [releaseFailed, setReleaseFailed] = useState(false);
    const [commitsFailed, setCommitsFailed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        Promise.all([
            loadRelease().catch(() => null),
            loadCommits().catch(() => null),
        ]).then(([releaseResult, commitResult]) => {
            if (cancelled) return;
            setRelease(releaseResult);
            setCommits(commitResult);
            setReleaseFailed(!releaseResult);
            setCommitsFailed(!commitResult);
            setLoading(false);
        });

        return () => { cancelled = true; };
    }, []);

    const assets = (release?.value.assets ?? [])
        .filter((asset) => asset.name?.toLowerCase().endsWith('.jar') && asset.browser_download_url)
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="edugeyser-downloads">
            <section>
                <h2>Latest EduGeyser release</h2>
                {loading && <p>Loading release information…</p>}
                {release && (
                    <>
                        <p>
                            <strong>{release.value.name || release.value.tag_name}</strong>
                            {release.value.published_at ? ` · ${formatDate(release.value.published_at)}` : ''}
                            {' '}<small>(source: {release.source})</small>
                        </p>
                        {assets.length > 0 ? (
                            <Grid elementsPerRow={2} gap="8px">
                                {assets.map((asset) => (
                                    <a
                                        key={asset.name}
                                        href={asset.browser_download_url}
                                        className="no-underline download-button large-button"
                                    >
                                        <b>{assetLabel(asset.name)}</b>
                                        <div>Download {asset.name}</div>
                                    </a>
                                ))}
                            </Grid>
                        ) : (
                            <p>No JAR assets were listed. Open the release page to choose a file.</p>
                        )}
                        {release.value.html_url && (
                            <p><a href={release.value.html_url}>View this release on {release.source}</a></p>
                        )}
                    </>
                )}
                {releaseFailed && (
                    <p>
                        Release information is temporarily unavailable. Try the{' '}
                        <a href="https://github.com/EduGeyser/EduGeyser/releases">GitHub releases</a>
                        {' '}or the{' '}
                        <a href="https://codeberg.org/SendableMetatype/EduGeyser/releases">Codeberg mirror</a>.
                    </p>
                )}
                <p>
                    <a href="https://github.com/EduGeyser/EduGeyser/releases">GitHub releases</a>
                    {' · '}
                    <a href="https://codeberg.org/SendableMetatype/EduGeyser/releases">Codeberg releases fallback</a>
                </p>
            </section>

            <section>
                <h2>Recent EduGeyser commits</h2>
                {loading && <p>Loading commit history…</p>}
                {commits && (
                    <>
                        <p><small>History source: {commits.source}</small></p>
                        <ul>
                            {commits.value.map((entry) => {
                                const message = (entry.commit?.message || 'Commit').split('\n')[0];
                                const url = entry.html_url || (commits.source === 'GitHub'
                                    ? `https://github.com/${GITHUB_REPO}/commit/${entry.sha}`
                                    : `https://codeberg.org/${CODEBERG_REPO}/commit/${entry.sha}`);
                                return (
                                    <li key={entry.sha}>
                                        <a href={url}>{entry.sha.slice(0, 7)}</a>
                                        {' · '}{message}
                                        {formatDate(entry.commit?.author?.date || entry.created) && (
                                            <small> · {formatDate(entry.commit?.author?.date || entry.created)}</small>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
                {commitsFailed && (
                    <p>
                        Commit history is temporarily unavailable. Browse{' '}
                        <a href="https://github.com/EduGeyser/EduGeyser/commits/master">GitHub history</a>
                        {' '}or{' '}
                        <a href="https://codeberg.org/SendableMetatype/EduGeyser/commits/branch/master">Codeberg history</a>.
                    </p>
                )}
            </section>
        </div>
    );
};
