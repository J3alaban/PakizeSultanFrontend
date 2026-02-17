import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { MapPin, Wind, ZoomIn, ArrowLeft, Play, X, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Config } from "@/helpers/Config";

const VirtualTour = () => {
  const [droneClips, setDroneClips] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Tıklanan videoyu tutar

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${Config.api.baseUrl}/api/v1/videos`);
        const data = await res.json();
        setDroneClips(data);
      } catch (err) {
        console.error("Video fetch error:", err);
      }
    };
    fetchVideos();
  }, []);

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
      <div className="min-h-screen bg-slate-50">
        {/* --- HEADER --- */}
        <div className="relative h-[60vh] w-full overflow-hidden bg-black">
          <video
              src={`${Config.api.baseUrl}/api/v1/videos/1`}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <Link to="/" className="absolute left-8 top-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft size={20} /> Ana Sayfa
            </Link>
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-pink-500/20 px-4 py-1 text-sm font-bold border border-pink-500/30">
              360° Sanal Deneyim
            </span>
              <h1 className="mb-6 text-5xl font-black md:text-7xl tracking-tight">Gökyüzünden Keşfedin</h1>
              <p className="text-lg opacity-90 md:text-xl font-light">Drone çekimlerimizle kampüsümüzü her açıdan görün.</p>
            </m.div>
          </div>
        </div>

        {/* --- ÖZELLİKLER --- */}
        <div className="mx-auto -mt-16 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3 relative z-20">
          {[
            { icon: <MapPin className="text-pink-500" />, label: "Geniş Alan", val: "2500m²" },
            { icon: <Wind className="text-sky-500" />, label: "Yeşil Alan", val: "1200m²" },
            { icon: <ZoomIn className="text-purple-500" />, label: "Çekim", val: "4K Ultra HD" },
          ].map((item, i) => (
              <m.div key={i} whileHover={{ y: -8 }} className="flex items-center gap-4 rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div className="rounded-2xl bg-slate-50 p-4">{item.icon}</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                  <p className="text-2xl font-black text-slate-800">{item.val}</p>
                </div>
              </m.div>
          ))}
        </div>

        {/* --- VİDEO GALERİ --- */}
        <section className="mx-auto max-w-7xl px-4 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900">Drone Galeri</h2>
              <p className="text-slate-500 mt-2">En güncel çekimlerimizi buradan takip edebilirsiniz.</p>
            </div>
            <div className="h-1 w-20 bg-pink-500 rounded-full hidden md:block mb-4"></div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {droneClips.map((clip) => (
                <m.div
                    key={clip.id}
                    layoutId={`video-${clip.id}`}
                    onClick={() => setSelectedVideo(clip)}
                    className="group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white shadow-xl hover:shadow-2xl transition-all border border-slate-100"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {/* Video Önizleme (Hover olunca oynar veya poster gibi durur) */}
                    <video
                        src={`${Config.api.baseUrl}/api/v1/videos/${clip.id}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white scale-75 group-hover:scale-100 transition-transform">
                        <Play fill="currentColor" size={32} />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 text-pink-500 mb-3">
                      <Calendar size={14} />
                      <span className="text-xs font-bold uppercase tracking-widest">{formatDate(clip.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-pink-500 transition-colors">
                      {clip.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                      {clip.contentType === "video/mp4" ? "Yüksek Kalite MP4 Formatı" : "Video İçeriği"}
                    </p>
                  </div>
                </m.div>
            ))}
          </div>
        </section>

        {/* --- VİDEO OYNATICI MODAL (LIGHTBOX) --- */}
        <AnimatePresence>
          {selectedVideo && (
              <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-xl"
                  onClick={() => setSelectedVideo(null)}
              >
                <m.button
                    whileHover={{ rotate: 90 }}
                    className="absolute top-8 right-8 text-white/50 hover:text-white"
                >
                  <X size={40} />
                </m.button>

                <m.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
                    onClick={(e) => e.stopPropagation()} // Tıklayınca kapanmasın
                >
                  <video
                      src={`${Config.api.baseUrl}/api/v1/videos/${selectedVideo.id}`}
                      controls
                      autoPlay
                      className="h-full w-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
                    <p className="text-white/60 text-sm mt-1">{formatDate(selectedVideo.createdAt)} tarihinde yüklendi</p>
                  </div>
                </m.div>
              </m.div>
          )}
        </AnimatePresence>

        {/* --- CTA --- */}
        <section className="bg-gradient-to-r from-sky-400 to-blue-500 py-24 text-center text-white relative overflow-hidden">
          <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          >
            <div className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-white blur-3xl"></div>
          </m.div>

          <div className="relative z-10">
            <h2 className="mb-8 text-4xl font-black md:text-6xl tracking-tight">Yüz Yüze Görüşelim</h2>
            <Link to="/iletisim">
              <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-white px-12 py-5 font-black text-sky-500 shadow-2xl transition-all hover:shadow-white/20"
              >
                Randevu Oluştur
              </m.button>
            </Link>
          </div>
        </section>
      </div>
  );
};

export default VirtualTour;