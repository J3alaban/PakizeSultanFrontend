import React from 'react';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full">
            {/* GLOBAL ARKA PLAN (Sabit ve En Arkada) */}
            <div className="fixed inset-0 pointer-events-none select-none -z-50 overflow-hidden">
                <img
                    src="/background.jpg"
                    alt="Anaokulu Arka Plan"
                    className="w-full h-full object-cover opacity-[0.08]"
                />
                {/* İçeriğin okunabilirliğini artırmak için hafif bir overlay */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            </div>


            <Navigation />

            {/* SAYFA İÇERİĞİ */}
            <main className="relative z-10">
                {children}
            </main>

            {/* BİLDİRİMLER (Global) */}
            <Toaster />
        </div>
    );
};

export default Layout;