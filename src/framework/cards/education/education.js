import styles from './education.module.css';

export default function EducationCard(props) {
    return (
        <div className={styles.container}>
            <h3>{props.data.name}</h3>
            <div>
                {props.data.degree}
            </div>
            <div>
                <ul>
                    {
                        props.data.comments.map(element => <li>{element}</li>)
                    }
                </ul>
            </div>
            <div className={styles.period}>
                {props.data.start} - {props.data.end}
            </div>
        </div>
    )
}
