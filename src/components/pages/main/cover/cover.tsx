import React from 'react';
import styles from './cover.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faAngleDown, faLink } from "@fortawesome/free-solid-svg-icons";

//<FontAwesomeIcon icon={(Object.values(fab).find(element => element.iconName == social.name)) ?? faLink} />

export default function Cover(props: ICoverProps) {
    return (
        <div id={ styles.main }>
            <div className={styles.container}>
                <h1>{props.data.name}</h1>
                <div className={styles.subtext}>
                    {props.data.tag}
                </div>
                <div className={styles.subtext2}>
                    {props.data.currentlyAt}
                </div>
                <address id={styles.socialBox}>
                    { /* List socials with icons */}
                    {
                        props.data.socials.map((social, index) =>
                            <a
                                key={ social?.name ?? index }
                                className={styles.socialsItem}
                                referrerPolicy='origin'
                                target="_blank"
                                href={social.url}
                            >
                                {
                                    social.name == undefined ? <FontAwesomeIcon icon={faLink}/> : <i className={`fa-brands fa-${social.name}`}/>
                                }
                            </a>
                        )
                    }        
                    { /* Email is always static */}
                    {
                        props.data.email ? <a className={styles.socialsItem} title='Reach out via email!' rel="noreferrer" target="_blank" href={`mailto:${props.data.email}`} ><FontAwesomeIcon icon={faEnvelope} /></a> : undefined
                    }
                </address>
                <div>
                    <button
                        className={styles.mobileJump}
                        onClick={() => { document.getElementById('portfolioContent')?.scrollIntoView(); }}
                    >
                        <i> 
                            <FontAwesomeIcon icon={faAngleDown} size='2x'/>
                        </i>
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
    socials: Array<{ name: string | undefined; url: string; }>
}