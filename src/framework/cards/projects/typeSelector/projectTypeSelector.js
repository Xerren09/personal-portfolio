import React, { useState, useEffect } from 'react';
//import styles from './projects.module.css';
import axios from 'axios';
import { Project } from '../projectContentPullModule/projectContentPull';

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

    const [projectModuleArray, addNewProjectType] = useState({types: [], modules: {}});

    useEffect(() => {
        //do garbage
        props.data.forEach(element => {
            switch (element.type)
            {
                case "github":

                    break;
                default:
                    break;
            }
        });
        const github = new Project(props.data.type, props.data.link);
        github.URLTransformer = (url)=>{
            url = url.replace("https://github.com/", "https://api.github.com/repos/");
            return url;
        };
        github.getData((err, repoInfo)=>{
            if (err)
            {
                console.log("Error reaching github");
            }
            else
            {
                let comments = [];
                if (props.data.comments)
                {
                    comments = props.data.comments.map(element => <p>{prettyFormatStringNode(element)}</p>);
                }
                setProjectInfo({
                    name: repoInfo.name,
                    link: repoInfo.html_url,
                    description: prettyFormatStringNode(repoInfo.description),
                    comments: comments,
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
        <div>
            <a rel="noreferrer" target="_blank" href={projectInfo.link} > <h3> <i className="fas fa-external-link-alt fa-xs"></i> {projectInfo.name} {projectInfo.typeIcon}</h3> </a>
            <span>{projectInfo.description}</span>
            {
                projectInfo.comments.map(element => {return element})
            }
            <p>
                <span><i>Written in {projectInfo.language}</i></span>
            </p>
        </div>
    )
}
