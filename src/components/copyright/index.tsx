import React, { useEffect, useState } from "react";

export default function Copyright(props: ICopyrightProps) {

    const [author, setAuthor] = useState<string>("Bars Margetsch")

    useEffect(() => {
        const match = window.document.title.match(/.*?(?=\s* \| Portfolio)/g);
        if (match) {
            const name = match[0] || null;
            if (name === "Bars Margetsch") {
                // This is safe because of the empty dependency array
                //eslint-disable-next-line
                setAuthor("me");
            }
        }
    }, []);

    return (
        <footer style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            ...props?.style
        }}>
            <a rel="noreferrer" target="_blank" href="https://github.com/Xerren09/personal-portfolio"><em>Created by { author } © 2024 </em></a>
        </footer>
    );
}

interface ICopyrightProps {
    style: React.CSSProperties | undefined
}