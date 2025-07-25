// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // URL'den ürün ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Ürün detaylarını yükle
    loadProductDetails(productId);
    
    // Mesaj formunu ayarla
    setupMessageForm();

    // Favori butonunu ayarla
    setupFavoriteButton(productId);
});

// Ürün detaylarını yükle
function loadProductDetails(productId) {
    // localStorage'dan ürünleri al
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (!product) {
        showError('Ürün bulunamadı.');
        return;
    }

    // Ürün detaylarını göster
    document.querySelector('.product-title').textContent = product.title;
    document.querySelector('.product-price').textContent = `${formatPrice(product.price)} TL`;
    document.querySelector('.product-location').textContent = product.location;
    document.querySelector('.product-condition').textContent = product.condition;
    document.querySelector('.product-description').textContent = product.description;

    // Ürün resimlerini göster
    const imageGallery = document.querySelector('.product-images');
    imageGallery.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = `../images/${image}`;
        img.alt = product.title;
        img.onclick = () => updateMainImage(image);
        if (index === 0) img.classList.add('active');
        imageGallery.appendChild(img);
    });

    // Ana resmi ayarla
    updateMainImage(product.images[0]);

    // Satıcı bilgilerini göster
    document.querySelector('.seller-name').textContent = product.seller.name;
    document.querySelector('.seller-rating').textContent = `${product.seller.rating} / 5`;
    document.querySelector('.seller-location').textContent = product.seller.location;
}

// Ana resmi güncelle
function updateMainImage(imageName) {
    const mainImage = document.querySelector('.main-image img');
    mainImage.src = `../images/${imageName}`;
    
    // Aktif thumbnail'i güncelle
    document.querySelectorAll('.product-images img').forEach(img => {
        img.classList.remove('active');
        if (img.src.includes(imageName)) {
            img.classList.add('active');
        }
    });
}

// Mesaj formunu ayarla
function setupMessageForm() {
    const messageForm = document.getElementById('messageForm');
    if (!messageForm) return;

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(messageForm)) return;

        const message = {
            id: Date.now(),
            productId: parseInt(new URLSearchParams(window.location.search).get('id')),
            sender: 'Kullanıcı', // Gerçek uygulamada giriş yapmış kullanıcı
            message: messageForm.querySelector('textarea').value,
            date: new Date().toISOString()
        };

        // Mesajı kaydet
        saveMessage(message);

        // Formu temizle
        messageForm.reset();

        // Modalı kapat
        closeModal('messageModal');

        // Başarı mesajı göster
        showSuccess('Mesajınız gönderildi.');
    });
}

// Mesajı kaydet
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Hata mesajı göster
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.product-details');
    container.insertBefore(errorDiv, container.firstChild);

    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Başarı mesajı göster
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const container = document.querySelector('.product-details');
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

// Form doğrulama
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'Bu alan zorunludur.');
        } else {
            removeFieldError(field);
        }
    });

    return isValid;
}

// Alan hata mesajı göster
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

// Alan hata mesajını kaldır
function removeFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Favori butonunu ayarla
function setupFavoriteButton(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(productId);

    const favoriteButton = document.createElement('button');
    favoriteButton.className = `btn-secondary ${isFavorite ? 'active' : ''}`;
    favoriteButton.innerHTML = isFavorite ? '❤️ Favorilerden Çıkar' : '🤍 Favorilere Ekle';
    favoriteButton.onclick = () => toggleFavorite(productId, favoriteButton);

    const sellerInfo = document.querySelector('.seller-info');
    if (sellerInfo) {
        sellerInfo.appendChild(favoriteButton);
    }
}

// Favori durumunu değiştir
function toggleFavorite(productId, button) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(productId);

    if (isFavorite) {
        // Favorilerden çıkar
        const updatedFavorites = favorites.filter(id => id !== productId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        button.innerHTML = '🤍 Favorilere Ekle';
        button.classList.remove('active');
        showSuccess('Ürün favorilerden çıkarıldı.');
    } else {
        // Favorilere ekle
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        button.innerHTML = '❤️ Favorilerden Çıkar';
        button.classList.add('active');
        showSuccess('Ürün favorilere eklendi.');
    }
} 