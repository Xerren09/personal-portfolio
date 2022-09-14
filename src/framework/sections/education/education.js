import React from 'react';
import styles from './education.module.css';

export default function EducationCard(props) {

    let comments = (
        <p/>
    );

    if (props.data.comments !== undefined && props.data.comments.length !== 0) {
        comments = (
            <div>
                <ul>
                {
                    props.data.comments.map(element => <li>{element}</li>)
                }
                </ul>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <a rel="noreferrer" target="_blank" href={props.data.url}><h3>{props.data.name}</h3></a>
            <div>
                {props.data.degree}
            </div>
            { comments }
            <div className={styles.period}>
                <em>{props.data.start} - {props.data.end}</em>
            </div>
        </div>
    )
}
