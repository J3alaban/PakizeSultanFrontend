import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Mail, Lock, Loader2, AlertCircle, ArrowRight, Baby, CheckCircle2 } from 'lucide-react';
import { Config } from "../helpers/Config";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSubmit(true);
    };

    useEffect(() => {
        if (!submit) return;

        setLoading(true);
        fetch(`${Config.api.baseUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })


            .then(res => {
                if (!res.ok) throw new Error("Giriş bilgileri hatalı.");
                return res.json();
            })
            .then(data => {
                const userData = {
                    role : data.role
                    };
                localStorage.setItem("user", JSON.stringify(userData));
                setIsSuccess(true);
                setTimeout(() => {
                    onLoginSuccess(userData);
                    onClose();
                    setIsSuccess(false);
                    setForm({ email: '', password: '' });
                }, 1200);
            })
            .catch(err => setError(err.message))
            .finally(() => {
                setLoading(false);
                setSubmit(false);
            });
    }, [submit]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    onClick={e => e.stopPropagation()}
                    initial={{ scale: 0.95, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 30 }}
                    className="w-full max-w-md max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex-1 overflow-y-auto p-8">
                        {isSuccess ? (
                            <div className="text-center py-12">
                                <CheckCircle2 className="mx-auto text-green-500" size={48} />
                                <h2 className="mt-4 font-black">Giriş Başarılı</h2>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-8">
                                    <Baby className="mx-auto text-blue-500" size={32} />
                                    <h2 className="font-black mt-3">Giriş Yap</h2>
                                </div>

                                {error && (
                                    <div className="mb-4 text-red-600 text-sm flex gap-2">
                                        <AlertCircle size={16} /> {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl bg-gray-50"
                                        placeholder="E-posta"
                                    />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl bg-gray-50"
                                        placeholder="Şifre"
                                    />

                                    <button
                                        disabled={loading}
                                        className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold"
                                    >
                                        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Giriş Yap"}
                                    </button>
                                </form>

                                <p className="mt-6 text-center text-sm">
                                    Hesabın yok mu?{" "}
                                    <Link to="/kaydol" onClick={onClose} className="text-pink-500">
                                        Kaydol
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default LoginModal;
