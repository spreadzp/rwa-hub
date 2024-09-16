'use client';


import * as React from 'react';
import Header from '../../globals/header/Header';
import Footer from '../../globals/footer/Footer';

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <div className="">
            <Header />
            <div >
                {mounted && children}
            </div>
            <Footer />
        </div>
    );
}
