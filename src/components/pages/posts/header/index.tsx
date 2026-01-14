import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import yaml from "js-yaml";
import Section from "@components/section";
import { Link } from "react-router";

export default function PortfolioBox() {

    const [data, setData] = useState<IBlogHeader>();

    useEffect(() => {
        fetch(`${window.location.origin}/blog/header.yaml`).then((response) => {
            response.text().then(headerContent => {
                const header: IBlogHeader = yaml.load(headerContent) as IBlogHeader;
                setData(header);
            });
        });
    }, []);

    return (
        <Section>
            <div className={ styles.container } >
                <Link to={"/"}>
                    <img
                        src="/cover.webp"
                        height={80}
                        width={80}
                        alt="Profile"
                    />
                </Link>
                <div>
                    <h3>
                        {data?.name}
                    </h3>
                    <p>
                        {data?.tag}
                    </p>
                    <Link to={"/"}>Check out my portfolio <i><FontAwesomeIcon icon={ faCaretRight } size="lg" /></i> </Link>
                </div>
            </div>
        </Section>
    );
}

interface IBlogHeader {
    name: string;
    tag: string;
}