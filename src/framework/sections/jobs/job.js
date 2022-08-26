import styles from './job.module.css';

export default function JobCard(props) {

    let comments = (
        <p/>
    );

    if (props.data.comments !== undefined && props.data.comments.length !== 0) {
        comments = (
            <div>
                <ul>
                {
                    props.data.comments.map(element => <li>{element}</li>)
                }
                </ul>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            { props.data.link? <a rel="noreferrer" target="_blank" href={props.data.link} > <h3> {/* <i className="fas fa-external-link-alt fa-xs"></i> */} {props.data.name}</h3> </a> : <h3>{props.data.name}</h3>}
            <div>
                {props.data.position}
            </div>
            { comments }
            <div className={styles.period}>
                <em>{props.data.start} - {props.data.end}</em>
            </div>
        </div>
    )
}
