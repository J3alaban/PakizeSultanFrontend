import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Tag,
  AlertCircle, CheckCircle2, X, Loader2
} from "lucide-react";
import { Config } from "../helpers/Config";
import { useAppSelector } from "../redux/hooks";

const CategoryManagement = () => {
  const { role, isLoggedIn } = useAppSelector((state) => state.authReducer);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Mesajı dinamik yaptık
  const [form, setForm] = useState({ slug: "", name: "" });
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${Config.api.baseUrl}/api/v1/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Yardımcı fonksiyon: Başarı mesajını göster ve kapat
  const triggerSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setIsModalOpen(true); // Başarı mesajını göstermek için modalı açıyoruz
    setTimeout(() => {
      setShowSuccess(false);
      closeModal();
    }, 1500);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${Config.api.baseUrl}/api/v1/categories`, {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), slug: form.slug.trim() }),
      });

      if (res.ok) {
        await fetchCategories();
        triggerSuccess("Kategori Oluşturuldu!");
      } else {
        alert("Hata: Sunucu isteği reddetti.");
      }
    } catch (error) {
      alert("Sunucuya erişilemedi.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${Config.api.baseUrl}/api/v1/categories/${form.id}`, {
        method: "PUT",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, slug: form.slug }),
      });

      if (res.ok) {
        await fetchCategories();
        triggerSuccess("Bilgiler Güncellendi!");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`${Config.api.baseUrl}/api/v1/categories/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        await fetchCategories();
        triggerSuccess("Kategori Silindi!"); // Silme sonrası mesaj
      } else if (res.status === 400 || res.status === 409) {
        // Backend genellikle bağlı kayıt varsa 400 veya 409 döner
        alert("Bu kategori silinemez! İçerisinde tanımlı ürünler veya alt başlıklar bulunuyor.");
      } else {
        alert("Bu kategori silinemez çünkü bu kategoriye bağlı hizmetler var.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Sunucu bağlantı hatası.");
    }
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("Kategori adı boş olamaz.");
    isEditing ? handleUpdate() : handleCreate();
  };

  const openModal = (cat) => {
    if (cat) {
      setForm({ ...cat });
      setIsEditing(true);
    } else {
      setForm({ slug: "", name: "" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setShowSuccess(false);
    setForm({ slug: "", name: "" });
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-pink-100/40 border border-pink-50 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-8 border-b border-pink-50 bg-gradient-to-br from-pink-50/40 to-white flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-pink-100/50 rounded-2xl text-[#FF69B4] shadow-inner">
            <Tag size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Kategori Yönetimi</h2>
            <p className="text-sm font-semibold text-pink-400">Okul içeriklerini düzenleyin.</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => openModal()}
          className="flex items-center gap-2 px-7 py-3.5 bg-[#FF69B4] text-white text-sm font-black rounded-full shadow-lg shadow-pink-200"
        >
          <Plus size={20} /> Yeni Kategori
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[550px] overflow-y-auto">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-slate-300">
            <AlertCircle size={48} strokeWidth={1} className="mb-3" />
            <p className="font-medium">Henüz bir kategori bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {categories.map((cat) => (
              <motion.div
                layout
                key={cat.id}
                className="flex justify-between items-center p-5 rounded-3xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-pink-200 hover:shadow-xl hover:shadow-pink-50/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF69B4] font-black text-lg border border-pink-50">
                    {cat.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 group-hover:text-[#FF69B4] transition-colors">{cat.name}</div>
                    <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-lg mt-1 inline-block">
                      {cat.slug}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(cat)} className="p-3 hover:bg-blue-50 text-blue-400 rounded-2xl transition-all"><Pencil size={20} /></button>
                  <button onClick={() => handleDelete(cat.id)} className="p-3 hover:bg-rose-50 text-rose-400 rounded-2xl transition-all"><Trash2 size={20} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl border border-white"
            >
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-[#FF69B4]"
                >
                  <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-xl font-black">{successMessage}</h4>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-gray-800">{isEditing ? "Bilgileri Güncelle" : "Yeni Kategori"}</h3>
                    <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-400" /></button>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">Kategori Adı</label>
                      <input
                        className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-[#FF69B4] focus:bg-white rounded-[1.5rem] outline-none font-bold text-gray-700 transition-all shadow-inner"
                        placeholder="Örn: 3-4 Yaş Grubu"
                        value={form.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setForm({ ...form, name: val, slug: val.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-") });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">Sistem Kodu (Slug)</label>
                      <div className="p-5 bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 rounded-[1.5rem] font-mono text-sm tracking-tighter">
                        {form.slug || "otomatik-oluşturulur"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-10">
                    <button onClick={closeModal} className="flex-1 py-4 font-black text-gray-400 hover:text-gray-600 transition-colors">Vazgeç</button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-[#FF69B4] text-white py-4 rounded-2xl font-black shadow-lg shadow-pink-200 flex items-center justify-center gap-2 hover:bg-[#ff51a4] active:scale-95 transition-all"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={18} /> {isEditing ? "Güncelle" : "Oluştur"}</>}
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

export default CategoryManagement;