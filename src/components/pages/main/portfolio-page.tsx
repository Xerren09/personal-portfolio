import { useEffect, useState } from "react";
import yaml from "js-yaml";
import style from "./portfolio.module.css";

import Cover, { type CoverData } from "./cover/cover";
import Introduction, { type IntroductionData } from "./sections/introduction";
import Skills, { type SkillsData } from "./sections/skills";
import Timeline, { type TimelineData } from "./sections/timeline";
import Showcase, { type ShowcaseData } from "./sections/showcase";
import Page from "@components/page";
import ThemeToggle from "@components/theme/toggle";
import GetCV from "@components/cv";
import { GithubProjectTransformer } from "./sections/projects/github/github";

export default function PortfolioPage() {

    const [data, setData] = useState<null | PageData>(null);

    useEffect(() => {
        fetch("/contents.yaml").then((response) => {
            response.text().then(pageContents => {
                const pageData: PageData = yaml.load(pageContents) as PageData;
                setData(pageData);
                window.document.title = `${pageData.cover.name} | Portfolio`;
            });
        });
    }, []);

    return data ? (
        <div className={style.container}>
            {/* Container for the portfolio image and the business card data. Aligns to the left on desktop, to top on mobile! */}
            <div className={style.cover}>
                <Cover data={data.cover}/>
            </div>
            {/* Container for the main page contents, basically everything. Aligns to the right on desktop, to bottom on mobile! */}
            <div id="portfolioContent" className={style.content}>
                <div
                    className={style.menubar}
                >
                    <GetCV url={ data.pdf }/>
                    <ThemeToggle/>
                </div>
                <Page alignFooter="center">
                    <Introduction
                        data={data.introduction}
                    />
                    <Skills
                        title="Skills"
                        data={data.skills}
                    />
                    <Timeline
                        title="Education"
                        data={data.education}
                    />
                    <Timeline
                        title="Experience"
                        data={data.experience}
                    />
                    <Showcase
                        title="Projects"
                        data={data.showcase}
                        transformers={[GithubProjectTransformer]}
                    />
                </Page>
            </div>
        </div>
    ) : (<span></span>);
}

export interface PageData {
    cover: CoverData
    introduction: IntroductionData
    skills: SkillsData
    education: TimelineData
    experience: TimelineData
    showcase: ShowcaseData
    pdf?: string
}