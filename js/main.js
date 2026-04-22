// ========== شاشة التحميل ==========
function hideSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                if (mainContent) mainContent.classList.add('visible');
            }, 500);
        }, 2000);
    }
}

// ========== القائمة المتنقلة ==========
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
            });
        });
    }
}

// ========== تحميل المنيو من JSON ==========
async function loadMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return;
    
    try {
        const response = await fetch('./data/menu.json');
        if (!response.ok) throw new Error('فشل التحميل');
        
        const data = await response.json();
        
        container.innerHTML = data.restaurant.categories.map(category => `
            <div class="category-block">
                <h3 class="category-title">${category.name}</h3>
                <div class="items-grid">
                    ${category.items.map(item => `
                        <div class="menu-item-card" onclick='openFoodModal(${JSON.stringify({
                            name: item.name,
                            price: typeof item.price === 'number' ? item.price + ' ₪' : item.price + ' ₪',
                            image: item.image || 'assets/images/placeholder.jpg'
                        })})'>
                            <div class="menu-item-info">
                                <h4>${item.name}</h4>
                            </div>
                            <div class="menu-item-price">${typeof item.price === 'number' ? item.price + ' ₪' : item.price + ' ₪'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        if (data.restaurant.note) {
            container.innerHTML += `<div class="menu-note-display"><p>📌 ${data.restaurant.note}</p></div>`;
        }
        
        createFoodModal();
    } catch (error) {
        console.error('خطأ:', error);
        container.innerHTML = '<div class="loading-spinner"><p style="color:red;">❌ خطأ في تحميل القائمة</p></div>';
    }
}

// ========== نافذة عرض الطعام ==========
function createFoodModal() {
    if (document.getElementById('food-modal')) return;
    
    const modalHTML = `
        <div id="food-modal" class="gallery-modal" onclick="closeFoodModal()">
            <div class="gallery-modal-content" onclick="event.stopPropagation()">
                <span class="gallery-modal-close" onclick="closeFoodModal()">&times;</span>
                <img id="modal-image" src="" alt="صورة الوجبة" onerror="this.src='assets/images/placeholder.jpg'">
                <div class="gallery-modal-info">
                    <h3 id="modal-name"></h3>
                    <div class="gallery-modal-price" id="modal-price"></div>
                    <a href="https://wa.me/+970594804807" class="gallery-order-btn">
                        <i class="fab fa-whatsapp"></i> اطلب عبر واتساب
                    </a>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openFoodModal(item) {
    const modal = document.getElementById('food-modal');
    if (!modal) return;
    
    document.getElementById('modal-image').src = item.image;
    document.getElementById('modal-name').innerText = item.name;
    document.getElementById('modal-price').innerText = item.price;
    modal.style.display = 'flex';
}

function closeFoodModal() {
    const modal = document.getElementById('food-modal');
    if (modal) modal.style.display = 'none';
}

// ========== معرض الصور ==========
const galleryItems = [
    { title: "Wagyu Ribeye Steak", desc: "مخازن لحم ريبو في كوفيد", price: "₪65.00", img: "assets/images/gallery-1.jpg" },
    { title: "Grilled Lamb Chops", desc: "كلهل ليفر بومي", price: "₪65.00", img: "assets/images/gallery-2.jpg" },
    { title: "Mediterranean Meshwi", desc: "الذي أفرز", price: "₪65.00", img: "assets/images/gallery-3.jpg" },
    { title: "Truffle Wagyu Burger", desc: "طبق بريجا وورغو", price: "₪65.00", img: "assets/images/gallery-4.jpg" }
];

function loadGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;
    
    container.innerHTML = galleryItems.map((item, index) => `
        <div class="gallery-item" onclick="openGalleryModal(${index})">
            <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.price}</p>
            </div>
        </div>
    `).join('');
}

function openGalleryModal(index) {
    const modal = document.getElementById('gallery-modal');
    const img = document.getElementById('gallery-modal-img');
    const title = document.getElementById('gallery-modal-title');
    const desc = document.getElementById('gallery-modal-desc');
    const price = document.getElementById('gallery-modal-price');
    
    if (modal && galleryItems[index]) {
        img.src = galleryItems[index].img;
        title.textContent = galleryItems[index].title;
        desc.textContent = galleryItems[index].desc;
        price.textContent = galleryItems[index].price;
        modal.style.display = 'flex';
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) modal.style.display = 'none';
}

// ========== نموذج الاتصال ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✓ تم استلام رسالتك! سنتواصل معك قريباً');
            form.reset();
        });
    }
}

// ========== إغلاق النوافذ المنبثقة ==========
function initModals() {
    // إغلاق نافذة المعرض
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryBtn = document.querySelector('.gallery-modal-close');
    
    if (galleryModal && closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', closeGalleryModal);
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) closeGalleryModal();
        });
    }
}

// ========== التهيئة ==========
document.addEventListener('DOMContentLoaded', () => {
    hideSplashScreen();
    initMobileMenu();
    initContactForm();
    initModals();
    loadMenu();
    loadGallery();
    
    // تحديث روابط التيك توك (يمكنك إضافة الروابط لاحقاً)
    const tiktokLinks = document.querySelectorAll('#tiktok-link, #tiktok-link-footer, #tiktok-contact');
    tiktokLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // يمكنك وضع رابط التيك توك هنا
            window.open('https://www.tiktok.com/@yourusername', '_blank');
        });
    });
});