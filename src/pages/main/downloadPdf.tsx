export function DownloadPDFButton(props: PDFButtonProps) {
    return props.url === undefined ? null : (
        <a
            style={{
                display: "flex",
                flexDirection: "row",
                width: "fit-content",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: 10,
                boxShadow: "var(--shadow)",
                backgroundColor: "var(--panel-background)",
                color: "var(--url-default)",
                border: "none",
                padding: 8,
                gap: 8
            }}
            target="_blank"
            href={props.url}
            rel="noreferrer"
        >
            <i className="fa-solid fa-download" style={{lineHeight: "inherit"}}></i> Less cool, but PDF!
        </a>
    );
}

interface PDFButtonProps {
    url: string | undefined;
}