import { useContext } from "react";
import style from "./toggle.module.css";
import { ThemeContext } from "../provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
    const theme = useContext(ThemeContext);

    return (
        <button
            id={style.ThemeToggle}
            onClick={theme?.toggle}
            title={`Switch to ${theme?.current === "dark" ? "light" : "dark"} theme`}
        >
            <i> 
                <FontAwesomeIcon icon={theme?.current === "dark" ? faMoon : faSun}/>
            </i>
        </button>
    );
}