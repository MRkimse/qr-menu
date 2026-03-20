let allItems = [];
let allCategories = [];
let currentCategory = 'all';
let searchQuery = '';

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const categoryNav = document.getElementById('category-nav').querySelector('.category-nav-inner');
const menuContainer = document.getElementById('menu-container');
const noResult = document.getElementById('no-result');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

const savedTheme = localStorage.getItem('qr-menu-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('qr-menu-theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

const saved = localStorage.getItem('qr_menu_data');
const data = saved ? JSON.parse(saved) : MENU_DATA;
allItems = data.items;
allCategories = data.categories;
initRestaurant(data.restaurant);
initCategories(data.categories);
render();

function initRestaurant(r) {
  document.getElementById('restaurant-logo').src = r.logo;
  document.getElementById('restaurant-logo').alt = r.name;
  document.getElementById('restaurant-name').textContent = r.name;
  document.getElementById('restaurant-tagline').textContent = r.tagline;
  document.getElementById('restaurant-hours').textContent = '🕐 ' + r.hours;
  document.getElementById('restaurant-phone').textContent = r.phone;
  document.getElementById('footer-text').textContent = r.name + ' — ' + r.address;
  document.title = r.name + ' | Menü';
}

function initCategories(categories) {
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.dataset.category = cat.id;
    btn.textContent = cat.icon + ' ' + cat.name;
    btn.addEventListener('click', () => setCategory(cat.id, btn));
    categoryNav.appendChild(btn);
  });
}

function setCategory(id, btn) {
  currentCategory = id;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  render();
}

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle('visible', searchQuery.length > 0);
  render();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.classList.remove('visible');
  searchInput.focus();
  render();
});

function getFiltered() {
  return allItems.filter(item => {
    const matchCat = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function render() {
  const filtered = getFiltered();
  menuContainer.innerHTML = '';

  if (filtered.length === 0) {
    noResult.classList.remove('hidden');
    return;
  }
  noResult.classList.add('hidden');

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  const categoryOrder = allCategories.map(c => c.id);
  const sortedKeys = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  sortedKeys.forEach((catId, i) => {
    const catMeta = allCategories.find(c => c.id === catId);
    const section = document.createElement('div');
    section.className = 'category-section';
    section.style.animationDelay = (i * 0.06) + 's';

    const title = document.createElement('div');
    title.className = 'category-title';
    title.innerHTML = `<div class="cat-icon">${catMeta ? catMeta.icon : ''}</div>${catMeta ? catMeta.name : catId}`;
    section.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'items-grid';

    grouped[catId].forEach((item, j) => {
      const card = createCard(item, j);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    menuContainer.appendChild(section);
  });
}

function createCard(item, index) {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.style.animationDelay = (index * 0.05) + 's';

  card.innerHTML = `
    <div class="item-img-wrap">
      <img class="item-img" src="${item.image}" alt="${item.name}" loading="lazy" />
      ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ''}
    </div>
    <div class="item-body">
      <div class="item-name">${item.name}</div>
      <div class="item-desc">${item.description}</div>
      <div class="item-price">${item.price} ₺</div>
    </div>
  `;

  card.addEventListener('click', () => openModal(item));
  return card;
}

function openModal(item) {
  document.getElementById('modal-img').src = item.image;
  document.getElementById('modal-img').alt = item.name;
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-desc').textContent = item.description;
  document.getElementById('modal-price').textContent = item.price + ' ₺';
  const badge = document.getElementById('modal-badge');
  if (item.badge) {
    badge.textContent = item.badge;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

document.querySelector('.cat-btn[data-category="all"]').addEventListener('click', function () {
  setCategory('all', this);
});

const qrBtn = document.getElementById('qr-btn');
const qrModalOverlay = document.getElementById('qr-modal-overlay');
const qrModalClose = document.getElementById('qr-modal-close');
const qrCodeBox = document.getElementById('qr-code-box');
const qrModalUrl = document.getElementById('qr-modal-url');
const qrDownloadBtn = document.getElementById('qr-download-btn');

let qrGenerated = false;

function openQrModal() {
  const url = location.href;
  qrModalUrl.textContent = url;

  if (!qrGenerated) {
    qrCodeBox.innerHTML = '';
    new QRCode(qrCodeBox, {
      text: url,
      width: 200,
      height: 200,
      colorDark: '#1a1008',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    qrGenerated = true;
  }

  qrModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQrModal() {
  qrModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

qrBtn.addEventListener('click', openQrModal);
qrModalClose.addEventListener('click', closeQrModal);
qrModalOverlay.addEventListener('click', e => { if (e.target === qrModalOverlay) closeQrModal(); });

qrDownloadBtn.addEventListener('click', () => {
  const canvas = qrCodeBox.querySelector('canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = 'menu-qr.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
