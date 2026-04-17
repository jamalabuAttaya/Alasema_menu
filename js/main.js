// ========== 1. تحميل القائمة من ملف JSON ==========
async function loadMenu() {
    const container = document.getElementById('menu-container');
    
    // إذا لم يجد الحاوية (يعني نحن لست في صفحة المنيو)، يخرج من الدالة فوراً ولا يكمل
    if (!container) return; 

    try {
        console.log('جاري تحميل المنيو...');
        const response = await fetch('./data/menu.json');

        if (!response.ok) {
            throw new Error(`فشل التحميل - status: ${response.status}`);
        }

        const data = await response.json();

        // عرض القائمة
        container.innerHTML = data.restaurant.categories.map(category => `
            <div class="category-block">
                <h3 class="category-title">${category.name}</h3>
                <div class="items-grid">
                    ${category.items.map(item => `
                        <div class="menu-item-card" onclick="openFoodModal('${item.name}', '${item.image || 'assets/images/default.jpg'}')">
                            <div class="menu-item-info">
                                <h4>${item.name}</h4>
                            </div>
                            <div class="menu-item-price">${item.price} ₪</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        if (data.restaurant.note) {
            container.innerHTML += `<div class="menu-note-display"><p>📌 ${data.restaurant.note}</p></div>`;
        }

        // إنشاء الـ Modal الخاص بالصور
        createFoodModal();

    } catch (error) {
        console.error('خطأ:', error);
        container.innerHTML = `<div class="loading">❌ خطأ في تحميل القائمة</div>`;
    }
}

// ========== 2. نافذة عرض الصور (Modal) ==========
function createFoodModal() {
    if (document.getElementById('food-modal')) return;
    const modalHTML = `
        <div id="food-modal" class="food-modal" onclick="closeFoodModal()">
            <div class="modal-body" onclick="event.stopPropagation()">
                <span class="close-modal-btn" onclick="closeFoodModal()">&times;</span>
                <img id="modal-image" src="" alt="">
                <h3 id="modal-name"></h3>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openFoodModal(name, imageSrc) {
    const modal = document.getElementById('food-modal');
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal-name').innerText = name;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeFoodModal() {
    const modal = document.getElementById('food-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

// ========== 3. شاشة التحميل (Splash Screen) ==========
function hideSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');

    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                if (mainContent) mainContent.classList.add('visible');
            }, 800);
        }, 2000);
    }
}

// ========== 4. تشغيل الأكواد عند الجاهزية ==========
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل شاشة التحميل في كل الصفحات
    hideSplashScreen();

    // تشغيل المنيو فقط إذا كانت الحاوية موجودة (في صفحة menu.html)
    if (document.getElementById('menu-container')) {
        loadMenu();
    }
});