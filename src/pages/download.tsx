import React from 'react';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import Layout from '@theme/Layout';
import { ProjectDownload } from '@site/src/components/ProjectDownload';

export default function Download(): JSX.Element {
    return (
        <Layout
            title="Download EduGeyser"
            description="Download EduGeyser releases from GitHub, with Codeberg as a fallback."
        >
            <HeroBanner
                title="Download EduGeyser"
                subheading="Get the latest EduGeyser builds and browse the project's commit history."
                backgroundImage={HeroBackground}
            />
            <main>
                <div className="container container--fluid margin-vert--lg">
                    <ProjectDownload />
                    <section className="margin-top--lg">
                        <h2>Related Education Edition projects</h2>
                        <p>
                            EduFloodgate adds Education Edition authentication support for online-mode servers.
                            Its modded builds are published separately.
                        </p>
                        <p>
                            <a href="https://github.com/EduGeyser/EduFloodgate/releases">EduFloodgate releases</a>
                            {' · '}
                            <a href="https://codeberg.org/SendableMetatype/EduFloodgate/releases">EduFloodgate Codeberg fallback</a>
                            {' · '}
                            <a href="https://github.com/EduGeyser/EduFloodgate-Modded/releases">EduFloodgate-Modded releases</a>
                        </p>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
