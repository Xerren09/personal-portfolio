import { Comments } from "../../../components/comments/comments";
import { Section } from "../../../components/section";

export function History(props: IHistoryProps) {
    return (
        <Section
            title={ props.title }
        >
            {
                props.data.map((entry, index) => 
                    <div
                    >
                        <h3>
                            <a rel="noreferrer" target="_blank" href={entry.url}>
                                {entry.name}
                            </a>
                        </h3>
                        <div>
                            {entry.title}
                            
                        </div>
                        <em>{ entry.start } - { entry.end }</em>
                        <Comments data={ entry.comments } />
                        {
                            props.data.length-1 !== index ? <hr></hr> : undefined
                        }
                    </div>    
                )
            }
        </Section>
    );
}

interface IHistoryProps {
    data: HistoryData;
    title: string;
}

export type HistoryData = Array<{
    name: string;
    url: string;
    title: string;
    start: string;
    end: string;
    comments: string;
}>