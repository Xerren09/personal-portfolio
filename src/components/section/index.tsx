import React from "react";
import styles from "./section.module.css";

export function Section(props: ISectionProps) {
    return (
        <div className={styles.section} style={props.style}>
            {
                props.title ? (
                    <h2 className={styles.title}>
                        {props.title}
                    </h2>
                ) : undefined
            }
            
            <div className={styles.content}>
                {
                    props.children
                }
            </div>
        </div>
    );
}

interface ISectionProps extends React.PropsWithChildren {
    title?: string;
    style?: React.CSSProperties
}