import React from "react";

export function Page(props: IPageProps) {

    return (
        <div id="Page" style={{
            display: "flex",
            flexDirection: "column",
            padding: 28,
            paddingTop: 28,
            gap: 28,
            justifyContent: "stretch",
            alignContent: "stretch",
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
            <footer style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <a rel="noreferrer" target="_blank" href="https://github.com/Xerren09/personal-portfolio"><em>Created by me! © 2024 </em></a>
            </footer>
        </div>
    );
}

interface IPageProps extends React.PropsWithChildren {
    controls?: React.ReactNode
}