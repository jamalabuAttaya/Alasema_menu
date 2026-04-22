// ========== دعم اللغتين العربية والإنجليزية ==========
const translations = {
    ar: {
        home: "الرئيسية",
        menu: "المنيو",
        about: "عن المطعم",
        gallery: "المعرض",
        contact: "اتصل بنا",
        viewMenu: "استكشف المنيو",
        visitUs: "زورونا"
    },
    en: {
        home: "HOME",
        menu: "MENU",
        about: "ABOUT",
        gallery: "GALLERY",
        contact: "CONTACT",
        viewMenu: "VIEW MENU",
        visitUs: "VISIT US"
    }
};

let currentLang = 'ar';

function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث الأزرار النشطة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // تحديث النصوص
    document.querySelectorAll('[data-ar], [data-en]').forEach(el => {
        if (lang === 'ar' && el.hasAttribute('data-ar')) {
            el.textContent = el.getAttribute('data-ar');
        } else if (lang === 'en' && el.hasAttribute('data-en')) {
            el.textContent = el.getAttribute('data-en');
        }
    });
    
    localStorage.setItem('preferred_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred_lang') || 'ar';
    switchLanguage(savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });
});