import { useEffect, useState } from "react";
import style from "./blog.module.css";

import { Link, useLocation, useNavigate, useParams } from "react-router";

import yaml from "js-yaml";
import Markdown from 'react-markdown'

import PortfolioBox from "./header";
import CodeBlock from "./codeblock";
import Page from "@components/page";
import ThemeToggle from "@components/theme/toggle";
import Section from "@components/section";
import SmartLink from "@components/smartlink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

export default function BlogPostPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [meta, setMeta] = useState<IBlogPostMeta | null>(null);
    const [content, setContent] = useState<string | null>(null);

    const [navSource, setNavSource] = useState<string | null>(null);

    function ParseMeta(raw: string) {
        let postMeta: IBlogPostMeta;
        try {
            postMeta = yaml.load(raw) as IBlogPostMeta;
            setMeta({
                title: postMeta.title,
                date: postMeta.date,
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (location.state?.from != undefined) {
            setNavSource(location.state.from);
        }
    }, [location]);

    useEffect(() => {
        if (postId == undefined) {
            return;
        }
        // Load content markdown
        const metaUrl = new URL(`/blog/${postId}/meta.yaml`, window.origin);
        const contentUrl = new URL(`/blog/${postId}/post.md`, window.origin);

        fetch(contentUrl).then((response) => {
            if (response.ok == false) {
                throw `Blog post doesn't exist: ${response.status}.`;
            }
            response.text().then(markdown => {
                // Grab markdown front matter
                const match = /(?<=---)(.*?)(?=---)/s.exec(markdown);
                if (match != null && match.length >= 1) {
                    console.log("Getting post meta from markdown front matter");
                    // +6 to account for the starting and closing --- tags
                    markdown = markdown.substring(match[0].length + 6, markdown.length);
                    ParseMeta(match[0]);
                }
                else {
                    // Check if meta file exists for backwards compatibility
                    fetch(metaUrl).then((res) => {
                        console.log("Getting post meta from meta.yaml");
                        if (response.ok == false) {
                            throw `Blog post meta.yaml doesn't exist: ${response.status}.`;
                        }
                        res.text().then(ParseMeta);
                    });
                }
                setContent(markdown);
            });
        }).catch(() => {
            navigate("/");
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);
    
    useEffect(() => {
        if (meta?.title) {
            window.document.title = meta.title;
        }
    }, [meta]);

    return (
        <div className={style.base}>
            <Page alignFooter="center">
                <div className={style.layout}>
                    <div
                        className={style.menuBar}
                        style={{ justifyContent: navSource == null ? 'flex-end' : 'space-between'}}
                    >
                        {
                            navSource !== null ? (
                                <button className={style.backButton}>
                                    <Link to={navSource}>
                                        <i> <FontAwesomeIcon icon={faCaretLeft} size="lg"/> </i>
                                        Back
                                    </Link>
                                </button>
                                ) : null
                        }
                        <ThemeToggle />
                    </div>
                    <PortfolioBox />
                    <Section>
                        <article>
                            { 
                                meta?.title ? <h1 id={ meta?.title.toLowerCase() } className={style.postTitle}>{meta?.title}</h1> : null
                            }
                            { 
                                meta?.date ? <span>Published: <em className={style.postDate}>{meta?.date}</em></span> : null
                            }
                            {
                                meta?.title || meta?.date ? <hr/> : null
                            }
                            {
                                content ? (
                                <Markdown
                                    components={{
                                        code(props) {
                                            return (CodeBlock(props))
                                        },
                                        a(props) {
                                            return (
                                                <SmartLink {...props}/>
                                            )
                                        }
                                    }}
                                >
                                    {content}
                                </Markdown>
                                ) : null
                            }            
                        </article>
                    </Section>
                </div>
            </Page>
        </div>
    );
}

interface IBlogPostMeta {
    title: string;
    date: string;
}