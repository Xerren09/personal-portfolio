import { Comments } from "../../../components/comments/comments";
import { Section } from "../../../components/section";

export function Introduction(props: IIntroductionProps) {
    return props.data === undefined ? null : (
        <Section
            title="Introduction"
        >
            <div>
                <Comments data={ props.data } />
            </div>
        </Section>
    );
}

interface IIntroductionProps {
    data: IntroductionData
}

export type IntroductionData = string;