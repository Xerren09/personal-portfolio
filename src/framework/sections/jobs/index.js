import React from 'react';
import topicStyles from '../../layout/topic.module.css';
import JobCard from './job.js';

export default function JobsSection(props) {
    //

    if (props.data === undefined || props.data.length === 0) {
        return "";
    }
    else {
        return (
            <div className={topicStyles.topic}>
                <h2 className={topicStyles.topicTitle}>Experiences</h2>
                <div className={topicStyles.cardContainer}>
                {
                    props.data.map(element => <JobCard data={element}/>)
                }
                </div>
            </div>
        );
    }
}