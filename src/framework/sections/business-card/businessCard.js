import React from 'react';
import styles from './businessCard.module.css';

export default function BusinessCard(props) {
    return (
        <div className={styles.container}>
            <h1>{props.data.name}</h1>
            <div className={styles.subtext}>
                {props.data.tagLine}
            </div>
            <div className={styles.subtext}>
                {props.data.currentlyAt}
            </div>
            <div id={styles.socialBox}>
                <a className={styles.socialsItem} rel="noreferrer" target="_blank" href={props.data.socials.github} ><i className="fab fa-github"></i></a>
                <a className={styles.socialsItem} rel="noreferrer" target="_blank" href={props.data.socials.linkedin} ><i className="fab fa-linkedin"></i></a>
                <a className={styles.socialsItem} rel="noreferrer" target="_blank" href={`mailto:${props.data.socials.email}`} ><i className="fas fa-envelope"></i></a>
            </div>
        </div>
    )
}
