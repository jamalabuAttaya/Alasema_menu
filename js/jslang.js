// ========== دعم اللغتين العربية والإنجليزية ==========
const translations = {
    ar: {
        home: "الرئيسية",
        menu: "المنيو",
        about: "عن المطعم",
        gallery: "المعرض",
        contact: "اتصل بنا",
        viewMenu: "استكشف المنيو",
        visitUs: "زورونا",
        featuredDishes: "أطباقنا المميزة",
        missionValues: "رؤيتنا وقيمنا",
        whyChooseUs: "لماذا تختارنا",
        getInTouch: "تواصل معنا",
        quickLinks: "قائمة سريعة",
        socialMedia: "وسائل التواصل",
        location: "الموقع",
        allRightsReserved: "جميع الحقوق محفوظة"
    },
    en: {
        home: "HOME",
        menu: "MENU",
        about: "About",
        gallery: "Gallery",
        contact: "Contact",
        viewMenu: "VIEW MENU",
        visitUs: "VISIT US",
        featuredDishes: "FEATURED DISHES",
        missionValues: "MISSION AND VALUES",
        whyChooseUs: "WHY CHOOSE US",
        getInTouch: "GET IN TOUCH",
        quickLinks: "Quick Links",
        socialMedia: "Social Media",
        location: "Location",
        allRightsReserved: "All Rights Reserved"
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
    document.querySelectorAll('[data-en]').forEach(el => {
        if (lang === 'ar') {
            el.textContent = el.getAttribute('data-ar') || el.textContent;
        } else {
            el.textContent = el.getAttribute('data-en') || el.textContent;
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