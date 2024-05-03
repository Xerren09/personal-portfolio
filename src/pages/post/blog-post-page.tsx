import { LegacyRef, useEffect, useState } from "react";
import yaml from "js-yaml";
import { Section } from "../../components/section";
import Markdown from 'react-markdown'
import { useParams, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { ThemeToggle } from "../../components/themeToggle";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { PortfolioBox } from "./portfolio-box";
import { AppCredit } from "../../components/page/credit";

export function BlogPostPage() {

    const { postId } = useParams();
    
    const navigate = useNavigate();

    const [meta, setMeta] = useState<null | IBlogPostMeta>(null);
    const [content, setContent] = useState<null | string>(null);

    useEffect(() => {
        // Load content markdown
        const baseUrl = `${window.location.origin}/data/blog/${postId}`;
        const metaUrl = `/meta.yaml`;
        const postUrl = `/post.md`;
        fetch(`${baseUrl}${metaUrl}`).then((response) => {
            response.text().then((postMetaRaw) => {
                const postMeta: IBlogPostMeta = yaml.load(postMetaRaw) as IBlogPostMeta;
                setMeta({
                    title: postMeta.title,
                    date: postMeta.date,
                });
                window.document.title = `📃 ${postMeta.title} | Bars Margetsch`;
                fetch(`${baseUrl}${postUrl}`).then((res) => {
                    res.text().then(markdown => {
                        setContent(markdown);
                    });
                });
            });
        }).catch(() => {
            navigate("/");
        });
    }, [ postId, navigate ]);

    return (
        <div
            id="blog-page-root"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100vw",
                minHeight: "100vh",
                marginTop: 28,
                marginBottom: 28,
                gap: 18,
                justifyContent: "stretch",
                alignContent: "stretch",
                alignItems: "center"
            }}
        >
            <div className={style.blog}>
                <PortfolioBox />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        gap: 8,
                    }}
                >
                    <ThemeToggle />
                </div>
                {
                    meta ? (
                        <Section>
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <h1 style={{
                                    marginTop: 0,
                                    lineHeight: "120%",
                                }}>
                                    {meta?.title}
                                </h1>
                                <em style={{
                                    paddingBottom: 18
                                }}>{meta?.date}</em>
                                <Markdown
                                    className={style.blogContent}
                                    components={{
                                        code(props) {
                                            const { children, className, ...rest } = props;
                                            const match = /language-(\w+)/.exec(className || '');
                                            return match ? (
                                                
                                                <SyntaxHighlighter    
                                                    wrapLines={true}
                                                    wrapLongLines
                                                    customStyle={{
                                                        display: "flex",
                                                        overflowX: "scroll",
                                                        //wordBreak: "break-all"
                                                    }}
                                                    //showLineNumbers 
                                                    lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                                                    PreTag={"div"}
                                                    CodeTag={"div"}
                                                    children={children as string}
                                                    language={match[1]}
                                                    style={codeStyle}
                                                    
                                                />  
                                                
                                            ) : (
                                                <code {...props} className={className}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                
                                    {content}
                                </Markdown>
                            </div>
                        </Section>
                    ) : undefined
                }
                
            </div>
            {
                // Credit footer for the whole app
            }
            <AppCredit/>
        </div>
    );
}

interface IBlogPostMeta {
    title: string;
    date: string;
}