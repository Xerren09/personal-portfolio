import Section from "@components/section";

export default function Skills(props: ISkillsProps) {
    return props.data === undefined ? null : (
        <Section
            title={ props.title }
        >
            {
                props.data.map((category) =>
                    <div key={category.name}>
                        <h4>{ category.name }: </h4>
                        <p>{ category.items.join(", ") }.</p>
                    </div>
                )
            }
        </Section>
    );
}

interface ISkillsProps {
    title: string,
    data: SkillsData
}

export type SkillsData = Array<{
    name: string;
    items: string[];
}>