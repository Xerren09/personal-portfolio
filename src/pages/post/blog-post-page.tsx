import { LegacyRef, useEffect, useState } from "react";
import yaml from "js-yaml";
import { Page } from "../../components/page";
import { Section } from "../../components/section";
import Markdown from 'react-markdown'
import { useParams, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { ThemeToggle } from "../../components/themeToggle";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { PortfolioBox } from "./portfolio-box";

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
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh"
            }}
        >
            <Page>
                <div className={style.blog}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 8,
                        }}
                    >
                        <PortfolioBox />
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
                                                const { children, className, node, ref, ...rest } = props
                                                const _ref = ref as LegacyRef<SyntaxHighlighter> | undefined;
                                                const match = /language-(\w+)/.exec(className || '')
                                                return match ? (
                                                    <div
                                                        style={{
                                                            width: "95%",
                                                            overflow: "clip"
                                                        }}
                                                    >
                                                        <SyntaxHighlighter
                                                            {...rest}
                                                            ref={_ref}
                                                            customStyle={{
                                                                borderRadius: 6,
                                                            }}
                                                            CodeTag={"div"}
                                                            wrapLines
                                                            wrapLongLines
                                                            children={String(children).replace(/\n$/, '')}
                                                            language={match[1]}
                                                            style={ codeStyle }
                                                        />
                                                    </div>
                                                
                                                ) : (
                                                    <code {...rest} className={className}>
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
            </Page>
        </div>
    );
}

interface IBlogPostMeta {
    title: string;
    date: string;
}