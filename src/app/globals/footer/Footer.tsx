'use client';
import { SocialNetworks } from "../../components/common/SocialNetworks";
import StarryBackground from "../../components/common/StarryBackground";

export default function Footer() {
    return (
        <>
            <footer className="text-black text-center p-4">
                <SocialNetworks />
            </footer>
        </>
    );
}
