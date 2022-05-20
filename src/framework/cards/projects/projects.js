import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import { Project } from './projectContentPullModule/projectContentPull';

function prettyFormatStringNode (text="") { // We are civilised after all
    if (!text.endsWith("."))
    {
        text += ".";
    }
    if (text.charAt(0) !== text.charAt(0).toUpperCase())
    {
        text = text.charAt(0).toUpperCase() + text.substring(1);
    }
    return text;
}

export default function ProjectCard(props) {
    const [projectInfo, setProjectInfo] = useState({name: "", link: "", description:"", comments:[], language:"", typeIcon: ""});
    useEffect(() => {
        //do garbage
        const github = new Project(props.data.type);
        github.URLTransformer = (url)=>{
            url = url.replace("https://github.com/", "https://api.github.com/repos/");
            return url;
        };
        github.getData(props.data.link, (err, repoInfo)=>{
            if (err)
            {
                console.log(`Error while trying to reach ${props.data.link}`);
                setProjectInfo({
                });
                setProjectInfo({
                    name: props.data.link.split("/")[props.data.link.split("/").length-1],
                    link: props.data.link,
                    description: "Couldn't connect to the third-party API to get the project details. Fret not; the link should probably still work!",
                    comments: props.data.comments? props.data.comments.map(element => <p>{prettyFormatStringNode(element)}</p>) : [],
                    language: "love",
                    typeIcon: <i className="fas fa-heart"></i>
                });
            }
            else
            {
                setProjectInfo({
                    name: props.data.link.split("/")[props.data.link.split("/").length-1],
                    link: props.data.link,
                    description: <em>{prettyFormatStringNode(repoInfo.description)}</em>,
                    comments: props.data.comments? props.data.comments.map(element => <p>{prettyFormatStringNode(element)}</p>) : [],
                    language: repoInfo.language,
                    typeIcon: <i className="fab fa-github"></i>
                });
            }
        });
        return ()=>{
            //remove garbage
        }
    }, [props.data]);

    return (
        <div className={styles.container}>
            <a rel="noreferrer" target="_blank" href={projectInfo.link} > <h3> {/* <i className="fas fa-external-link-alt fa-xs"></i> */} {projectInfo.name} {projectInfo.typeIcon}</h3> </a>
            <span>{projectInfo.description}</span>
            {
                projectInfo.comments.map(element => {return element})
            }
            <p>
                <span><em className={styles.builtWithText}>Built with {projectInfo.language}.</em></span>
            </p>
        </div>
    )
}
