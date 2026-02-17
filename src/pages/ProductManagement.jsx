import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Heart,
  CheckCircle2, X,
  Loader2, BookOpen, Stars, Image as ImageIcon, Trash
} from "lucide-react";
import { Config } from "../helpers/Config";
import { useAppDispatch } from "../redux/hooks";
import { updateLoading } from "../redux/features/homeSlice";

const ProductManagement = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const emptyForm = {
    title: "",
    description: "",
    categorySlug: "",
    brand: "",
    images: [],
  };

  const [form, setForm] = useState(emptyForm);

  // --- VERİ ÇEKME ---
  const fetchData = useCallback(async () => {
    dispatch(updateLoading(true));
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch(`${Config.api.baseUrl}/api/v1/categories`),
        fetch(`${Config.api.baseUrl}/api/v1/products`)
      ]);

      const catData = await catRes.json();
      const prodData = await prodRes.json();

      setCategories(catData);
      setServices(prodData.content || []);
    } catch (err) {
      console.error("Hizmetler yüklenirken hata oluştu:", err);
    } finally {
      dispatch(updateLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- GÖRSEL İŞLEMLERİ ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const limit = 5 - (form.images?.length || 0);

    files.slice(0, limit).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          images: [...(prev.images || []), reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // --- KAYDETME / GÜNCELLEME ---
  const handleSave = async () => {
    setLoading(true);
    const url = isEditing
      ? `${Config.api.baseUrl}/api/v1/products/${form.id}`
      : `${Config.api.baseUrl}/api/v1/products`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...form,
            price: 0,
            stock: 0
        }),
      });

      if (res.ok) {
        await fetchData();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsModalOpen(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`${Config.api.baseUrl}/api/v1/products/${id}`, {
        method: "DELETE",
        mode: 'cors'
      });
      if (res.ok) setServices(services.filter(s => s.id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const openModal = (service) => {
    if (service) {
      setForm({ ...service, images: service.images || [] });
      setIsEditing(true);
    } else {
      setForm(emptyForm);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] p-4 md:p-8 font-sans text-left">
      <div className="max-w-7xl mx-auto">

        {/* Başlık Kartı */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/30 border border-pink-50 p-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-5">
            <div className="p-4 bg-pink-100 rounded-[1.8rem] text-[#FF69B4] shadow-sm">
              <Stars size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-800 tracking-tight">Hizmet Yönetimi</h1>
              <p className="text-sm font-bold text-pink-400 uppercase tracking-widest">Eğitim ve Etkinlik Programları</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="w-full md:w-auto px-10 py-4 bg-[#FF69B4] text-white font-black rounded-full shadow-lg shadow-pink-200 flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Yeni Hizmet Tanımla
          </motion.button>
        </motion.div>

        {/* Hizmet Listesi Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {services.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={service.id}
                className="bg-white rounded-[2.2rem] p-7 border border-slate-100 hover:border-pink-200 shadow-sm hover:shadow-2xl hover:shadow-pink-100/50 transition-all group relative overflow-hidden flex flex-col"
              >
                {/* Kart Görseli (Eğer Varsa) */}
                {service.images?.length > 0 && (
                  <div className="h-40 -mx-7 -mt-7 mb-5 overflow-hidden relative">
                    <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                  </div>
                )}

                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-400">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex gap-2 relative z-10">
                    <button onClick={() => openModal(service)} className="p-2.5 bg-white border border-slate-100 hover:bg-blue-50 text-blue-400 rounded-xl transition-all shadow-sm"><Pencil size={18} /></button>
                    <button onClick={() => deleteService(service.id)} className="p-2.5 bg-white border border-slate-100 hover:bg-rose-50 text-rose-400 rounded-xl transition-all shadow-sm"><Trash2 size={18} /></button>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-[#FF69B4] transition-colors leading-tight">
                    {service.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 mb-6 font-medium leading-relaxed flex-grow">
                    {service.description || "Bu hizmet için henüz bir açıklama girilmemiş."}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <Heart size={16} className="text-pink-300" fill="#fed7e2" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                            {service.categorySlug || 'Genel Hizmet'}
                        </span>
                    </div>
                    {service.brand && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-500 px-3 py-1 rounded-full uppercase">
                            {service.brand}
                        </span>
                    )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl p-6 md:p-10 rounded-[3rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
            >
              {showSuccess ? (
                <div className="py-20 flex flex-col items-center text-[#FF69B4]">
                  <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={64} className="animate-bounce" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">İşlem Başarılı!</h2>
                  <p className="font-bold text-pink-300 mt-2">Hizmet listesi güncellendi.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-800">
                        {isEditing ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
                        </h2>
                        <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest text-left">Hizmet Detay Formu</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={28} className="text-slate-400" /></button>
                  </div>

                  <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Görsel Yükleme Alanı */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-3 block tracking-widest">Program Görselleri ({form.images?.length || 0} / 5)</label>
                        <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-[1.8rem] border-2 border-dashed border-slate-200">
                            {form.images?.map((img, index) => (
                                <div key={index} className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md group">
                                    <img src={img} className="w-full h-full object-cover" alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            ))}
                            {(!form.images || form.images.length < 5) && (
                                <label className="w-20 h-20 bg-white border-2 border-dashed border-pink-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all group">
                                    <Plus size={20} className="text-pink-300 group-hover:scale-125 transition-transform" />
                                    <span className="text-[8px] font-black text-pink-300 mt-1">EKLE</span>
                                    <input
                                        type="file" multiple accept="image/*" className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-3 mb-2 block tracking-widest">Hizmet Adı</label>
                      <input
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#FF69B4] focus:bg-white rounded-[1.2rem] outline-none font-bold text-gray-700 transition-all"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        placeholder="Örn: Drama ve Tiyatro Eğitimi"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-3 mb-2 block tracking-widest">Hizmet Türü</label>
                            <select
                                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white rounded-[1.2rem] outline-none font-bold transition-all appearance-none cursor-pointer"
                                value={form.categorySlug}
                                onChange={e => setForm({ ...form, categorySlug: e.target.value })}
                            >
                                <option value="">Kategori Seçiniz</option>
                                {categories.map(c => (
                                <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-3 mb-2 block tracking-widest">Hedef Yaş/Grup</label>
                            <input
                                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-400 focus:bg-white rounded-[1.2rem] outline-none font-bold transition-all"
                                value={form.brand}
                                onChange={e => setForm({ ...form, brand: e.target.value })}
                                placeholder="Örn: 4-5 Yaş Grubu"
                            />
                        </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-3 mb-2 block tracking-widest">Hizmet Detayları</label>
                      <textarea
                        rows={3}
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#FF69B4] focus:bg-white rounded-[1.5rem] outline-none font-medium text-gray-600 transition-all resize-none"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Eğitim içeriği hakkında bilgi verin..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-4 border-t border-slate-50">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Vazgeç
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-[2] bg-[#FF69B4] text-white py-4 rounded-[1.5rem] font-black shadow-lg shadow-pink-100 flex items-center justify-center gap-2 hover:bg-[#ff51a4] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={22} /> Kaydet</>}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;