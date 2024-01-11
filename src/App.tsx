import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import PortfolioPage from './pages/main/portfolio-page';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { BlogPostPage } from './pages/post/blog-post-page';
  
export const ThemeContext = createContext<null | { current: 'dark' | 'light', update: React.Dispatch<React.SetStateAction<"light" | "dark">>, toggle: () => void}>(null);

const router = createBrowserRouter([
    {
        path: "/",
        Component: PortfolioPage,
        index: true
    },
    {
        path: "posts/:postId",
        Component: BlogPostPage,
    },
]);

function App() {

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
        setTheme(themePref);
    }, []);

    return (
        <div className="App" data-theme={theme}>
            <header>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css" integrity="sha512-8RxmFOVaKQe/xtg6lbscU9DU0IRhURWEuiI0tXevv+lXbAHfkpamD4VKFQRto9WgfOJDwOZ74c/s9Yesv3VvIQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </header>
            {/* ThemeContext for component theming via component specific styles */}
            <ThemeContext.Provider
                value={ { current: theme, update: setTheme, toggle: toggleTheme } }
            >
                <RouterProvider router={router} />
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
