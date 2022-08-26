import React, { useState, useEffect } from 'react';
import styles from '../projects.module.css';
import { Project } from '../projectBase/projectClass';
import prettyFormatStringNode from '../../../prettyFormatString.js';

export default function GithubProjectCard(props) {
    const [projectInfo, setProjectInfo] = useState({description:"Couldn't connect to the third-party API to get the project details. Fret not; the link should probably still work!", language:"love"});
    useEffect(() => {
        const github = new Project("https://github.com/", "https://api.github.com/repos/");
        github.GetData(props.data.url).then(response => {
            setProjectInfo({
                description: <em>{prettyFormatStringNode(response.description)}</em>,
                language: response.language,
            });
        })
    }, [props.data]);

    let comments = (
        <p/>
    );

    if (props.data.comments !== undefined && props.data.comments.length !== 0) {
        comments = props.data.comments.map(element => <p>{prettyFormatStringNode(element)}</p>);
    }

    return (
        <div className={styles.container}>
            <a rel="noreferrer" target="_blank" href={props.data.url} > <h3> { prettyFormatStringNode(props.data.url.slice((props.data.url.lastIndexOf("/")+1)), true) } { <i className="fab fa-github"></i> }</h3> </a>
            <span>{projectInfo.description}</span>
            {
                comments
            }
            <p className={styles.builtWithText}>
                <span> <em > Built with {projectInfo.language}. </em> </span>
            </p>
        </div>
    )
}
