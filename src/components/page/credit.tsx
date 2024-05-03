import React, { useEffect, useState } from "react";

export function AppCredit() {

    const [author, setAuthor] = useState<string>("Bars Margetsch")

    useEffect(() => {
        const match = window.document.title.match(/(?<=📃\s+).*?(?=\s* \| Portfolio)/g);
        if (match) {
            const name = match[0] || null;
            if (name === "Bars Margetsch") {
                setAuthor("me");
            }
        }
    }, []);

    return (
        <footer style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <a rel="noreferrer" target="_blank" href="https://github.com/Xerren09/personal-portfolio"><em>Created by { author } © 2024 </em></a>
        </footer>
    );
}