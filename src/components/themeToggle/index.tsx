import { useContext } from "react";
import { ThemeContext } from "../../App";

export function ThemeToggle() {
    const theme = useContext(ThemeContext);

    return (
        <button
            style={{
                borderRadius: 10,
                boxShadow: "var(--shadow)",
                backgroundColor: "var(--panel-background)",
                border: "none",
                padding: 8,
                fontSize: "13pt",
                width: 45,
                height: 45
            }}
            onClick={theme?.toggle}
            title={`Switch to ${theme?.current === "dark" ? "light" : "dark"} mode`}
        >
            {
                theme?.current === "dark" ? <i style={{color: "var(--text-primary)"}} className="fas fa-sun"></i> : <i style={{color: "var(--text-primary)"}} className="fas fa-moon"></i>
            }
        </button>
    );
}