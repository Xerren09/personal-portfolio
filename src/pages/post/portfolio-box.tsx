import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import yaml from "js-yaml";
import image from "../../assets/image.png"
import { Section } from "../../components/section";

export function PortfolioBox() {

    const [data, setData] = useState<IBlogHeader>();

    useEffect(() => {
        fetch(`${window.location.origin}/data/blog/header.yaml`).then((response) => {
            response.text().then(headerContent => {
                const header: IBlogHeader = yaml.load(headerContent) as IBlogHeader;
                setData(header);
            });
        });
    }, []);

    return (
        <Section>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 22
                }}
            >
                <img
                    style={{
                        objectFit: "cover",
                        objectPosition: "25% 25%",
                        borderRadius: 10
                    }}
                    src={image}
                    height={"75px"}
                    width={"75px"}
                    alt="Profile"
                />
                <div
                    style={{
                        margin: 0,
                    }}
                >
                    <h3
                        style={{
                            lineHeight: 0.6
                        }}
                    >
                        {data?.name}
                    </h3>
                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        {data?.tag}
                    </p>
                    <Link to={"/"}>See more <i className="fa-solid fa-caret-right"></i></Link>
                </div>
            
            </div>
        </Section>
    );
}

interface IBlogHeader {
    name: string;
    tag: string;
}