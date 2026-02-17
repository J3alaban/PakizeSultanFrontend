import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import VideosManagement from "./VideosManagement";

const AdminPage = () => {
  return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sol Sütun: Ürün Yönetimi (%66 civarı) */}
          <div className="lg:col-span-8 space-y-6">
            <ProductManagement />
          </div>

          {/* Sağ Sütun: Kategori ve Video Yönetimi (%33 civarı) */}
          <div className="lg:col-span-4 space-y-8">
            <CategoryManagement />

            {/* Yeni Video Yönetimi Bölümü */}
            <VideosManagement />

            {/* İstersen buraya hızlı istatistik kartları da ekleyebiliriz */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="font-bold text-lg mb-2">Hızlı İpucu</h3>
              <p className="text-sm opacity-90">
                Videoların 4K yerine 1080p olması sayfa açılış hızını %40 artıracaktır.
              </p>
            </div>
          </div>

        </div>
      </div>
  );
};

export default AdminPage;