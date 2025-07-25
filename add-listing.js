// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation();
    setupImageUpload();
    setupPriceInput();
});

// Form validasyonunu ayarla
function setupFormValidation() {
    const form = document.getElementById('listingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(form)) return;

        // Form verilerini al
        const formData = new FormData(form);
        const listing = {
            id: Date.now(),
            title: formData.get('title'),
            category: formData.get('category'),
            price: parseInt(formData.get('price')),
            condition: formData.get('condition'),
            location: formData.get('location'),
            description: formData.get('description'),
            images: getUploadedImages(),
            seller: {
                name: 'Kullanıcı', // Gerçek uygulamada giriş yapmış kullanıcı
                rating: 5,
                location: formData.get('location')
            }
        };

        // İlanı kaydet
        saveListing(listing);

        // Formu temizle
        form.reset();
        clearImagePreview();

        // Başarı mesajı göster
        showSuccess('İlanınız başarıyla eklendi.');

        // Ana sayfaya yönlendir
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    });
}

// Form validasyonu
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

    // Fiyat kontrolü
    const priceField = form.querySelector('input[name="price"]');
    if (priceField && priceField.value) {
        const price = parseInt(priceField.value.replace(/[^\d]/g, ''));
        if (isNaN(price) || price <= 0) {
            isValid = false;
            showError(priceField, 'Geçerli bir fiyat giriniz.');
        }
    }

    // Resim kontrolü
    if (getUploadedImages().length === 0) {
        isValid = false;
        showError(document.querySelector('.image-upload-container'), 'En az bir resim yüklemelisiniz.');
    }

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

// Resim yükleme işlemlerini ayarla
function setupImageUpload() {
    const uploadButton = document.querySelector('.upload-button');
    const fileInput = document.querySelector('input[type="file"]');
    const imagePreview = document.querySelector('.image-preview');

    if (!uploadButton || !fileInput || !imagePreview) return;

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Ürün resmi';
                    
                    const wrapper = document.createElement('div');
                    wrapper.className = 'image-wrapper';
                    
                    const removeButton = document.createElement('button');
                    removeButton.className = 'remove-image';
                    removeButton.innerHTML = '&times;';
                    removeButton.onclick = () => wrapper.remove();
                    
                    wrapper.appendChild(img);
                    wrapper.appendChild(removeButton);
                    imagePreview.appendChild(wrapper);
                };
                
                reader.readAsDataURL(file);
            }
        }
    });
}

// Yüklenen resimleri al
function getUploadedImages() {
    const images = [];
    document.querySelectorAll('.image-preview img').forEach(img => {
        images.push(img.src);
    });
    return images;
}

// Resim önizlemeyi temizle
function clearImagePreview() {
    const imagePreview = document.querySelector('.image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
    }
}

// İlanı kaydet
function saveListing(listing) {
    const listings = JSON.parse(localStorage.getItem('products')) || [];
    listings.push(listing);
    localStorage.setItem('products', JSON.stringify(listings));
}

// Başarı mesajı göster
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const container = document.querySelector('.form-container');
    container.insertBefore(successDiv, container.firstChild);

    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Fiyat input'unu ayarla
function setupPriceInput() {
    const priceInput = document.getElementById('price');
    if (!priceInput) return;

    priceInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value) {
            value = parseInt(value).toLocaleString('tr-TR');
        }
        e.target.value = value;
    });
}

// Fiyat formatla
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fiyat input alanını ayarla
const priceInput = document.querySelector('input[name="price"]');
if (priceInput) {
    priceInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (value) {
            value = parseInt(value);
            e.target.value = formatPrice(value);
        }
    });
} 