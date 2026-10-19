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
                <img src={HeroImage} alt="EduGeyser logo" className={styles.heroImage} />
                <img src={HeroImage} alt="" className={styles.heroImageBackgroundBlur} />
                <div className={styles.textSection}>
                    <Heading as="h1" className="hero__title">
                        <Translate id="pages.main.title">Connect Education Edition to Java Servers</Translate>
                    </Heading>
                    <p className="hero__subtitle">
                        <Translate id="pages.main.subtitle">Let Minecraft Education Edition players join your Java server with EduGeyser.</Translate>
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
            description="EduGeyser lets Minecraft Education Edition players join Minecraft Java Edition servers."
        >
            <HomepageHeader />
            <main>
                <div className={clsx(styles.features, 'container')}>
                    <HomepageFeature
                        title="What is EduGeyser?"
                        image={Crossplatform2Img}
                        wide
                    >
                        EduGeyser is a Geyser fork that lets Minecraft Education Edition players join Minecraft Java Edition servers. Regular Bedrock players can connect at the same time.
                        <br /><br />
                        Education players authenticate through their Microsoft 365 Education accounts. Their identities are verified through Microsoft Education Services.
                    </HomepageFeature>

                    <HomepageFeature
                        title="How does it work?"
                        image={Crossplatform1Img}
                        flipped
                    >
                        EduGeyser translates supported Bedrock and Education Edition traffic for a Java Edition server. It can run as a standalone proxy or as a plugin/mod, depending on the platform.
                    </HomepageFeature>

                    <HomepageFeature
                        title="Education Edition connection methods"
                        image={Crossplatform0Img}
                    >
                        Connect with the EduGeyser connection ID, join codes, or the Education Edition server list. Regular Bedrock players can still connect alongside Education players.
                        <br /><br />
                        Visit the <a href="/wiki/geyser/education/connection-methods">connection methods guide</a> for setup details.
                    </HomepageFeature>
                </div>
            </main>
        </Layout>
    );
}
