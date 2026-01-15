import React from "react";
import Copyright from "../copyright";
import styles from "./page.module.css";

export default function Page(props: IPageProps) {
    return (
        <main id={ styles.Page }>
            <div id={ styles.PageContent }>
                {
                    props.children
                }
            </div>
            <Copyright style={{
                alignSelf: props.alignFooter ?? 'flex-start'
            }}/>
        </main>
    );
}

interface IPageProps extends React.PropsWithChildren {
    alignFooter?: 'flex-start' | 'center' | 'flex-end'
}