import { faFileArrowDown, faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Downloads } from '../types/downloads';
import { Column, Columns } from './Columns';
import { Grid } from './Grid';

interface ProjectDownloadProps {
    projectId: string;
    description?: React.ReactNode;
    setup?: string;
    downloadsInfo: {
        [key: string]: string | React.ReactNode;
    };
    additionalDownloads?: {
        [key: string]: { url: string, file: string };
    };
    gridColumns?: number;
    warning?: React.ReactNode;
    downloadUrl?: string;
    staticDownloads?: boolean;
}

export const ProjectDownload: React.FC<ProjectDownloadProps> = ({ projectId, description, setup, downloadsInfo, additionalDownloads, gridColumns, warning, downloadUrl, staticDownloads }) => {
    const [platformInfo, setPlatformInfo] = useState<Downloads.Builds>({
        project_id: '',
        project_name: '',
        version: '',
        builds: []
    });

    const [latestBuild, setLatestBuild] = useState<Downloads.Build>({
        project_id: '',
        project_name: '',
        version: '',
        build: 0,
        time: new Date().toLocaleDateString(),
        channel: '',
        promoted: false,
        changes: [],
        downloads: {}
    });

    const [changes, setChanges] = useState<Downloads.BaseBuild['changes']>([]);
    const [releaseAssets, setReleaseAssets] = useState<Array<{ name: string; url: string }>>([]);
    const [releaseUrl, setReleaseUrl] = useState('https://github.com/EduGeyser/EduGeyser/releases');
    const [releaseName, setReleaseName] = useState('Latest release');
    const [recentCommits, setRecentCommits] = useState<Array<{ sha: string; message: string; url: string }>>([]);
    const [isEduGeyserLoaded, setIsEduGeyserLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const isEduProject = projectId === 'geyser' || projectId === 'floodgate';

    useEffect(() => {
        if (staticDownloads) {
            setIsLoaded(true);
            return;
        }

        let cancelled = false;
        const fetchEduGeyserData = async () => {
            const githubRepo = projectId === 'floodgate' ? 'EduGeyser/EduFloodgate' : 'EduGeyser/EduGeyser';
            const codebergRepo = projectId === 'floodgate' ? 'SendableMetatype/EduFloodgate' : 'SendableMetatype/EduGeyser';
            const githubReleasesUrl = 'https://github.com/' + githubRepo + '/releases';
            let release: any = null;
            let commits: any[] = [];

            try {
                const response = await fetch('https://api.github.com/repos/' + githubRepo + '/releases/latest');
                if (!response.ok) throw new Error('GitHub releases unavailable');
                release = await response.json();
                setReleaseUrl(release.html_url || githubReleasesUrl);
                setReleaseName(release.name || release.tag_name || 'Latest release');
                setReleaseAssets((release.assets || []).map((asset: any) => ({
                    name: asset.name,
                    url: asset.browser_download_url || asset.url
                })));
            } catch {
                try {
                    const response = await fetch('https://codeberg.org/api/v1/repos/' + codebergRepo + '/releases/latest');
                    if (!response.ok) throw new Error('Codeberg releases unavailable');
                    release = await response.json();
                    setReleaseUrl(release.html_url || 'https://codeberg.org/' + codebergRepo + '/releases');
                    setReleaseName(release.name || release.tag_name || 'Latest release');
                    setReleaseAssets((release.assets || []).map((asset: any) => ({
                        name: asset.name,
                        url: asset.browser_download_url || asset.url
                    })));
                } catch {
                    setReleaseUrl('https://codeberg.org/' + codebergRepo + '/releases');
                    setReleaseName('View releases on Codeberg');
                    setReleaseAssets([]);
                }
            }

            try {
                const response = await fetch('https://api.github.com/repos/' + githubRepo + '/commits?per_page=12');
                if (!response.ok) throw new Error('GitHub commit history unavailable');
                const data = await response.json();
                commits = data.map((entry: any) => ({
                    sha: entry.sha,
                    message: entry.commit?.message?.split('\n')[0] || 'Commit',
                    url: entry.html_url || 'https://github.com/' + githubRepo + '/commit/' + entry.sha
                }));
            } catch {
                try {
                    const response = await fetch('https://codeberg.org/api/v1/repos/' + codebergRepo + '/commits?limit=12');
                    if (!response.ok) throw new Error('Codeberg commit history unavailable');
                    const data = await response.json();
                    commits = data.map((entry: any) => ({
                        sha: entry.sha || entry.commit?.sha || '',
                        message: entry.commit?.message?.split('\n')[0] || entry.commit?.message || 'Commit',
                        url: entry.html_url || 'https://codeberg.org/' + codebergRepo + '/commit/' + (entry.sha || entry.commit?.sha)
                    }));
                } catch {
                    commits = [];
                }
            }

            if (cancelled) return;
            setRecentCommits(commits.filter((entry: any) => entry.sha));
            setIsEduGeyserLoaded(true);
            setIsLoaded(true);
        };

        if (isEduProject) {
            fetchEduGeyserData();
        } else {
            const fetchPlatformInfo = async () => {
                try {
                    const response = await fetch(new URL(`/v2/projects/${projectId}/versions/latest/builds`, 'https://download.geysermc.org'));
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data: Downloads.Builds = await response.json();
                    setPlatformInfo(data);
                    setLatestBuild(data.builds[data.builds.length - 1]);
                    const allChanges: Downloads.BaseBuild['changes'] = [];
                    data.builds.forEach(build => allChanges.push(...build.changes));
                    setChanges(allChanges.reverse().slice(0, 12));
                    setIsLoaded(true);
                } catch (error) {
                    console.error('Failed to fetch platform info:', error);
                    setIsLoaded(true);
                }
            };
            fetchPlatformInfo();
        }

        return () => { cancelled = true; };
    }, [projectId, staticDownloads, isEduProject]);

    const fadeInStyle = {
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
    };

    return (
        <div style={fadeInStyle}>
            <p>{description}</p>
            <Columns>
                <Column>
                    <h3>{isEduProject ? releaseName : staticDownloads ? 'Latest release:' : `Build #${latestBuild.build} · ${new Date(latestBuild.time).toLocaleDateString()}:`}</h3>
                    <Grid elementsPerRow={gridColumns || 2} gap="8px">
                        { warning &&
                            <div className='warning-box'>
                                { warning }
                            </div>
                        }
                        { setup &&
                            <a href={setup} className='no-underline setup-button large-button'>
                                <b><FontAwesomeIcon icon={faBook}/> Setup Instructions</b>
                            </a>
                        }
                        {
                            (isEduProject
                                ? Object.keys(downloadsInfo)
                                : staticDownloads ? Object.keys(downloadsInfo) : Object.keys(latestBuild.downloads)).map((platformId, i) => {
                                const matchingAsset = isEduProject
                                    ? releaseAssets.find(asset => {
                                        const name = asset.name.toLowerCase();
                                        const aliases: Record<string, string[]> = {
                                            bungeecord: ['bungeecord', 'bungee', 'waterfall'],
                                            fabric: ['fabric'],
                                            neoforge: ['neoforge', 'neo-forge'],
                                            spigot: ['spigot', 'paper', 'bukkit'],
                                            standalone: ['standalone', 'cli'],
                                            velocity: ['velocity'],
                                            viaproxy: ['viaproxy', 'via-proxy']
                                        };
                                        return (aliases[platformId] || [platformId]).some(alias => name.includes(alias)) && name.endsWith('.jar');
                                    })
                                    : undefined;
                                const href = isEduProject
                                    ? matchingAsset?.url || releaseUrl
                                    : downloadUrl || `https://download.geysermc.org/v2/projects/${projectId}/versions/latest/builds/latest/downloads/${platformId}`;
                                const fileLabel = isEduProject
                                    ? matchingAsset?.name || 'View release assets'
                                    : staticDownloads ? 'Latest release' : latestBuild.downloads[platformId]?.name || 'Latest build';
                                return (
                                    <a href={href} key={i} className='no-underline download-button large-button'>
                                        <b>{downloadsInfo[platformId]}</b>
                                        <div>
                                            <FontAwesomeIcon icon={faFileArrowDown}/> {fileLabel}
                                        </div>
                                    </a>
                                )
                            })
                        }
                        {
                            additionalDownloads && Object.keys(additionalDownloads).map((platformId, i) => {
                                return (
                                    <a href={additionalDownloads[platformId].url} key={i} className='no-underline download-button large-button'>
                                        <b>{downloadsInfo[platformId]}</b>
                                        <div>
                                            <FontAwesomeIcon icon={faFileArrowDown}/> {additionalDownloads[platformId].file}
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </Grid>
                </Column>
                { !staticDownloads &&
                    <Column>
                        <h3>{isEduProject ? 'Recent commits:' : 'Recent Changes:'}</h3>
                        <ul>
                            {isEduProject
                                ? (isEduGeyserLoaded && recentCommits.length > 0
                                    ? recentCommits.map((commit, i) => (
                                        <li key={commit.sha || i}>
                                            <b><a className='download-link' href={commit.url}>{commit.sha.substring(0, 7)}</a></b> · {commit.message}
                                        </li>
                                    ))
                                    : <li><a href={'https://github.com/' + (projectId === 'floodgate' ? 'EduGeyser/EduFloodgate' : 'EduGeyser/EduGeyser') + '/commits/master'}>View {projectId === 'floodgate' ? 'EduFloodgate' : 'EduGeyser'} commit history</a><> · <a href={'https://codeberg.org/' + (projectId === 'floodgate' ? 'SendableMetatype/EduFloodgate' : 'SendableMetatype/EduGeyser') + '/commits/branch/master'}>Codeberg fallback</a></></li>)
                                : changes.map((change, i) => (
                                    <li key={i}><b><a className='download-link' href={`https://github.com/GeyserMC/${platformInfo.project_name}/commit/${change.commit}`}>{change.commit.substring(0, 7)}</a></b> · <LinkedCommitMessage message={change.summary} repo={platformInfo.project_name}/></li>
                                ))}
                        </ul>
                    </Column>
                }
            </Columns>
        </div>
    );
};

function LinkedCommitMessage({ message, repo }) {
    const regex = /#(\d+)/g;
    const parts = message.split(/(#\d+)/).filter((part: string) => part);

    const linked = parts.map((part, index) => {
        if (part.match(regex)) {
            const number = part.replace('#', '');
            return <a key={index} href={`https://github.com/GeyserMC/${repo}/pull/${number}`}>{part}</a>;
        }
        return part;
    });

    return <>{linked}</>;
}