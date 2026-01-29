export const products = [
    {
        id: 1,
        name: "Tasarım ve Beceri Atölyesi",
        price: 4500.00,
        ageGroup: "3-4 Yaş",
        image: "https://images.unsplash.com/photo-1502086223501-7ea2443d844c?w=800&q=80",
        shortDescription: "Oyun yoluyla keşif ve motor beceri gelişimi.",
        description: "Küçük yaş grupları için tasarlanmış bu programda, çocuklarımız duyusal oyunlar ve basit sanat etkinlikleriyle dünyayı tanıyor.",
        features: [
            "Duyusal oyun grupları",
            "İnce motor beceri takibi",
            "Haftalık gelişim raporu",
            "Uzman pedagog desteği",
            "Organik ara öğünler"
        ]
    },
    {
        id: 2,
        name: "Değerler Eğitimi",
        price: 5200.00,
        ageGroup: "4-5 Yaş",
        image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&q=80",
        shortDescription: "Sorgulayan zihinler için temel bilim ve doğa.",
        description: "Çocukların merak duygusunu besleyen, doğa gezileri ve basit deneylerle zenginleştirilmiş kapsamlı eğitim programı.",
        features: [
            "Doğa ve çevre bilinci",
            "Basit STEM aktiviteleri",
            "Grup çalışması yetkinliği",
            "Görsel sanatlar eğitimi",
            "Yabancı dil başlangıcı"
        ]
    },
    {
        id: 3,
        name: "Akıl ve Zeka Oyunları",
        price: 5800.00,
        ageGroup: "5-6 Yaş",
        image: "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?w=800&q=80",
        shortDescription: "Akademik ve sosyal tam donanımlı hazırlık.",
        description: "Okuma-yazma hazırlık çalışmaları, temel matematik kavramları ve özgüven geliştirici sosyal aktiviteler.",
        features: [
            "Okuma-yazmaya hazırlık",
            "Mantık ve akıl oyunları",
            "Sosyal sorumluluk bilinci",
            "Haftalık İngilizce drama",
            "Bireysel yetenek analizi"
        ]
    },
    {
        id: 4,
        name: "Piyano - Modern Dans",
        price: 3800.00,
        ageGroup: "Genel",
        image: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=800&q=80",
        shortDescription: "Sesleri keşfedin, ritimle tanışın.",
        description: "Orff yaklaşımı ile çocukların müzik kulağını geliştiren, farklı enstrümanları deneyimledikleri sanat odaklı program.",
        features: [
            "Orff çalgıları eğitimi",
            "Ritim ve koordinasyon",
            "Koro ve ses eğitimi",
            "Dünya müzikleri tanıtımı",
            "Yıl sonu büyük gösterisi"
        ]
    },
    {
        id: 5,
        name: "Ekoloji",
        price: 3200.00,
        ageGroup: "3-6 Yaş",
        image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&q=80",
        shortDescription: "Eğlenceli, bol güneşli bir yaz tatili.",
        description: "Havuz aktiviteleri, bahçe oyunları ve sanat atölyeleriyle dolu, unutulmaz bir yaz deneyimi.",
        features: [
            "Yüzme ve su oyunları",
            "Açık hava sineması",
            "Ekoloji atölyesi",
            "Spor ve jimnastik",
            "Haftalık dış geziler"
        ]
    },
    {
        id: 6,
        name: "Mutfak Atölyesi",
        price: 3500.00,
        ageGroup: "4-6 Yaş",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        shortDescription: "Sağlıklı beslenmeyi eğlenerek öğreniyoruz.",
        description: "Kendi yemeğini hazırlayan çocukların özgüveni artar! Eğlenceli mutfak atölyeleri ile temel mutfak becerileri.",
        features: [
            "Sağlıklı beslenme bilinci",
            "Hijyen eğitimi",
            "Dünya mutfakları tadımı",
            "Basit yemek hazırlama",
            "Mutfak ekipmanları tanıma"
        ]
    }
];

export const reviews = [
    {
        id: 1,
        name: "Elif Aksoy",
        relation: "Mert'in Annesi",
        rating: 5,
        comment: "Oğlumuzun okula alışma sürecini o kadar profesyonel yönettiler ki... Öğretmenlerin ilgisi ve şefkati bizi çok rahatlatıyor.",
        date: "20 Ocak 2026",
        emoji: "🧸"
    },
    {
        id: 2,
        name: "Burak Yılmaz",
        relation: "Defne'nin Babası",
        rating: 5,
        comment: "Eğitim kalitesi ve yemeklerin organik olması bizim için en önemli kriterdi. Her iki konuda da beklentilerimizin çok üzerindeler.",
        date: "12 Ocak 2026",
        emoji: "🍎"
    },
    {
        id: 3,
        name: "Selin Demir",
        relation: "Can'ın Annesi",
        rating: 5,
        comment: "İngilizce drama dersleri sayesinde Can evde kendi kendine İngilizce şarkılar söylemeye başladı. Gelişimi inanılmaz!",
        date: "10 Ocak 2026",
        emoji: "🎭"
    },
    {
        id: 4,
        name: "Hülya Tan",
        relation: "Asya'nın Annesi",
        rating: 4,
        comment: "Okulun fiziksel imkanları ve oyun alanları harika. Sadece okul çıkış saati trafiği biraz zorlayıcı olabiliyor ama okul buna değer.",
        date: "5 Ocak 2026",
        emoji: "🌈"
    }
];

export const offers = [
    {
        id: 1,
        title: "Erken Kayıt Fırsatı",
        discount: 25,
        description: "Yeni dönem kayıtlarında %25'e varan indirim",
        expiryDate: "2026-03-31",
        color: "#FF69B4" // Pink
    },
    {
        id: 2,
        title: "Kardeş İndirimi",
        discount: 15,
        description: "İkinci kardeşe özel ekstra %15 indirim avantajı",
        expiryDate: "2026-09-01",
        color: "#87CEFA" // Sky Blue
    },
    {
        id: 3,
        title: "Peşin Ödeme Avantajı",
        discount: 10,
        description: "Yıllık peşin ödemelerde net %10 indirim",
        expiryDate: "2026-08-31",
        color: "#FFD700" // Gold
    }
];