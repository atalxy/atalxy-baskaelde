// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    setupProfileNavigation();
    loadUserListings();
    loadUserMessages();
    loadUserFavorites();
    setupProfileSettings();
});

// Profil navigasyonunu ayarla
function setupProfileNavigation() {
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.profile-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Aktif linki güncelle
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // İlgili bölümü göster
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Kullanıcı ilanlarını yükle
function loadUserListings() {
    const listingsContainer = document.querySelector('#listings .listings-grid');
    if (!listingsContainer) return;

    const listings = JSON.parse(localStorage.getItem('products')) || [];
    const userListings = listings.filter(listing => listing.seller.name === 'Kullanıcı');

    if (userListings.length === 0) {
        listingsContainer.innerHTML = '<p>Henüz ilanınız bulunmuyor.</p>';
        return;
    }

    listingsContainer.innerHTML = '';
    userListings.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsContainer.appendChild(listingCard);
    });
}

// İlan kartı oluştur
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.innerHTML = `
        <img src="../images/${listing.images[0]}" alt="${listing.title}">
        <div class="listing-info">
            <h3>${listing.title}</h3>
            <p class="listing-price">${formatPrice(listing.price)} TL</p>
            <p>${listing.location}</p>
            <div class="listing-actions">
                <a href="../pages/urun-detay.html?id=${listing.id}" class="btn-primary">Düzenle</a>
                <button class="btn-danger" onclick="deleteListing(${listing.id})">Sil</button>
            </div>
        </div>
    `;
    return card;
}

// İlanı sil
function deleteListing(listingId) {
    if (!confirm('Bu ilanı silmek istediğinizden emin misiniz?')) return;

    const listings = JSON.parse(localStorage.getItem('products')) || [];
    const updatedListings = listings.filter(listing => listing.id !== listingId);
    localStorage.setItem('products', JSON.stringify(updatedListings));

    // İlanları yeniden yükle
    loadUserListings();
}

// Kullanıcı mesajlarını yükle
function loadUserMessages() {
    const messagesContainer = document.querySelector('#messages .messages-list');
    if (!messagesContainer) return;

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const userMessages = messages.filter(message => message.sender === 'Kullanıcı');

    if (userMessages.length === 0) {
        messagesContainer.innerHTML = '<p>Henüz mesajınız bulunmuyor.</p>';
        return;
    }

    messagesContainer.innerHTML = '';
    userMessages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesContainer.appendChild(messageElement);
    });
}

// Mesaj elementi oluştur
function createMessageElement(message) {
    const element = document.createElement('div');
    element.className = 'message-item';
    element.innerHTML = `
        <div class="message-header">
            <span>${new Date(message.date).toLocaleDateString()}</span>
            <button class="btn-danger" onclick="deleteMessage(${message.id})">Sil</button>
        </div>
        <div class="message-content">
            <p>${message.message}</p>
        </div>
    `;
    return element;
}

// Mesajı sil
function deleteMessage(messageId) {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = messages.filter(message => message.id !== messageId);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // Mesajları yeniden yükle
    loadUserMessages();
}

// Kullanıcı favorilerini yükle
function loadUserFavorites() {
    const favoritesContainer = document.querySelector('#favorites .product-grid');
    if (!favoritesContainer) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    if (favoriteProducts.length === 0) {
        favoritesContainer.innerHTML = '<p>Henüz favori ürününüz bulunmuyor.</p>';
        return;
    }

    favoritesContainer.innerHTML = '';
    favoriteProducts.forEach(product => {
        const productCard = createProductCard(product);
        favoritesContainer.appendChild(productCard);
    });
}

// Ürün kartı oluştur
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="../images/${product.images[0]}" alt="${product.title}">
        <div class="product-info">
            <h3>${product.title}</h3>
            <p class="product-price">${formatPrice(product.price)} TL</p>
            <p>${product.location}</p>
            <a href="../pages/urun-detay.html?id=${product.id}" class="btn-primary">İncele</a>
        </div>
    `;
    return card;
}

// Profil ayarlarını ayarla
function setupProfileSettings() {
    const settingsForm = document.getElementById('settingsForm');
    if (!settingsForm) return;

    // Mevcut ayarları yükle
    loadUserSettings();

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(settingsForm)) return;

        const formData = new FormData(settingsForm);
        const settings = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location')
        };

        // Şifre değişikliği kontrolü
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                showError(settingsForm, 'Şifre değişikliği için tüm alanları doldurun.');
                return;
            }

            if (newPassword !== confirmPassword) {
                showError(settingsForm, 'Yeni şifreler eşleşmiyor.');
                return;
            }

            settings.password = newPassword;
        }

        // Ayarları kaydet
        saveUserSettings(settings);

        // Başarı mesajı göster
        showSuccess('Ayarlarınız başarıyla güncellendi.');
    });
}

// Kullanıcı ayarlarını yükle
function loadUserSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {
        name: 'Kullanıcı',
        email: 'kullanici@example.com',
        phone: '',
        location: ''
    };

    const form = document.getElementById('settingsForm');
    if (!form) return;

    form.querySelector('input[name="name"]').value = settings.name;
    form.querySelector('input[name="email"]').value = settings.email;
    form.querySelector('input[name="phone"]').value = settings.phone;
    form.querySelector('input[name="location"]').value = settings.location;
}

// Kullanıcı ayarlarını kaydet
function saveUserSettings(settings) {
    localStorage.setItem('userSettings', JSON.stringify(settings));
}

// Form doğrulama
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showError(field, 'Bu alan zorunludur.');
        } else {
            removeError(field);
        }
    });

    return isValid;
}

// Hata mesajı göster
function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

// Hata mesajını kaldır
function removeError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Başarı mesajı göster
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const container = document.querySelector('.profile-content');
    container.insertBefore(successDiv, container.firstChild);

    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Fiyat formatla
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} 