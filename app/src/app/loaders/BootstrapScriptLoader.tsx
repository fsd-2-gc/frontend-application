'use client';
import { useEffect } from 'react';

export default function BootstrapScriptLoader() {
    useEffect(() => {
        // Dynamically import so it only runs in the browser
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
            .catch((err) => {
                console.error('Failed to load Bootstrap JS', err);
            });
    }, []);

    return null;
}
