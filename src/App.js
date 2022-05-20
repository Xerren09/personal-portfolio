import { useState } from 'react';
import './App.css';
import ContentContainer from './framework/layout/mainLayout';

function App() {
    
    const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches == true ? "dark" : "light");

    const detectThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    detectThemeMediaQuery.addEventListener("change", event => {
        if (event.matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    });

    function switchTheme()
    {
        if (theme == "dark")
        {
            setTheme("light");
        }
        else if (theme == "light")
        {
            setTheme("dark");
        }
    }

    return (
        <div className="App" data-theme={theme}>
            <header className="App-header">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/regular.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/solid.min.css" />
            </header>
            <ContentContainer setTheme={switchTheme} theme={theme}/>
        </div>
    );
}

export default App;
