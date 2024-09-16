'use client';


import * as React from 'react';
import Header from '../../globals/header/Header';
import Footer from '../../globals/footer/Footer';
import StarryBackground from './StarryBackground';

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <div className="">
            <StarryBackground />
            <Header />
            <div >
                {mounted && children}
            </div>
            <Footer />
        </div>
    );
}
