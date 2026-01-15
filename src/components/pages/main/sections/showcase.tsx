import { type ReactNode } from "react";
import Section from "@components/section";

export default function Showcase(props: IShowcaseProps) {
    return  props.data === undefined ? null : (
        <Section
            title={ props.title }
        >
            {
                props.data.map((item, index) => {
                    const transformer = props.transformers.find(transformer => transformer.type === item.type);
                    if (transformer) {
                        return (
                            <div key={index}>
                                {transformer.getComponent(item)}
                                {index !== props.data.length - 1 ? <hr></hr> : null}
                            </div>
                        );
                    }
                    else {
                        return null;
                    }
                })
            }
        </Section>  
    );
}

interface IShowcaseProps {
    title: string,
    data: ShowcaseData;
    transformers: Array<ShowcaseProjectTransformer>;
}

export type ShowcaseData = Array<ShowcaseItem>;

export type ShowcaseItem = {
    type: string;
    url: string;
    comments: string;
};

export interface ShowcaseProjectTransformer {
    get type(): string;
    getComponent(item: ShowcaseItem): ReactNode;
}