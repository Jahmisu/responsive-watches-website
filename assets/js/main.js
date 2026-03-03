/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Show menu */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Hide menu */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // Add the .scroll-header class if the bottom scroll of the viewport is greater than 50
    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

// Link the ID of each section (section id="home") to each link (a href="#home") 
// and activate the link with the class .active-link
const scrollActive = () => {
    // We get the position by scrolling down
    const scrollY = window.scrollY

    sections.forEach(section => {
        const id = section.id, // id of each section
            top = section.offsetTop - 50, // Distance from the top edge
            height = section.offsetHeight, // Element height
            link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

        if (!link) return

        link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
    cartShop = document.getElementById('cart-shop'),
    cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if (cartShop) {
    cartShop.addEventListener('click', () => {
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if (cartClose) {
    cartClose.addEventListener('click', () => {
        cart.classList.remove('show-cart')
    })
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SIMPLE CART LOGIC ===============*/
// Maintains items in cart by name
const cartData = new Map();

const cartContainer = document.querySelector('.cart__container');
const cartItemsCount = document.querySelector('.cart__prices-item');
const cartTotalPrice = document.querySelector('.cart__prices-total');

function formatPrice(num) {
    return `₱${num.toLocaleString()}`;
}

function updateCartTotals() {
    let items = 0;
    let total = 0;
    cartData.forEach(({ quantity, price }) => {
        items += quantity;
        total += price * quantity;
    });
    cartItemsCount.textContent = `${items} item${items !== 1 ? 's' : ''}`;
    cartTotalPrice.textContent = formatPrice(total);
}

function createCartCard(name, price, imgSrc = '') {
    const article = document.createElement('article');
    article.className = 'cart__card';
    article.dataset.name = name;

    article.innerHTML = `
        <div class="cart__box">
            <img src="${imgSrc}" alt="${name}" class="cart__img">
        </div>

        <div class="cart__details">
            <h3 class="cart__title">${name}</h3>
            <span class="cart__price">${formatPrice(price)}</span>

            <div class="cart__amount">
                <div class="cart__amount-content">
                    <span class="cart__amount-box minus">
                        <i class='bx bx-minus' ></i>
                    </span>

                    <span class="cart__amount-number">1</span>

                    <span class="cart__amount-box plus">
                        <i class='bx bx-plus' ></i>
                    </span>
                </div>

                <i class='bx bx-trash-alt cart__amount-trash' ></i>
            </div>
        </div>`;

    return article;
}

function addOrIncrementItem(name, price, imgSrc = '') {
    if (cartData.has(name)) {
        const item = cartData.get(name);
        item.quantity += 1;
        // update DOM quantity
        const card = cartContainer.querySelector(`article[data-name=\"${name}\"]`);
        card.querySelector('.cart__amount-number').textContent = item.quantity;
    } else {
        cartData.set(name, { price, quantity: 1 });
        const card = createCartCard(name, price, imgSrc);
        cartContainer.appendChild(card);
    }
    updateCartTotals();
}

// listen to product add buttons
function handleAddButtons(selector, priceSelector, nameSelector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('article');
            const priceEl = card.querySelector(priceSelector);
            const nameEl = card.querySelector(nameSelector);
            const imgEl = card.querySelector('img');
            if (priceEl && nameEl) {
                const priceText = priceEl.textContent.replace(/[^0-9]/g, '');
                const price = parseInt(priceText, 10);
                const name = nameEl.textContent.trim();
                const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
                addOrIncrementItem(name, price, imgSrc);
            }
        });
    });
}

// apply to featured, products, new
handleAddButtons('.featured__button', '.featured__price', '.featured__title');
handleAddButtons('.products__button', '.products__price', '.products__title');
handleAddButtons('.new__button', '.new__price', '.new__title');

// event delegation for cart container
cartContainer.addEventListener('click', (e) => {
    const target = e.target;
    const card = target.closest('article.cart__card');
    if (!card) return;
    const name = card.dataset.name;
    const item = cartData.get(name);
    if (!item) return;

    if (target.closest('.minus')) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            card.querySelector('.cart__amount-number').textContent = item.quantity;
            updateCartTotals();
        }
    }
    else if (target.closest('.plus')) {
        item.quantity += 1;
        card.querySelector('.cart__amount-number').textContent = item.quantity;
        updateCartTotals();
    }
    else if (target.closest('.cart__amount-trash')) {
        cartData.delete(name);
        card.remove();
        updateCartTotals();
    }
});

// initialize counts if static items exist
updateCartTotals();

/*=============== CHECKOUT FLOW ===============*/
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        showModal(checkoutModal);
    });
}

// clicking outside modal content closes it
checkoutModal && checkoutModal.addEventListener('click', e => {
    if (e.target === checkoutModal) {
        hideModal(checkoutModal);
    }
});

// utility to hide/show with transition
function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function showModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);
}

checkoutForm && checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    // close the form modal
    hideModal(checkoutModal);
    // show success alert immediately
    Swal.fire({
        title: 'Successfully purchased!',
        text: 'Thank you for purchasing.',
        icon: 'success',
    }).then(() => {
        cartData.clear();
        cartContainer.innerHTML = '';
        updateCartTotals();
        window.location.hash = '#home';
    });
});
