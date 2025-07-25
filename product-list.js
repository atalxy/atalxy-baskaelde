// Örnek ürün verileri
const allProducts = {
    vasita: [
        {
            id: 1,
            title: "2020 Model BMW 320i",
            price: 950000,
            category: "vasita",
            condition: "İyi",
            location: "İstanbul",
            description: "Temiz, bakımlı, servis bakımlı",
            images: ["https://via.placeholder.com/300x200?text=BMW+320i"],
            seller: { name: "Ahmet Yılmaz", rating: 4.8 },
            isNitro: true
        },
        {
            id: 2,
            title: "2019 Mercedes C200 AMG",
            price: 1250000,
            category: "vasita",
            condition: "Çok İyi",
            location: "Ankara",
            description: "Tam donanım, servis bakımlı",
            images: ["https://via.placeholder.com/300x200?text=Mercedes+C200"],
            seller: { name: "Mehmet Demir", rating: 4.9 },
            isNitro: true
        },
        {
            id: 3,
            title: "2021 Audi A4 40 TDI",
            price: 1450000,
            category: "vasita",
            condition: "Sıfır",
            location: "İzmir",
            description: "0 km, full paket",
            images: ["https://via.placeholder.com/300x200?text=Audi+A4"],
            seller: { name: "Ali Kaya", rating: 4.7 },
            isNitro: false
        },
        {
            id: 4,
            title: "2018 Volkswagen Passat",
            price: 850000,
            category: "vasita",
            condition: "İyi",
            location: "Bursa",
            description: "Dizel otomatik",
            images: ["https://via.placeholder.com/300x200?text=VW+Passat"],
            seller: { name: "Ayşe Demir", rating: 4.6 },
            isNitro: false
        },
        {
            id: 5,
            title: "2022 Toyota Corolla Hybrid",
            price: 950000,
            category: "vasita",
            condition: "Sıfır",
            location: "Antalya",
            description: "Hybrid, ekonomik",
            images: ["https://via.placeholder.com/300x200?text=Toyota+Corolla"],
            seller: { name: "Mustafa Şahin", rating: 4.9 },
            isNitro: true
        }
    ],
    emlak: [
        {
            id: 6,
            title: "Levent'te Lüks 3+1 Daire",
            price: 2500000,
            category: "emlak",
            condition: "Sıfır",
            location: "İstanbul",
            description: "Merkezi konumda, site içerisinde",
            images: ["https://via.placeholder.com/300x200?text=Luks+Daire"],
            seller: { name: "Mehmet Kaya", rating: 4.9 },
            isNitro: true
        },
        {
            id: 7,
            title: "Çankaya'da 4+1 Dubleks",
            price: 3200000,
            category: "emlak",
            condition: "Sıfır",
            location: "Ankara",
            description: "Bahçeli, asansörlü",
            images: ["https://via.placeholder.com/300x200?text=Dubleks"],
            seller: { name: "Zeynep Yıldız", rating: 4.8 },
            isNitro: true
        },
        {
            id: 8,
            title: "Bornova'da 2+1 Daire",
            price: 1200000,
            category: "emlak",
            condition: "İyi",
            location: "İzmir",
            description: "Üniversiteye yakın",
            images: ["https://via.placeholder.com/300x200?text=Daire"],
            seller: { name: "Can Öztürk", rating: 4.7 },
            isNitro: false
        }
    ],
    elektronik: [
        {
            id: 9,
            title: "iPhone 13 Pro 256GB",
            price: 25000,
            category: "elektronik",
            condition: "Az Kullanılmış",
            location: "Ankara",
            description: "Kutulu, tüm aksesuarları tam",
            images: ["https://via.placeholder.com/300x200?text=iPhone+13"],
            seller: { name: "Ayşe Demir", rating: 4.7 },
            isNitro: true
        },
        {
            id: 10,
            title: "MacBook Pro M1",
            price: 35000,
            category: "elektronik",
            condition: "Yeni",
            location: "İstanbul",
            description: "16GB RAM, 512GB SSD",
            images: ["https://via.placeholder.com/300x200?text=MacBook"],
            seller: { name: "Burak Yılmaz", rating: 4.9 },
            isNitro: true
        },
        {
            id: 11,
            title: "Samsung Galaxy S21",
            price: 15000,
            category: "elektronik",
            condition: "İyi",
            location: "İzmir",
            description: "Garantili, kutulu",
            images: ["https://via.placeholder.com/300x200?text=Samsung"],
            seller: { name: "Elif Kara", rating: 4.6 },
            isNitro: false
        }
    ]
};

// Tüm ürünleri düz bir diziye çevir
const getAllProducts = () => {
    return Object.values(allProducts).flat();
};

// Ürünleri kategoriye göre filtrele
const filterProductsByCategory = (category) => {
    if (!category || category === 'all') {
        return getAllProducts();
    }
    return allProducts[category] || [];
};

// Ürün kartı HTML'i oluştur
const createProductCard = (product) => {
    return `
        <div class="product-card">
            ${product.isNitro ? '<span class="nitro-badge">Nitro</span>' : ''}
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formatPrice(product.price)} TL</div>
                <div class="product-meta">
                    <span class="product-location">
                        <i class="fas fa-map-marker-alt"></i> ${product.location}
                    </span>
                    <span class="product-date">1 gün önce</span>
                </div>
            </div>
        </div>
    `;
};

// Fiyatı formatla
const formatPrice = (price) => {
    return price.toLocaleString('tr-TR');
};

// URL'den kategori parametresini al
const getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // URL'den kategori parametresini al
    const category = getUrlParameter('category');
    
    // Ürünleri filtrele ve göster
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        const filteredProducts = filterProductsByCategory(category);
        productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
        
        // Toplam ilan sayısını güncelle
        const totalCount = document.querySelector('.total-count');
        if (totalCount) {
            totalCount.textContent = `${filteredProducts.length} ilan listelendi`;
        }
        
        // Başlığı güncelle
        const listingTitle = document.querySelector('.listing-title h1');
        if (listingTitle) {
            listingTitle.textContent = category ? 
                `${category.charAt(0).toUpperCase() + category.slice(1)} İlanları` : 
                'Tüm İlanlar';
        }
    }

    // Kategori listesi için event listener'ları ekle
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedCategory = e.target.getAttribute('data-category') || 'all';
            
            // URL'i güncelle
            const newUrl = selectedCategory === 'all' ? 
                window.location.pathname : 
                `${window.location.pathname}?category=${selectedCategory}`;
            window.history.pushState({}, '', newUrl);
            
            // Ürünleri filtrele ve göster
            const filteredProducts = filterProductsByCategory(selectedCategory);
            productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
            
            // Aktif kategoriyi güncelle
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            // Başlık ve toplam sayıyı güncelle
            if (listingTitle) {
                listingTitle.textContent = selectedCategory === 'all' ? 
                    'Tüm İlanlar' : 
                    `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} İlanları`;
            }
            if (totalCount) {
                totalCount.textContent = `${filteredProducts.length} ilan listelendi`;
            }
        });
    });

    // Fiyat filtresi için event listener
    const btnApply = document.querySelector('.btn-apply');
    if (btnApply) {
        btnApply.addEventListener('click', () => {
            const minPrice = Number(document.getElementById('minPrice').value);
            const maxPrice = Number(document.getElementById('maxPrice').value);
            
            let filteredProducts = filterProductsByCategory(category);
            
            if (minPrice) {
                filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
            }
            if (maxPrice) {
                filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
            }
            
            productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
            if (totalCount) {
                totalCount.textContent = `${filteredProducts.length} ilan listelendi`;
            }
        });
    }

    // Filtreleri temizle butonu için event listener
    const btnClearFilters = document.querySelector('.btn-clear-filters');
    if (btnClearFilters) {
        btnClearFilters.addEventListener('click', () => {
            // Input'ları temizle
            document.getElementById('minPrice').value = '';
            document.getElementById('maxPrice').value = '';
            document.getElementById('city').value = '';
            document.getElementById('district').value = '';
            
            // Checkbox'ları temizle
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            
            // Ürünleri yeniden yükle
            const filteredProducts = filterProductsByCategory(category);
            productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
            if (totalCount) {
                totalCount.textContent = `${filteredProducts.length} ilan listelendi`;
            }
        });
    }
}); 