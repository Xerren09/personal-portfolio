import topicStyles from '../../layout/topic.module.css';
import SkillsCard from './skills.js';

export default function SkillsSection(props) {
    //

    if (props.data === undefined || props.data.length === 0) {
        return "";
    }
    else {
        return (
            <div className={topicStyles.topic}>
                <h2 className={topicStyles.topicTitle}>Skills</h2>
                <div className={topicStyles.cardContainer}>
                {
                    props.data.map(element => <SkillsCard data={element}/>)
                }
                </div>
            </div>
        );
    }
}