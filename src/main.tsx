import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import './global.css';
import styles from "./main.module.css";
import ThemeProvider from './components/theme/provider/index.tsx';

const Main = lazy(() => import('./components/pages/main/portfolio-page.tsx'));
const Blog = lazy(() => import('./components/pages/posts/blog-post-page.tsx'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <div className={styles.App} >
                    <Routes>
                        <Route path="/" Component={Main} index/>
                        <Route path="/posts/:postId" Component={Blog} />
                        <Route path="*" element={<Navigate to="/" />}  />
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
