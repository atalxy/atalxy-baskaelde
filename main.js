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
            seller: {
                name: "Ahmet Yılmaz",
                rating: 4.8
            },
            isNitro: true
        },
        {
            id: 2,
            title: '2019 Mercedes C200 AMG',
            price: 1250000,
            category: 'Vasıta',
            condition: 'Çok İyi',
            location: 'Ankara',
            description: 'Tam donanım, servis bakımlı',
            images: ['https://via.placeholder.com/300x200.png?text=Mercedes+C200'],
            seller: {
                name: 'Mehmet Demir',
                rating: 4.9,
                location: 'Ankara/Çankaya'
            },
            isNitro: false
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
            seller: {
                name: "Mehmet Kaya",
                rating: 4.9
            },
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
            seller: {
                name: "Ayşe Demir",
                rating: 4.7
            },
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
    if (category === 'all') {
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
                <div class="product-details">
                    ${product.brand ? `<span class="product-brand">${product.brand}</span>` : ''}
                    ${product.model ? `<span class="product-model">${product.model}</span>` : ''}
                </div>
                <div class="product-price">${formatPrice(product.price)} TL</div>
                <div class="product-meta">
                    <span class="product-location">
                        <i class="fas fa-map-marker-alt"></i> ${product.location}
                    </span>
                    <span class="product-condition">${getConditionText(product.condition)}</span>
                    <span class="product-date">1 gün önce</span>
                </div>
                ${product.tags ? `
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ` : ''}
                <a href="pages/ilan-detay.html?id=${product.id}" class="btn btn-primary btn-block">
                    <i class="fas fa-search"></i> İlanı İncele
                </a>
            </div>
        </div>
    `;
};

// Fiyatı formatla
const formatPrice = (price) => {
    return price.toLocaleString('tr-TR');
};

// Durum metnini getir
const getConditionText = (condition) => {
    const conditions = {
        'new': 'Sıfır',
        'like-new': 'Az Kullanılmış',
        'good': 'İyi',
        'fair': 'Orta'
    };
    return conditions[condition] || condition;
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Tüm ürünleri listele
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        const allProducts = getAllProducts();
        productGrid.innerHTML = allProducts.map(createProductCard).join('');
    }

    // Nitro ilanları listele
    const nitroListings = document.getElementById('nitroListings');
    if (nitroListings) {
        const nitroProducts = getAllProducts().filter(product => product.isNitro);
        nitroListings.innerHTML = nitroProducts.map(createProductCard).join('');
    }

    // Kategori filtreleme
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            const filteredProducts = filterProductsByCategory(category);
            productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
            
            // Aktif kategoriyi vurgula
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Arama formunu ayarla
    setupSearchForm();
    
    // Kategori kartlarını ayarla
    setupCategoryCards();

    // Login/Register formlarını ayarla
    setupAuthForms();

    // Kullanıcı menüsünü ayarla
    setupUserMenu();

    // Auth durumunu kontrol et
    checkAuthStatus();

    updateUserMenu();
});

// Arama formunu ayarla
function setupSearchForm() {
    const searchForm = document.getElementById('searchForm');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(searchForm);
        const searchQuery = formData.get('search');
        const category = formData.get('category');
        const location = formData.get('location');

        // Arama parametrelerini URL'e ekle
        const searchParams = new URLSearchParams();
        if (searchQuery) searchParams.set('search', searchQuery);
        if (category) searchParams.set('category', category);
        if (location) searchParams.set('location', location);

        // Ürün listeleme sayfasına yönlendir
        window.location.href = `pages/urun-listele.html?${searchParams.toString()}`;
    });
}

// Kategori kartlarını ayarla
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.getAttribute('href').split('=')[1];
            window.location.href = `pages/urun-listele.html?category=${category}`;
        });
    });
}

// Login/Register formlarını ayarla
function setupAuthForms() {
    // Tab değiştirme
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${tab}Form`).classList.add('active');
        });
    });

    // Login formu
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Örnek kullanıcı kontrolü (gerçek uygulamada API'ye istek atılacak)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                closeAuthModal();
                updateUserMenu();
                showMessage('Başarıyla giriş yaptınız!', 'success');
            } else {
                showMessage('E-posta veya şifre hatalı!', 'error');
            }
        });
    }

    // Register formu
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

            if (password !== passwordConfirm) {
                showMessage('Şifreler eşleşmiyor!', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.email === email)) {
                showMessage('Bu e-posta adresi zaten kayıtlı!', 'error');
                return;
            }

            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            closeAuthModal();
            updateUserMenu();
            showMessage('Kayıt işlemi başarılı!', 'success');
        });
    }
}

// Kullanıcı menüsünü ayarla
function setupUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    if (!userMenu) return;

    const button = userMenu.querySelector('button');
    const dropdown = userMenu.querySelector('.user-dropdown');

    button.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    // Dışarı tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Auth durumunu kontrol et
function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userMenu = document.querySelector('.user-menu');
    
    if (currentUser && userMenu) {
        // Giriş yapılmış
        userMenu.querySelector('button').innerHTML = `
            <i class="fas fa-user"></i> ${currentUser.name}
        `;
    }
}

// Çıkış yap
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    updateUserMenu();
    showMessage('Başarıyla çıkış yaptınız!', 'success');
}

// Modal göster
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Modal kapat
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Hata mesajı göster
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Dışarı tıklandığında modalı kapat
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Auth işlemleri
function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}

// Kullanıcı girişi kontrolü
function checkAuthAndRedirect(url) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        window.location.href = url;
    } else {
        showAuthModal();
        showMessage('Lütfen önce giriş yapın veya kayıt olun.');
    }
}

// Kullanıcı menüsünü güncelle
function updateUserMenu() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userMenu = document.querySelector('.user-menu');

    if (isLoggedIn && currentUser) {
        userMenu.innerHTML = `
            <div class="dropdown">
                <button class="btn-secondary">
                    <i class="fas fa-user"></i> ${currentUser.name}
                </button>
                <div class="dropdown-content">
                    <a href="pages/profil.html"><i class="fas fa-user-circle"></i> Profilim</a>
                    <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Çıkış Yap</a>
                </div>
            </div>
        `;
    } else {
        userMenu.innerHTML = `
            <button class="btn-secondary" onclick="showAuthModal()">
                <i class="fas fa-user"></i> Giriş Yap
            </button>
        `;
    }
}

// Mesaj gösterme
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Nitro ilanları kaydır
function scrollNitroListings(direction) {
    const container = document.getElementById('nitroListings');
    const scrollAmount = 300; // Her tıklamada kaydırılacak piksel miktarı
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// İlan Ekleme Sayfası Fonksiyonları
document.addEventListener('DOMContentLoaded', function() {
    const listingForm = document.getElementById('listingForm');
    const category = document.getElementById('category');
    const subCategory = document.getElementById('subCategory');
    const city = document.getElementById('city');
    const district = document.getElementById('district');
    const photoUploadBox = document.querySelector('.photo-upload-box');
    const photoInput = document.getElementById('photos');
    const photoPreview = document.getElementById('photoPreview');

    if (listingForm) {
        // Kategori değişikliğinde alt kategori güncelleme
        category.addEventListener('change', function() {
            const selectedCategory = this.value;
            subCategory.disabled = !selectedCategory;
            
            // Alt kategorileri güncelle
            const subCategories = {
                'vasita': ['Otomobil', 'Motosiklet', 'Ticari Araçlar'],
                'emlak': ['Konut', 'İş Yeri', 'Arsa'],
                'elektronik': ['Telefon', 'Bilgisayar', 'Tablet']
            };

            subCategory.innerHTML = '<option value="">Alt Kategori Seçin</option>';
            
            if (selectedCategory && subCategories[selectedCategory]) {
                subCategories[selectedCategory].forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub.toLowerCase();
                    option.textContent = sub;
                    subCategory.appendChild(option);
                });
            }
        });

        // Şehir değişikliğinde ilçe güncelleme
        city.addEventListener('change', function() {
            const selectedCity = this.value;
            district.disabled = !selectedCity;
            
            // İlçeleri güncelle
            const districts = {
                'istanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli'],
                'ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak'],
                'izmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca']
            };

            district.innerHTML = '<option value="">İlçe Seçin</option>';
            
            if (selectedCity && districts[selectedCity]) {
                districts[selectedCity].forEach(dist => {
                    const option = document.createElement('option');
                    option.value = dist.toLowerCase();
                    option.textContent = dist;
                    district.appendChild(option);
                });
            }
        });

        // Fotoğraf yükleme ve önizleme
        if (photoUploadBox && photoInput && photoPreview) {
            photoUploadBox.addEventListener('click', () => photoInput.click());
            
            photoInput.addEventListener('change', function() {
                const files = Array.from(this.files);
                
                if (files.length > 10) {
                    showMessage('En fazla 10 fotoğraf yükleyebilirsiniz.', 'error');
                    return;
                }

                files.forEach(file => {
                    if (file.size > 5 * 1024 * 1024) {
                        showMessage('Her fotoğraf en fazla 5MB olabilir.', 'error');
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const div = document.createElement('div');
                        div.className = 'photo-preview-item';
                        div.innerHTML = `
                            <img src="${e.target.result}" alt="Ürün fotoğrafı">
                            <button type="button" class="remove-photo">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        
                        div.querySelector('.remove-photo').addEventListener('click', function() {
                            div.remove();
                        });
                        
                        photoPreview.appendChild(div);
                    };
                    reader.readAsDataURL(file);
                });
            });
        }

        // Form gönderimi
        listingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini topla
            const formData = new FormData(this);
            const listingData = {
                title: formData.get('title'),
                category: formData.get('category'),
                subCategory: formData.get('subCategory'),
                price: formData.get('price'),
                condition: formData.get('condition'),
                brand: formData.get('brand'),
                model: formData.get('model'),
                warranty: formData.get('warranty'),
                color: formData.get('color'),
                tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
                city: formData.get('city'),
                district: formData.get('district'),
                description: formData.get('description'),
                isNitro: formData.get('isNitro') === 'on',
                photos: Array.from(document.querySelectorAll('.photo-preview-item img')).map(img => img.src),
                date: new Date().toISOString(),
                seller: JSON.parse(localStorage.getItem('currentUser'))
            };

            // Kullanıcı kontrolü
            if (!listingData.seller) {
                showMessage('İlan vermek için giriş yapmalısınız.', 'error');
                showAuthModal();
                return;
            }

            // Mevcut ilanları al
            let listings = JSON.parse(localStorage.getItem('listings')) || [];
            
            // Yeni ilanı ekle
            listings.push({
                id: Date.now().toString(),
                ...listingData
            });
            
            // İlanları kaydet
            localStorage.setItem('listings', JSON.stringify(listings));
            
            showMessage('İlanınız başarıyla yayınlandı!', 'success');
            
            // Ana sayfaya yönlendir
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        });
    }
});

// Profil Sayfası Fonksiyonları
document.addEventListener('DOMContentLoaded', function() {
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const listingCount = document.getElementById('listingCount');
    const ratingAverage = document.getElementById('ratingAverage');
    const successfulSales = document.getElementById('successfulSales');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const listingsGrid = document.getElementById('listingsGrid');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const reviewsList = document.getElementById('reviewsList');
    const profileSettingsForm = document.getElementById('profileSettingsForm');

    // Kullanıcı bilgilerini yükle
    function loadUserProfile() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = '../index.html';
            return;
        }

        // Profil bilgilerini güncelle
        profileName.textContent = currentUser.fullName || 'İsimsiz Kullanıcı';
        if (currentUser.avatar) {
            profileAvatar.src = currentUser.avatar;
        }

        // İstatistikleri güncelle
        const listings = JSON.parse(localStorage.getItem('listings')) || [];
        const userListings = listings.filter(listing => listing.seller.email === currentUser.email);
        listingCount.textContent = userListings.length;

        // Değerlendirmeleri yükle
        loadReviews();

        // Ayarlar formunu doldur
        if (profileSettingsForm) {
            profileSettingsForm.fullName.value = currentUser.fullName || '';
            profileSettingsForm.email.value = currentUser.email || '';
            profileSettingsForm.phone.value = currentUser.phone || '';
            if (currentUser.city) {
                profileSettingsForm.city.value = currentUser.city;
                updateDistricts(currentUser.city);
                profileSettingsForm.district.value = currentUser.district || '';
            }
            profileSettingsForm.address.value = currentUser.address || '';
            profileSettingsForm.emailNotifications.checked = currentUser.emailNotifications !== false;
            profileSettingsForm.smsNotifications.checked = currentUser.smsNotifications !== false;
        }
    }

    // Sekme değiştirme
    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.tab;
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(target).classList.add('active');
                
                if (target === 'listings') {
                    loadListings('active');
                } else if (target === 'favorites') {
                    loadFavorites();
                }
            });
        });
    }

    // İlan filtreleme
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                loadListings(filter);
            });
        });
    }

    // İlanları yükle
    function loadListings(filter = 'active') {
        if (!listingsGrid) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const listings = JSON.parse(localStorage.getItem('listings')) || [];
        const userListings = listings.filter(listing => listing.seller.email === currentUser.email);
        
        let filteredListings = userListings;
        if (filter === 'active') {
            filteredListings = userListings.filter(listing => !listing.sold);
        } else if (filter === 'sold') {
            filteredListings = userListings.filter(listing => listing.sold);
        }

        listingsGrid.innerHTML = filteredListings.map(listing => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${listing.photos[0]}" alt="${listing.title}">
                    ${listing.isNitro ? '<span class="nitro-badge">Nitro</span>' : ''}
                </div>
                <div class="product-info">
                    <h3>${listing.title}</h3>
                    <p class="price">${listing.price} TL</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${listing.city}</p>
                    <div class="product-actions">
                        <button class="btn-secondary" onclick="editListing('${listing.id}')">
                            <i class="fas fa-edit"></i> Düzenle
                        </button>
                        <button class="btn-danger" onclick="deleteListing('${listing.id}')">
                            <i class="fas fa-trash"></i> Sil
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Favorileri yükle
    function loadFavorites() {
        if (!favoritesGrid) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const favorites = currentUser.favorites || [];
        const listings = JSON.parse(localStorage.getItem('listings')) || [];
        
        const favoriteListings = listings.filter(listing => favorites.includes(listing.id));

        favoritesGrid.innerHTML = favoriteListings.map(listing => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${listing.photos[0]}" alt="${listing.title}">
                    ${listing.isNitro ? '<span class="nitro-badge">Nitro</span>' : ''}
                </div>
                <div class="product-info">
                    <h3>${listing.title}</h3>
                    <p class="price">${listing.price} TL</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${listing.city}</p>
                    <button class="btn-danger" onclick="removeFavorite('${listing.id}')">
                        <i class="fas fa-heart-broken"></i> Favorilerden Çıkar
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Değerlendirmeleri yükle
    function loadReviews() {
        if (!reviewsList) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const userReviews = reviews.filter(review => review.sellerId === currentUser.id);

        // Ortalama puanı hesapla
        const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = userReviews.length > 0 ? (totalRating / userReviews.length).toFixed(1) : '0.0';
        
        // İstatistikleri güncelle
        ratingAverage.textContent = averageRating;
        successfulSales.textContent = userReviews.length;

        // Değerlendirmeleri listele
        reviewsList.innerHTML = userReviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.reviewer.avatar || '../images/default-avatar.png'}" alt="Değerlendiren">
                        <div>
                            <h4>${review.reviewer.fullName}</h4>
                            <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.comment}</p>
            </div>
        `).join('');
    }

    // Profil ayarlarını kaydet
    if (profileSettingsForm) {
        profileSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const updatedUser = {
                ...currentUser,
                fullName: this.fullName.value,
                phone: this.phone.value,
                city: this.city.value,
                district: this.district.value,
                address: this.address.value,
                emailNotifications: this.emailNotifications.checked,
                smsNotifications: this.smsNotifications.checked
            };
            
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Kullanıcılar listesini güncelle
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            showMessage('Profil bilgileriniz güncellendi.', 'success');
            loadUserProfile();
        });
    }

    // İl değişikliğinde ilçeleri güncelle
    const citySelect = document.getElementById('city');
    if (citySelect) {
        citySelect.addEventListener('change', function() {
            updateDistricts(this.value);
        });
    }

    // İlçeleri güncelle
    function updateDistricts(selectedCity) {
        const districtSelect = document.getElementById('district');
        if (!districtSelect) return;

        const districts = {
            'istanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli'],
            'ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak'],
            'izmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca']
        };

        districtSelect.innerHTML = '<option value="">İlçe Seçin</option>';
        districtSelect.disabled = !selectedCity;
        
        if (selectedCity && districts[selectedCity]) {
            districts[selectedCity].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase();
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    }

    // Profil ve kapak fotoğrafı yükleme
    const editAvatar = document.querySelector('.edit-avatar');
    const editCover = document.querySelector('.edit-cover');
    
    if (editAvatar) {
        editAvatar.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        profileAvatar.src = e.target.result;
                        
                        // Kullanıcı bilgilerini güncelle
                        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                        currentUser.avatar = e.target.result;
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        
                        showMessage('Profil fotoğrafınız güncellendi.', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }

    if (editCover) {
        editCover.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        document.querySelector('.profile-cover').style.backgroundImage = `url(${e.target.result})`;
                        
                        // Kullanıcı bilgilerini güncelle
                        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                        currentUser.coverPhoto = e.target.result;
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        
                        showMessage('Kapak fotoğrafınız güncellendi.', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }

    // Sayfa yüklendiğinde profil bilgilerini yükle
    if (document.querySelector('.profile-container')) {
        loadUserProfile();
    }
});

// İlan düzenleme fonksiyonu
function editListing(listingId) {
    window.location.href = `ilan-duzenle.html?id=${listingId}`;
}

// İlan silme fonksiyonu
function deleteListing(listingId) {
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
        const listings = JSON.parse(localStorage.getItem('listings')) || [];
        const updatedListings = listings.filter(listing => listing.id !== listingId);
        localStorage.setItem('listings', JSON.stringify(updatedListings));
        
        showMessage('İlan başarıyla silindi.', 'success');
        loadListings('active');
    }
}

// Favorilerden çıkarma fonksiyonu
function removeFavorite(listingId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.favorites = (currentUser.favorites || []).filter(id => id !== listingId);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showMessage('İlan favorilerden çıkarıldı.', 'success');
    loadFavorites();
}

// İlan detay sayfası fonksiyonları
function loadListingDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');
    
    if (!listingId) {
        showError('İlan bulunamadı');
        return;
    }

    // Önce allProducts içinde ara
    let listing = null;
    for (const category in allProducts) {
        const found = allProducts[category].find(l => l.id.toString() === listingId);
        if (found) {
            listing = found;
            break;
        }
    }

    // Eğer allProducts içinde bulunamazsa, localStorage'da ara
    if (!listing) {
        const listings = JSON.parse(localStorage.getItem('listings')) || [];
        listing = listings.find(l => l.id === listingId);
    }

    if (!listing) {
        showError('İlan bulunamadı');
        return;
    }

    // Ana resmi yükle
    const mainImage = document.querySelector('.main-image img');
    if (mainImage && listing.images && listing.images.length > 0) {
        mainImage.src = listing.images[0];
    }

    // Küçük resimleri yükle
    const thumbnailList = document.querySelector('.thumbnail-list');
    if (thumbnailList && listing.images) {
        thumbnailList.innerHTML = listing.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                <img src="${img}" alt="Ürün görseli ${index + 1}">
            </div>
        `).join('');
    }

    // İlan başlığı ve fiyatı
    document.querySelector('.listing-header h1').textContent = listing.title;
    document.querySelector('.listing-price').textContent = `${formatPrice(listing.price)} TL`;

    // İlan meta bilgileri
    const metaContainer = document.querySelector('.listing-meta');
    metaContainer.innerHTML = `
        <span><i class="fas fa-map-marker-alt"></i> ${listing.location}</span>
        <span><i class="fas fa-clock"></i> ${formatDate(listing.date || new Date())}</span>
    `;

    // İlan detayları
    const detailsContainer = document.querySelector('.listing-details');
    detailsContainer.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Durum</span>
            <span>${getConditionText(listing.condition)}</span>
        </div>
        ${listing.brand ? `
        <div class="detail-item">
            <span class="detail-label">Marka</span>
            <span>${listing.brand}</span>
        </div>
        ` : ''}
        ${listing.model ? `
        <div class="detail-item">
            <span class="detail-label">Model</span>
            <span>${listing.model}</span>
        </div>
        ` : ''}
        ${listing.warranty ? `
        <div class="detail-item">
            <span class="detail-label">Garanti</span>
            <span>${listing.warranty}</span>
        </div>
        ` : ''}
        ${listing.color ? `
        <div class="detail-item">
            <span class="detail-label">Renk</span>
            <span>${listing.color}</span>
        </div>
        ` : ''}
    `;

    // Açıklama
    const descriptionContainer = document.querySelector('.listing-description p');
    if (descriptionContainer) {
        descriptionContainer.textContent = listing.description || 'Açıklama bulunmuyor.';
    }

    // Etiketler
    const tagsContainer = document.querySelector('.listing-tags');
    if (tagsContainer && listing.tags) {
        tagsContainer.innerHTML = listing.tags.map(tag => `
            <span class="tag">${tag}</span>
        `).join('');
    }

    // Satıcı bilgileri
    const sellerInfo = document.querySelector('.seller-info');
    if (sellerInfo) {
        const seller = listing.seller || {};
        sellerInfo.innerHTML = `
            <h3>Satıcı Bilgileri</h3>
            <div class="seller-profile">
                <img src="${seller.avatar || '../images/default-avatar.png'}" alt="${seller.name || 'Satıcı'}">
                <div class="seller-details">
                    <h4>${seller.name || 'Satıcı'}</h4>
                    <div class="seller-rating">
                        <i class="fas fa-star"></i>
                        <span>${seller.rating || '4.5'} (${seller.reviewCount || '0'} değerlendirme)</span>
                    </div>
                </div>
            </div>
            <div class="seller-actions">
                <button class="btn btn-primary" onclick="contactSeller('${seller.id || ''}')">
                    <i class="fas fa-envelope"></i> Mesaj Gönder
                </button>
                <button class="btn btn-outline" onclick="toggleFavorite('${listingId}')">
                    <i class="fas fa-heart"></i> Favorilere Ekle
                </button>
            </div>
        `;
    }
}

function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.querySelector('.main-image img');
    mainImage.src = imageSrc;

    // Aktif thumbnail'i güncelle
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

function contactSeller(sellerId) {
    // Mesajlaşma sistemi entegrasyonu burada yapılacak
    showMessage('Mesajlaşma sistemi yakında eklenecek!');
}

function toggleFavorite(listingId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showError('Favorilere eklemek için giriş yapmalısınız');
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (!favorites[currentUser.id]) {
        favorites[currentUser.id] = [];
    }

    const index = favorites[currentUser.id].indexOf(listingId);
    if (index === -1) {
        favorites[currentUser.id].push(listingId);
        showSuccess('İlan favorilere eklendi');
    } else {
        favorites[currentUser.id].splice(index, 1);
        showSuccess('İlan favorilerden çıkarıldı');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sayfa yüklendiğinde ilan detaylarını yükle
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('ilan-detay.html')) {
        loadListingDetails();
    }
}); 