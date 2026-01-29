import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Baby, User, Mail, Lock, Phone, ArrowRight, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import  {Config}  from "@/helpers/Config" ;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setSubmit(true);
    };

    useEffect(() => {
        if (submit) {
            setLoading(true);
            // URL yapısı tam istediğin gibi
            fetch(`${Config.api.baseUrl}/api/v1/auth/register`, { // Config.api.baseUrl yerine test için direkt yazdım
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("fail");
                    return res.json();
                })
                .then(() => {
                    setMessage({
                        type: "success",
                        text: "Kayıt başarılı, email adresinizi doğrulayın ✨",
                    });
                    // Başarılı olursa 3 saniye sonra login'e yönlendirebilirsin
                    // setTimeout(() => navigate('/login'), 3000);
                })
                .catch(() => {
                    setMessage({
                        type: "error",
                        text: "İşlem başarısız, bilgilerinizi kontrol edin ❌",
                    });
                })
                .finally(() => {
                    setLoading(false);
                    setSubmit(false);
                });
        }
    }, [submit, form, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl shadow-pink-100/50 border border-white relative overflow-hidden"
            >
                {/* Durum Mesajları (Alerts) */}
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-bold mb-6 ${
                                message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}
                        >
                            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                        <Baby className="h-10 w-10 text-pink-500" />
                    </div>
                    <h2 className="mt-6 text-3xl font-black text-gray-800 tracking-tighter uppercase italic">
                        Ailemize <span className="text-blue-400">Katılın</span>
                    </h2>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="firstName"
                            type="text"
                            required
                            disabled={loading}
                            value={form.firstName}
                            onChange={handleChange}
                            className="block w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-200 outline-none transition-all text-sm font-semibold disabled:opacity-50"
                            placeholder="Adınız"
                        />
                        <input
                            name="lastName"
                            type="text"
                            required
                            disabled={loading}
                            value={form.lastName}
                            onChange={handleChange}
                            className="block w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-200 outline-none transition-all text-sm font-semibold disabled:opacity-50"
                            placeholder="Soyadınız"
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            name="email"
                            type="email"
                            required
                            disabled={loading}
                            value={form.email}
                            onChange={handleChange}
                            className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-200 outline-none transition-all text-sm font-semibold disabled:opacity-50"
                            placeholder="E-posta Adresiniz"
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            name="phone"
                            type="tel"
                            required
                            disabled={loading}
                            value={form.phone}
                            onChange={handleChange}
                            className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-200 outline-none transition-all text-sm font-semibold disabled:opacity-50"
                            placeholder="Telefon (Örn: 0555...)"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            name="password"
                            type="password"
                            required
                            disabled={loading}
                            value={form.password}
                            onChange={handleChange}
                            className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-200 outline-none transition-all text-sm font-semibold disabled:opacity-50"
                            placeholder="Şifreniz"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={loading}
                        type="submit"
                        className="group relative w-full flex justify-center py-5 border border-transparent text-sm font-black rounded-2xl text-white bg-[#FF69B4] hover:bg-pink-600 transition-all shadow-lg shadow-pink-100 disabled:bg-gray-300"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <span className="flex items-center gap-2 italic">
                                KAYIT OL <ArrowRight size={18} />
                            </span>
                        )}
                    </motion.button>
                </form>

                <div className="text-center pt-4">

                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;