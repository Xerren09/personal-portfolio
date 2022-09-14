import React from 'react';
import topicStyles from '../../layout/topic.module.css';
import GithubProjectCard from './types/github.js';

export default function ProjectsSection(props) {
    //

    if (props.data === undefined || props.data.length === 0) {
        return "";
    }
    else {
        return (
            <div className={topicStyles.topic}>
                <h2 className={topicStyles.topicTitle}>Selected Projects</h2>
                <div className={topicStyles.cardContainer}>
                {
                    props.data.map((element) => {
                        switch (element.type)
                        {
                            case "github":
                                return <GithubProjectCard data={ element } />
                            default:
                                return null;
                        }
                    })
                }
                </div>
            </div>
        );
    }
}