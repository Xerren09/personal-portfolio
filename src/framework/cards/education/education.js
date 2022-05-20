import styles from './education.module.css';

export default function EducationCard(props) {
    return (
        <div className={styles.container}>
            <a rel="noreferrer" target="_blank" href={props.data.link}><h3>{props.data.name}</h3></a>
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
                <em>{props.data.start} - {props.data.end}</em>
            </div>
        </div>
    )
}
