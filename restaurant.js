document.addEventListener("DOMContentLoaded", () => {
    const restaurantDetails = document.getElementById("restaurant-details");
    const menuContainer = document.getElementById("menu-container");

    const renderLoading = () => {
        restaurantDetails.innerHTML = '<div class="loading">Loading restaurant...</div>';
    };

    const renderError = (message) => {
        restaurantDetails.innerHTML = `<div class="error">${message}</div>`;
    };

    const getSlugFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get("slug");
    };

    const renderRestaurantMenu = (restaurant) => {
        // عرض تفاصيل المطعم
        restaurantDetails.innerHTML = `
            <div class="restaurant-header">
                <img src="${restaurant.logo}" alt="${restaurant.name}" class="restaurant-logo-large">
                <h1>${restaurant.name}</h1>
            </div>
        `;

        // عرض الفئات والأصناف
        if (!restaurant.categories || restaurant.categories.length === 0) {
            menuContainer.innerHTML = '<div class="error">No menu items found.</div>';
            return;
        }

        menuContainer.innerHTML = restaurant.categories.map(category => `
            <div class="category-section">
                <h2 class="category-title">${category.name}</h2>
                <div class="items-grid">
                    ${category.items.map(item => `
                        <div class="menu-item">
                            <img src="${item.image}" alt="${item.name}" class="menu-item-image" loading="lazy">
                            <div class="menu-item-details">
                                <h3 class="menu-item-name">${item.name}</h3>
                                <p class="menu-item-price">$${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    };

    const fetchRestaurant = async () => {
        const slug = getSlugFromURL();

        if (!slug) {
            renderError("No restaurant selected.");
            return;
        }

        renderLoading();

        try {
            const response = await fetch("data/restaurants.json");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.restaurants) {
                throw new Error("Invalid data format");
            }

            const restaurant = data.restaurants.find(r => r.slug === slug);

            if (!restaurant) {
                throw new Error("Restaurant not found");
            }

            renderRestaurantMenu(restaurant);
        } catch (error) {
            console.error("Failed to load restaurant:", error);
            renderError("Unable to load menu. Please try again later.");
        }
    };

    fetchRestaurant();
});