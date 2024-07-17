import { defineConfig } from "vite";
import { univerPlugin } from "@univerjs/vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [univerPlugin(), react()],
    build: {
        outDir: "univer/dist",
        lib: {
            entry: path.resolve(__dirname, "univer/src/App.tsx"),
            name: "UniverLib",
            fileName: `univer`,
            formats: ["es"]
        },
        rollupOptions: {
            external: ["react", "react-dom"]
        }
    }
});
