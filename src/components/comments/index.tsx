import Markdown from "react-markdown";
import style from "./comments.module.css";
import SmartLink from "../smartlink";

export default function Comments(props: ICommentProps) {
    return (
        <div className={style.comments}>
            {
                props.data ? (
                    <Markdown
                        components={{
                            a(props) {
                                return (
                                    <SmartLink {...props}/>
                                )
                            }
                        }}
                    >
                        {props.data}
                    </Markdown>
                ) : null
            }
        </div>
    );
}

interface ICommentProps {
    data?: string;
}