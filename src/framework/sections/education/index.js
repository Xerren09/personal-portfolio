import React from 'react';
import topicStyles from '../../layout/topic.module.css';
import EducationCard from './education.js';

export default function EducationSection(props) {
    //

    if (props.data === undefined || props.data.length === 0) {
        return "";
    }
    else {
        return (
            <div className={topicStyles.topic}>
                <h2 className={topicStyles.topicTitle}>Education</h2>
                <div className={topicStyles.cardContainer}>
                    {
                        props.data.map(element => <EducationCard data={element}/>)
                    }
                </div>
            </div>
        );
    }
}