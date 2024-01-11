import Markdown from "react-markdown";
import style from "./style.module.css";

export function Comments(props: ICommentProps) {
    return (
        <div>
            {
                props.data ? (
                    <Markdown className={style.comments}>
                        {props.data}
                    </Markdown>
                ) : <div></div>
            }
        </div>
    );
}

interface ICommentProps {
    data?: string;
}