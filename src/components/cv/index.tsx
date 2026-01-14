import styles from "./cv.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function GetCV(props: PDFButtonProps) {
    return props.url === undefined ? null : (
        <a
            className={styles.GetCV}
            target="_blank"
            href={props.url}
            rel="noreferrer"
        >
            <i> 
                <FontAwesomeIcon icon={faDownload}/>
            </i>
            Less cool, but PDF!
        </a>
    );
}

interface PDFButtonProps {
    url: string | undefined;
}