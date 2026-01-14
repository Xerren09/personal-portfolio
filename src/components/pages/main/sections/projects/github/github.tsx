import styles from "./github.module.css";
import { type ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { type ShowcaseItem, type ShowcaseProjectTransformer } from "../../showcase";
import Comments from "@components/comments";

// Disabled due to fast refresh warning
// eslint-disable-next-line
export const GithubProjectTransformer: ShowcaseProjectTransformer = {
    type: "github",
    getComponent: function (item: ShowcaseItem): ReactNode {
        return (<GithubProject data={item}></GithubProject>)
    }
}

const defaultErrorMessage = "Couldn't connect to the third-party API to get the project details. Fret not; the link should probably still work!";

export default function GithubProject(props: { data: ShowcaseItem }) {

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
        <div className={ styles.box }>
            <h3 className={ styles.title }>
                <i>
                    <FontAwesomeIcon icon={faGithub} />
                </i>
                <a target="_blank" href={props.data.url} >
                    {props.data.url.replace(/\/+$/, "").slice((props.data.url.lastIndexOf("/") + 1))}
                </a>
            </h3>
            {
                projectInfo.description ? (
                    <span>
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
                        Built with {projectInfo.language == "love" ? "❤️" : projectInfo.language }.
                    </em>
                </span>
            </p>
        </div>
    )
}