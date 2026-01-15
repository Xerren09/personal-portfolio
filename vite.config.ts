import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// @ts-expect-error This is a JS module
import InjectMetadataPlugin from "./injectMetaTags";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/components/pages"),
            "@sections": path.resolve(__dirname, "./src/components/pages/main/sections"),
        },
    },
    plugins: [
        InjectMetadataPlugin(),
        react(),
    ],
})
