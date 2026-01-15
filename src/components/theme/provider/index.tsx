import { createContext, useEffect, useState } from "react";

// Disabled due to fast refresh warning
// eslint-disable-next-line
export const ThemeContext = createContext<null | { current: 'dark' | 'light', update: React.Dispatch<React.SetStateAction<"light" | "dark">>, toggle: () => void}>(null);

export default function ThemeProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const toggleTheme = () => {
        const themePref = theme === "dark" ? "light" : "dark";
        setTheme(themePref);
        window.sessionStorage.setItem("__theme_pref", themePref);
    }

    useEffect(() => {
        let themePref: "dark" | "light" = window.sessionStorage.getItem("__theme_pref") as "dark" | "light";
        if (themePref === null) {
            themePref = window.matchMedia("(prefers-color-scheme: dark)").matches === true ? "dark" : "light";
        }
        // This is safe because of the empty dependency array
        //eslint-disable-next-line
        setTheme(themePref);
    }, []);

    return (
        <div data-theme={theme}>
            {/* ThemeContext for component theming via component specific styles */}
            <ThemeContext.Provider value={ { current: theme, update: setTheme, toggle: toggleTheme } }>
                {children}
            </ThemeContext.Provider>
        </div>
    )
}