import React from 'react';
import styles from './cover.module.css';

export default function Cover(props: ICoverProps) {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundImage: "var(--cover-background)",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            backgroundPosition: "center"
        }}>
            <div className={styles.container}>
                <h1>{props.data.name}</h1>
                <div className={styles.subtext}>
                    {props.data.tag}
                </div>
                <div className={styles.subtext}>
                    {props.data.currentlyAt}
                </div>
                <div id={styles.socialBox}>
                    { /* Rest of the socials is dynamic */}
                    {
                        props.data.socials.map(social =>
                            <a
                                className={styles.socialsItem}
                                rel="noreferrer"
                                target="_blank"
                                href={social.url}
                            >
                                <i className={`fa-brands fa-${social.name}`}></i>
                            </a>
                        )
                    }        
                    { /* Email is always static */}
                    {
                        props.data.email ? <a className={styles.socialsItem} rel="noreferrer" target="_blank" href={`mailto:${props.data.email}`} ><i className="fas fa-envelope"></i></a> : undefined
                    }
                </div>
                <div>
                    <button
                        className={styles.mobileJump}
                        style={{
                            background: "unset",
                            border: "none",
                            color: "var(--text-primary)",
                            marginTop: 28,
                            marginBottom: 42
                        }}
                        onClick={() => { document.getElementById('portfolioContent')?.scrollIntoView(); }}
                    >
                        <i className="fas fa-angle-down fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>
        
    )
}

interface ICoverProps extends React.PropsWithChildren {
    data: CoverData
}

export interface CoverData {
    name: string;
    tag: string;
    currentlyAt: string;
    email: string;
    socials: Array<{ name: string; url: string; }>
}