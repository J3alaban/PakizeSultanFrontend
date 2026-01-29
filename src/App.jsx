import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';

import HomePage from '@/pages/HomePage';
import Contact from '@/pages/Contact';
import About from "@/components/About.jsx";
import Programs from "@/components/Programs.jsx";
import FoodMenu from "@/components/FoodMenu.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";

function App() {
    return (
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
                    </Routes>
                </Layout>
            </CartProvider>
        </Router>
    );
}

export default App;