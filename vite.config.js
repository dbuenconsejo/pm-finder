import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: '10.0.0.130',
            clientPort: 5174,
        },
        origin: 'http://10.0.0.130:5174',
        cors: {
            origin: 'http://10.0.0.130:8888',
            credentials: true,
        },
    },
});
