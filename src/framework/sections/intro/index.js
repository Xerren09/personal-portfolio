import prettyFormatStringNode from '../../prettyFormatString.js';
import styles from './intro.module.css';
import topicStyles from '../../layout/topic.module.css';

export default function IntroSection(props) {
    //

    if (props.data === undefined || props.data.length === 0) {
        return "";
    }
    else {
        return (
            <div className={topicStyles.topic}>
                <h2 className={topicStyles.topicTitle}>Introduction</h2>
                <div className={topicStyles.cardContainer}>
                {
                    props.data.map(element => <p className={styles.introLines}>{prettyFormatStringNode(element)}</p>)
                }
                </div>
            </div>
        );
    }
}