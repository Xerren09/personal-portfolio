import { useEffect, useState } from "react";
import yaml from "js-yaml";
import style from "./style.module.css";
import Cover, { CoverData } from "./cover/cover";
import { Introduction, IntroductionData } from "./sections/introduction";
import { Skills, SkillsData } from "./sections/skills";
import { History, HistoryData } from "./sections/history";
import { Page } from "../../components/page";
import { ThemeToggle } from "../../components/themeToggle";
import { DownloadPDFButton } from "./downloadPdf";
import { ShowCase, ShowCaseData } from "./sections/showcase";
import { GithubProjectTransformer } from "./sections/projects/github";

export default function PortfolioPage() {

    const [data, setData] = useState<null | PageData>(null);

    useEffect(() => {
        fetch("data/contents.yaml").then((response) => {
            response.text().then(pageContents => {
                const pageData: PageData = yaml.load(pageContents) as PageData;
                setData(pageData);
                window.document.title = `📃 ${pageData.cover.name} | Portfolio`;
            });
        });
    }, []);

    return data ? (
        <div className={style.container}>
            {/* Container for the portfolio image and the businesscard data. Aligns to the left on desktop, to top on mobile! */}
            <div className={style.cover}>
                <Cover data={data.cover}></Cover>
            </div>
            {/* Container for the main page contents, basically everything. Aligns to the right on desktop, to bottom on mobile! */}
            <div id="portfolioContent" className={style.content}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        gap: 8,
                        marginLeft: 28,
                        marginRight: 28,
                        marginTop: 8
                    }}
                >
                    <DownloadPDFButton url={ data.pdf }/>
                    <ThemeToggle/>
                </div>
                <Page>
                    <Introduction
                        data={data.introduction}
                    />
                    <Skills
                        title="Skills"
                        data={data.skills}
                    />
                    <History
                        title="Education"
                        data={data.education}
                    />
                    <History
                        title="Experience"
                        data={data.experience}
                    />
                    <ShowCase
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
    education: HistoryData
    experience: HistoryData
    showcase: ShowCaseData
    pdf?: string
}