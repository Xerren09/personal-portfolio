import React from "react";
import styles from "./section.module.css";

export default function Section(props: ISectionProps) {
    return (
        <section className={styles.section} style={props.style}>
            {
                props.title ? (
                    <h2 id={ props.title.toLowerCase() } className={styles.title}>
                        {props.title}
                    </h2>
                ) : null
            }
            <div className={styles.content}>
                {
                    props.children
                }
            </div>
        </section>
    );
}

interface ISectionProps extends React.PropsWithChildren {
    title?: string;
    style?: React.CSSProperties
}