import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Apple } from 'lucide-react';

const FoodMenu = () => {
    const days = [
        { day: "Pazartesi", b: "Süt, Bal, Yumurta", l: "Mercimek Çorbası, Makarna", s: "Mevsim Meyvesi" },
        { day: "Salı", b: "Ihlamur, Peynir, Zeytin", l: "Sebze Yemeği, Yoğurt", s: "Ev Yapımı Kurabiye" },
        { day: "Çarşamba", b: "Meyve Çayı, Omlet", l: "Köfte, Pilav, Ayran", s: "Sütlü Tatlı" },
        { day: "Perşembe", b: "Süt, Tahin-Pekmez", l: "Taze Fasulye, Bulgur", s: "Kuruyemiş Tabağı" },
        { day: "Cuma", b: "Bitki Çayı, Krep", l: "Balık, Salata", s: "Meyveli Yoğurt" }
    ];

    return (
        <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-pink-50">
                <div className="bg-[#FF69B4] p-10 text-white text-center">
                    <h2 className="text-3xl font-black mb-2 uppercase italic">Haftalık Yemek Listesi</h2>
                    <p className="opacity-80">Tüm ürünlerimiz organik ve tazedir.</p>
                </div>
                <div className="p-4 md:p-10 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-gray-400 border-b uppercase text-xs tracking-widest">
                            <th className="pb-4 px-4">Gün</th>
                            <th className="pb-4 px-4 flex items-center gap-2"><Coffee size={14}/> Kahvaltı</th>
                            <th className="pb-4 px-4"><UtensilsCrossed size={14} className="inline mr-2"/> Öğle Yemeği</th>
                            <th className="pb-4 px-4"><Apple size={14} className="inline mr-2"/> İkindi Kahvaltısı</th>
                        </tr>
                        </thead>
                        <tbody>
                        {days.map((d, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                <td className="py-6 px-4 font-bold text-gray-800">{d.day}</td>
                                <td className="py-6 px-4 text-sm text-gray-500">{d.b}</td>
                                <td className="py-6 px-4 text-sm font-semibold text-blue-500">{d.l}</td>
                                <td className="py-6 px-4 text-sm text-gray-500">{d.s}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FoodMenu;