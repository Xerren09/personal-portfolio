import { ReactNode } from "react";
import { Section } from "../../../components/section";

export function ShowCase(props: IShowCaseProps) {
    return  props.data === undefined ? null : (
        <Section
            title={ props.title }
        >
            {
                props.data.map((item, index) => {
                    const transformer = props.transformers.find(transformer => transformer.type === item.type);
                    if (transformer) {
                        return (
                            <div>
                                {transformer.getComponent(item)}
                                {index !== props.data.length - 1 ? <hr></hr> : undefined}
                            </div>
                        );
                    }
                    else {
                        return undefined;
                    }
                })
            }
        </Section>  
    );
}

interface IShowCaseProps {
    title: string,
    data: ShowCaseData;
    transformers: Array<ShowCaseProjectTransformer>;
}

export type ShowCaseData = Array<ShowCaseItem>;

export type ShowCaseItem = {
    type: string;
    url: string;
    comments: string;
};

export interface ShowCaseProjectTransformer {
    get type(): string;
    getComponent(item: ShowCaseItem): ReactNode;
}