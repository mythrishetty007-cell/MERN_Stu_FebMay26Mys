// MERN_Stu_FebMay26Mys\W10\D2\my-app\src\components\P1.jsx
// useContext hook
// Context: lets you share data between components
// without passing props manually through every level
import { createContext, useContext, useState } from "react";
import { useDocumentTitle } from "./P2"
// Why to use useContext?
// 1. Helps us avoid prop drilling
// 2. Useful for shared values:
    // - theme details
    // - logged-in user details
    // - language settings
    // - app settings

// Basic Steps:
// 1 Create a context
// 2 Wrap components with Provider
// 3 Read value using useContext()

// 1 Create a context
const ThemeContext = createContext();

// Child Component 1
function Header(){
    const theme = useContext(ThemeContext);
    return(
        <header style={{
            padding:'20px',
            marginTop: '20px',
            background: theme === 'dark'? '#222' : '#eee',
            color: theme === 'dark'? '#fff' : '#000',
        }}>
            <h3>Header Component</h3>
            <p>Current theme from context: {theme}</p>
        </header>
    );
}
// Child component 2
function Content(){
    const theme = useContext(ThemeContext);
    return(
        <div style={{
            padding :'20px',
            marginTop:'20px',
            background: theme === 'dark'? '#333' : '#f9f9f9',
            color: theme === 'dark'? '#fff' : '#000',
        }}>
            <p>This component also uses the same context value</p>
        </div>
    );
}
function Layout(){
    return(
        <div>
            <Header />
            <Content />
        </div>
    );
}

export function UseContextIntro(){
    // Shared state
    const [theme,setTheme] = useState('light');
    useDocumentTitle('UseContext example');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        
    };

    return(
        <section>
            <h2> useContext Example via theme</h2>
            <p>
                Example to show the usage of context sharing
            </p>
            <button onClick={toggleTheme}>
                Toggle Theme
            </button>
            <ThemeContext.Provider value={theme}>
                <Layout />
            </ThemeContext.Provider>
        </section>
    );
}