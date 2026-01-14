import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import powershell from 'react-syntax-highlighter/dist/esm/languages/hljs/powershell';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('powershell', powershell);

import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import style from "./codeblock.module.css";

export default function CodeBlock(props: React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>) {
    const { children, className } = props;
    //language-(\w+)
    const match = /(?<=language-)(.*)/.exec(className || '');
    return match ? (
        <div className={style.codeWrapper}>
            <SyntaxHighlighter
                PreTag={"div"}
                CodeTag={"div"}
                language={match[1]}
                style={vs2015}
            >
                {children as string}
            </SyntaxHighlighter>  
        </div>
    ) : (
        <code {...props}/>
    )
}