import Comments from "@components/comments";
import Section from "@components/section";

export default function Timeline(props: ITimelineProps) {
    return props.data === undefined ? null : (
        <Section
            title={ props.title }
        >
            {
                props.data.map((entry, index) => 
                    <div key={index}>
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
                            props.data.length-1 !== index ? <hr></hr> : null
                        }
                    </div>    
                )
            }
        </Section>
    );
}

interface ITimelineProps {
    data: TimelineData;
    title: string;
}

export type TimelineData = Array<{
    name: string;
    url: string;
    title: string;
    start: string;
    end: string;
    comments: string;
}>