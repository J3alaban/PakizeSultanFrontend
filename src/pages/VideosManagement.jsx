import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Video, Trash2, X, UploadCloud, Film } from "lucide-react";
import { Config } from "@/helpers/Config";

const VideosManagement = () => {
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoFile: null,
    });

    const fetchVideos = async () => {
        try {
            const res = await fetch(`${Config.api.baseUrl}/api/v1/videos`);
            const data = await res.json();
            setVideos(data);
        } catch (err) {
            console.error("Video getirme hatası:", err);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        if (formData.videoFile) {
            data.append("file", formData.videoFile);
        }

        try {
            const res = await fetch(`${Config.api.baseUrl}/api/v1/videos`, {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ title: "", description: "", videoFile: null });
                fetchVideos();
                alert("Video başarıyla eklendi!");
            }
        } catch (err) {
            console.error("Yükleme hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteVideo = async (id) => {
        if (!window.confirm("Bu videoyu silmek istediğinize emin misiniz?")) return;
        try {
            await fetch(`${Config.api.baseUrl}/api/v1/videos/${id}`, { method: "DELETE" });
            fetchVideos();
        } catch (err) {
            console.error("Silme hatası:", err);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-xl text-pink-600">
                        <Video size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Video Yönetimi</h2>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-all shadow-lg shadow-pink-200"
                >
                    <Plus size={18} /> Ekle
                </button>
            </div>

            {/* Video Listesi */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {videos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center overflow-hidden">
                                <Film className="text-slate-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-700">{video.title}</h4>
                                <p className="text-xs text-slate-400 truncate w-40">{video.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteVideo(video.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-800">Yeni Video Ekle</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Video Başlığı</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                        placeholder="Örn: Drone ile Bahçe Çekimi"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Açıklama</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                        placeholder="Kısa bir açıklama yazın..."
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>

                                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-pink-400 transition-colors">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => setFormData({...formData, videoFile: e.target.files[0]})}
                                    />
                                    <UploadCloud className="mx-auto text-pink-500 mb-2" size={32} />
                                    <p className="text-sm font-medium text-slate-600">
                                        {formData.videoFile ? formData.videoFile.name : "Video dosyasını sürükleyin veya seçin"}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">MP4, MOV (Maks. 50MB)</p>
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-pink-500 text-white font-bold py-4 rounded-xl hover:bg-pink-600 transition-all shadow-lg shadow-pink-200 disabled:bg-slate-300"
                                >
                                    {loading ? "Yükleniyor..." : "Videoyu Yayınla"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideosManagement;