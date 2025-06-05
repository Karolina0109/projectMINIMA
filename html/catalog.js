        // Данные товаров
        const products = [
            { id: 1, name: "Диван «Бруклин»", price: 100900, image: "Фото/ДиванБруклин.jpg", category: "sofa" },
            { id: 2, name: "Тумба «Брик»", price: 28900, image: "Фото/ТумбаБрик.jpg", category: "storage" },
            { id: 3, name: "Кровать «Нора»", price: 105000, image: "Фото/КроватьНора.jpg", category: "bed" },
            { id: 4, name: "Столик «Рикки»", price: 62000, image: "Фото/СтолРикки.jpg", category: "table" },
            { id: 5, name: "Диван «Минор»", price: 89990, image: "Фото/ДиванМинор.jpg", category: "sofa" },
            { id: 6, name: "Кресло «Перо»", price: 78000, image: "Фото/КреслоПеро.jpg", category: "chair" },
            { id: 7, name: "Тумба «Шоколад»", price: 15990, image: "Фото/ТумбаШоколад.jpg", category: "storage" },
            { id: 8, name: "Стол «Скай»", price: 24500, image: "Фото/СтолСкай.jpg", category: "table" },
            { id: 9, name: "Кровать «Облако»", price: 135000, image: "Фото/КроватьОблако.jpg", category: "bed" },
            { id: 10, name: "Стол «Токио»", price: 58000, image: "Фото/СтолТокио.jpg", category: "table" },
            { id: 11, name: "Диван «Косандра»", price: 32000, image: "Фото/ДиванКосандра.jpg", category: "sofa" },
            { id: 12, name: "Кресло «Эго»", price: 67000, image: "Фото/КреслоЭго.jpg", category: "chair" }
        ];

        // Функция для рендеринга товаров
        function renderProducts(productsToRender) {
            const catalogGrid = document.getElementById('catalogGrid');
            catalogGrid.innerHTML = '';
            
            productsToRender.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'catalog-item';
                productElement.innerHTML = `
                    <div class="catalog-image">
                        <img src="${product.image}" alt="${product.name}">
                        <button class="wishlist-button" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="catalog-info">
                        <h3>${product.name}</h3>
                        <p class="catalog-price">${product.price.toLocaleString()} ₽</p>
                        <button class="catalog-buy-button" data-id="${product.id}">В корзину</button>
                    </div>
                `;
                
                catalogGrid.appendChild(productElement);
            });
            
            // Добавляем обработчики для кнопок избранного
            document.querySelectorAll('.wishlist-button').forEach(button => {
                button.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        this.classList.add('active');
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        this.classList.remove('active');
                    }
                });
            });
            
            // Добавляем обработчики для кнопок "В корзину"
            document.querySelectorAll('.catalog-buy-button').forEach(button => {
                button.addEventListener('click', function() {
                    // Анимация добавления
                    this.textContent = 'Добавлено!';
                    setTimeout(() => {
                        this.textContent = 'В корзину';
                    }, 1000);
                });
            });
        }
        
        // Функция сортировки
        function sortProducts(order) {
            const sortedProducts = [...products];
            
            if (order === 'asc') {
                sortedProducts.sort((a, b) => a.price - b.price);
                document.getElementById('sortAsc').classList.add('active');
                document.getElementById('sortDesc').classList.remove('active');
            } else if (order === 'desc') {
                sortedProducts.sort((a, b) => b.price - a.price);
                document.getElementById('sortDesc').classList.add('active');
                document.getElementById('sortAsc').classList.remove('active');
            }
            
            renderProducts(sortedProducts);
        }
        
        // Функция фильтрации по категории
        function filterProducts() {
            const category = document.getElementById('categoryFilter').value;
            
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                renderProducts(filteredProducts);
            }
        }
        
        // Функции для работы с всплывающими окнами
        function openPopup(popupId) {
            const popup = document.getElementById(popupId);
            const overlay = document.getElementById('overlay');
            
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }
        
        function closePopup(popupId) {
            const popup = document.getElementById(popupId);
            const overlay = document.getElementById('overlay');
            
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
        
        // Инициализация страницы
        document.addEventListener('DOMContentLoaded', function() {
            // Рендерим товары при загрузке
            renderProducts(products);
            
            // Добавляем обработчики для кнопок сортировки
            document.getElementById('sortAsc').addEventListener('click', () => sortProducts('asc'));
            document.getElementById('sortDesc').addEventListener('click', () => sortProducts('desc'));
            
            // Добавляем обработчик для фильтра по категории
            document.getElementById('categoryFilter').addEventListener('change', filterProducts);
            
            // Обработчики для иконок в навигации
            document.getElementById('cartButton').addEventListener('click', () => openPopup('cartPopup'));
            document.getElementById('wishlistButton').addEventListener('click', () => openPopup('wishlistPopup'));
            document.getElementById('accountButton').addEventListener('click', () => openPopup('accountPopup'));
            
            // Обработчики для закрытия окон
            document.getElementById('closeCart').addEventListener('click', () => closePopup('cartPopup'));
            document.getElementById('closeWishlist').addEventListener('click', () => closePopup('wishlistPopup'));
            document.getElementById('closeAccount').addEventListener('click', () => closePopup('accountPopup'));
            document.getElementById('overlay').addEventListener('click', () => {
                closePopup('cartPopup');
                closePopup('wishlistPopup');
                closePopup('accountPopup');
            });
            
            // Обработчики для кнопок "В корзину" в окне избранного
            document.querySelectorAll('#wishlistPopup .catalog-buy-button').forEach(button => {
                button.addEventListener('click', function() {
                    // Анимация добавления
                    this.textContent = 'Добавлено!';
                    setTimeout(() => {
                        this.textContent = 'В корзину';
                    }, 1000);
                });
            });
            
            // Обработчик для кнопки входа в аккаунт
            document.querySelector('#accountPopup .popup-button').addEventListener('click', function() {
                alert('Форма входа отправлена (демо)');
                closePopup('accountPopup');
            });
        });