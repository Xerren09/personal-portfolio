import React from "react";
import { AppCredit } from "./credit";

export function Page(props: IPageProps) {

    return (
        <div id="Page" style={{
            display: "flex",
            flexDirection: "column",
            padding: 28,
            paddingTop: 28,
            gap: 28,
            justifyContent: "stretch",
            alignContent: "stretch"
        }}>
            <div id="PageContent" style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                justifyContent: "stretch",
                alignContent: "stretch"
            }}>
                {
                    props.children
                }
            </div>
            <AppCredit/>
        </div>
    );
}

interface IPageProps extends React.PropsWithChildren {
    controls?: React.ReactNode
}