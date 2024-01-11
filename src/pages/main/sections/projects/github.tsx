import { ReactNode, useEffect, useState } from "react";
import { ShowCaseItem, ShowCaseProjectTransformer } from "../showcase";
import { Comments } from "../../../../components/comments/comments";

export const GithubProjectTransformer: ShowCaseProjectTransformer = {
    type: "github",
    getComponent: function (item: ShowCaseItem): ReactNode {
        return (<GithubProject data={item}></GithubProject>)
    }
}

const defaultErrorMessage = "Couldn't connect to the third-party API to get the project details. Fret not; the link should probably still work!";

export default function GithubProject(props: { data: ShowCaseItem }) {

    const [projectInfo, setProjectInfo] = useState({ description: "", language: "love" });
    
    useEffect(() => {
        const url = props.data.url.replace("https://github.com/", "https://api.github.com/repos/");
        fetch(url).then(response => {
            if (response.ok) {
                response.json().then(repoData => {
                    setProjectInfo({
                        description: repoData.description || "",
                        language: repoData.language || "love",
                    });
                });
            }
            else {
                console.error(defaultErrorMessage);
            }
        });
    }, [props.data]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <h3 style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                gap: 8
            }}>
                <i style={{ lineHeight: "inherit" }} className={`fab fa-${props.data.type}`}></i>
                <a rel="noreferrer" target="_blank" href={props.data.url} >
                    {props.data.url.replace(/\/+$/, "").slice((props.data.url.lastIndexOf("/") + 1))}
                </a>
            </h3>
            {
                projectInfo.description ? (
                    <span style={{
                            marginBottom: 8
                        }}
                    >
                        <em>
                            {projectInfo.description}
                        </em>
                    </span>
                ) : undefined
            }
            <Comments data={ props.data.comments } />
            <p
                title={projectInfo.language === "love" ? defaultErrorMessage : ""}
            >
                <span>
                    <em>
                        Built with {projectInfo.language}.
                    </em>
                </span>
            </p>
        </div>
    )
}