import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import HomePage from "@/pages/HomePage";
import Contact from "@/pages/Contact";
import About from "@/components/About.jsx";

import FoodMenu from "@/components/FoodMenu.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";
import AdminPage from "@/pages/AdminPage.jsx";

import Layout from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import Programs from "@/pages/Programs";
import VirtualTour from "@/pages/VirtualTour";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/hakkimizda" element={<About />} />
              <Route path="/programlar" element={<Programs />} />
              <Route path="/yemek-listesi" element={<FoodMenu />} />
              <Route path="/kaydol" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/programlar" element={<Programs />} />
              <Route path="/sanaltur" element={<VirtualTour />} />
            </Routes>
          </Layout>
        </CartProvider>
      </Router>
    </Provider>
  );
}

export default App;
