// تحميل القائمة من ملف JSON
async function loadMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    try {
        console.log('جاري تحميل المنيو...');

        const response = await fetch('./data/menu.json');

        if (!response.ok) {
            throw new Error(`فشل التحميل - status: ${response.status}`);
        }

        const data = await response.json();
        console.log('تم تحميل البيانات بنجاح');

        // عرض القائمة
        container.innerHTML = data.restaurant.categories.map(category => `
            <div class="category-block">
                <h3 class="category-title">${category.name}</h3>
                <div class="items-grid">
                    ${category.items.map(item => `
                        <div class="menu-item-card">
                            <div class="menu-item-info">
                                <h4>${item.name}</h4>
                                <p>${item.description || ''}</p>
                            </div>
                            <div class="menu-item-price">${item.price} ₪</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('خطأ:', error);
        container.innerHTML = `<div class="loading">❌ خطأ في تحميل القائمة<br><small>${error.message}</small><br><br>تأكد من تشغيل Live Server</div>`;
    }
}

// ========== شاشة التحميل (Splash Screen) ==========
function hideSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');

    if (splash && mainContent) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                mainContent.classList.add('visible');
            }, 800);
        }, 2000);
    }
}

// تشغيل التحميل عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log('الصفحة جاهزة');

    // تشغيل شاشة التحميل
    hideSplashScreen();

    // تحميل المنيو إذا كنا في صفحة menu.html
    if (document.getElementById('menu-container')) {
        loadMenu();
    }
});