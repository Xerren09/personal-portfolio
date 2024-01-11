import React from "react";
import { Section } from "../../../components/section";

export function Skills(props: ISkillsProps) {
    return (
        <Section
            title="Skills"
        >
            {
                props.data.map((category, index) =>
                    <div >
                        <h4>{ category.name }: </h4>
                        <p>{ category.items.join(", ") }.</p>
                    </div>
                )
            }
        </Section>
    );
}

interface ISkillsProps {
    data: SkillsData
}

export type SkillsData = Array<{
    name: string;
    items: string[];
}>