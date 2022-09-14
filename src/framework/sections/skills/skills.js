import React from 'react';
import styles from './skills.module.css';

export default function SkillsCard(props) {
    return (
        <div className={styles.container}>
            <h4>{props.data.name}: </h4>
            <p>{props.data.list.toString().replace(/,/g, ", ")}.</p>
        </div>
    )
}
