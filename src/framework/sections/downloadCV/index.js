import React from 'react';
import styles from './download.module.css';
import topicStyles from '../../layout/topic.module.css';

export default function DownloadCVButton(props) {

    if (props.data === undefined || props.data.length === 0) {
        return "";
    }
    else {
        return (
            <div className={topicStyles.topic}>
                <div className={topicStyles.cardContainer}>
                    <a id={styles.downloadLink} href={require(`%PUBLIC_URL%/${props.data}.`)} target="_blank">
                        <h3> Grab a small PDF version here </h3>
                    </a>
                </div>
            </div>
        );
    }
}