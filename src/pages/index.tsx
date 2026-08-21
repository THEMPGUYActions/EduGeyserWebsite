import clsx from 'clsx';
import Layout from '@theme/Layout';
import Crossplatform0Img from '@site/static/img/site/crossplatform_0.png';
import Crossplatform1Img from '@site/static/img/site/crossplatform_1.png';
import Crossplatform2Img from '@site/static/img/site/crossplatform_2.png';
import Heading from '@theme/Heading';
import HeroImage from '@site/static/img/site/geyser.png';

import styles from './index.module.scss';
import Translate from '@docusaurus/Translate';
import { HomepageFeature } from '../components/HomepageFeature';

function HomepageHeader() {
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className={styles.heroContent}>
                <img src={HeroImage} alt="EduGeyser Logo" className={styles.heroImage} />
                <img src={HeroImage} alt="EduGeyser Logo" className={styles.heroImageBackgroundBlur} />
                <div className={styles.textSection}>
                    <Heading as="h1" className="hero__title">
                        <Translate id='pages.main.title'>Connect Education Edition to Java Servers</Translate>
                    </Heading>
                    <p className="hero__subtitle">
                        <Translate id='pages.main.subtitle'>Enable Minecraft Education Edition clients to join your Minecraft Java server</Translate>
                    </p>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    return (
        <Layout
            title="EduGeyser"
            description="Enable Minecraft Education Edition clients to join your Minecraft Java server."
        >
            <HomepageHeader />

            <main>
                <div className={clsx(styles.features, "container")}>
                    <HomepageFeature
                        title="What is EduGeyser?"
                        image={Crossplatform2Img}
                        wide
                    >
                        <Translate id="components.homepage_features.1.line1">EduGeyser is a Geyser fork that allows Minecraft Education Edition clients to join Minecraft Java Edition servers. Both Education and regular Bedrock players can connect simultaneously.</Translate>
                        <br /><br />
                        <Translate id="components.homepage_features.1.line2">Players authenticate through their Microsoft 365 Education accounts. Player identity is cryptographically verified via Microsoft Education Services.</Translate>
                    </HomepageFeature>

                    <HomepageFeature
                        title="How does it work?"
                        image={Crossplatform1Img}
                        flipped
                    >
                        <Translate id="components.homepage_features.2">Geyser acts as a translator which sits between the Bedrock client and the Java server. It takes data from the Bedrock client and translates it into a format the Java server understands and vice versa. Geyser works with any modern Minecraft version and can be installed either as a plugin or ran as a standalone program.</Translate>
                    </HomepageFeature>

                    <HomepageFeature
                        title="Join from anywhere"
                        image={Crossplatform0Img}
                    >
                        <Translate id="components.homepage_features.3.line1">Geyser can be joined from Bedrock clients on Windows 10/11, iOS, Android, and even consoles. Geyser works with a wide array of hosting providers, but can also be used as its own standalone proxy to join any Minecraft server!</Translate>
                        <br /><br />
                        <Translate id="components.homepage_features.3.line2">If you are a server owner, you can install our Floodgate plugin which allows Xbox Live authenticated Bedrock users to join without a Java Edition account!</Translate>
                    </HomepageFeature>
                </div>
            </main>
        </Layout>
    );
}
