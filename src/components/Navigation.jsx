import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Baby, Phone, ChevronDown, Info, BookOpen, Utensils, LogIn, User, LogOut } from 'lucide-react';
import LoginModal from "../pages/LoginModal";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCorporateOpen, setIsCorporateOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const location = useLocation();

    // Sayfa yenilendiğinde kullanıcıyı hatırla
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsMenuOpen(false);
    };

    const corporateLinks = [
        { path: '/hakkimizda', label: 'Hakkımızda', icon: Info },
        { path: '/programlar', label: 'Eğitim Programları', icon: BookOpen },
        { path: '/yemek-listesi', label: 'Yemek Listemiz', icon: Utensils },
    ];

    const isActivePath = (path) => location.pathname === path;

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo & Yazı Butonu */}
                    <Link to="/" className="flex items-center space-x-4 group transition-all duration-300">
                        {/* Logo Alanı */}
                        <motion.div
                            whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
                            className="relative"
                        >
                            <img
                                src="/mainLogo.png"
                                alt="Pakize Sultan Logo"
                                className="h-14 w-14 md:h-16 md:w-16 object-contain drop-shadow-sm"
                            />
                            {/* Logo altına hafif bir parıltı (Opsiyonel) */}
                            <div className="absolute inset-0 bg-pink-400/10 blur-xl rounded-full -z-10 group-hover:bg-pink-400/20 transition-colors"></div>
                        </motion.div>

                        {/* Metin Alanı */}
                        <div className="flex flex-col justify-center">
        <span className="text-2xl md:text-3xl font-black tracking-tight text-gray-800 leading-none group-hover:text-[#FF69B4] transition-colors">
            Pakize <span className="text-[#FF69B4] group-hover:text-gray-800">Sultan</span>
        </span>
                            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.25em] mt-1">
            Anaokulu
        </span>
                        </div>
                    </Link>




                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/" className="relative px-6 py-2">
                            {isActivePath('/') && <motion.div layoutId="navBubble" className="absolute inset-0 bg-pink-50 rounded-full -z-10" />}
                            <span className={`text-sm font-bold ${isActivePath('/') ? 'text-[#FF69B4]' : 'text-gray-500'}`}>Ana Sayfa</span>
                        </Link>

                        <div className="relative group px-6 py-2" onMouseEnter={() => setIsCorporateOpen(true)} onMouseLeave={() => setIsCorporateOpen(false)}>
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-500 group-hover:text-[#FF69B4] cursor-pointer">
                                Kurumsal <ChevronDown size={14} className={isCorporateOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                            </div>
                            <AnimatePresence>
                                {isCorporateOpen && (
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute top-full left-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-pink-50 py-3">
                                        {corporateLinks.map((link) => (
                                            <Link key={link.path} to={link.path} className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-pink-50 hover:text-[#FF69B4]">
                                                <link.icon size={16} /> {link.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/iletisim" className="px-6 py-2">
                            <span className={`text-sm font-bold ${isActivePath('/iletisim') ? 'text-[#FF69B4]' : 'text-gray-500'}`}>İletişim</span>
                        </Link>

                        {/* Giriş Durumuna Göre Değişen Kısım */}
                        {user ? (
                            <div className="flex items-center gap-3 ml-4 bg-blue-50 p-1.5 rounded-full border border-blue-100">
                                <div className="flex items-center gap-2 px-4 py-1.5 text-blue-600 font-bold text-sm uppercase tracking-tighter">
                                    <User size={16} /> {user.name}
                                </div>
                                <button onClick={handleLogout} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-sm transition-colors">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsLoginModalOpen(true)}
                                className="ml-4 bg-[#FF69B4] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md flex items-center gap-2"
                            >
                                <LogIn size={16} /> Giriş Yap
                            </motion.button>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-white overflow-hidden border-t border-gray-50">
                        <div className="p-4 space-y-2">
                            {user && (
                                <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-3 mb-4">
                                    <User className="text-blue-500" />
                                    <span className="font-bold text-blue-700">{user.name}</span>
                                </div>
                            )}
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-4 px-6 text-gray-600">Ana Sayfa</Link>
                            <Link to="/iletisim" onClick={() => setIsMenuOpen(false)} className="block py-4 px-6 text-gray-600">İletişim</Link>

                            {user ? (
                                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold bg-red-50 rounded-2xl italic uppercase">
                                    <LogOut size={20} /> Çıkış Yap
                                </button>
                            ) : (
                                <button onClick={() => { setIsMenuOpen(false); setIsLoginModalOpen(true); }} className="w-full py-4 bg-pink-50 text-[#FF69B4] font-bold rounded-2xl italic uppercase">
                                    Giriş Yap
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={(userData) => setUser(userData)}
            />
        </nav>
    );
};

export default Navigation;