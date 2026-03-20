const ADMIN_PASSWORD = '1234';
const STORAGE_KEY = 'qr_menu_data';
const SESSION_KEY = 'qr_admin_auth';

const loginScreen  = document.getElementById('login-screen');
const adminScreen  = document.getElementById('admin-screen');
const pwInput      = document.getElementById('pw-input');
const pwToggle     = document.getElementById('pw-toggle');
const loginBtn     = document.getElementById('login-btn');
const loginError   = document.getElementById('login-error');
const logoutBtn    = document.getElementById('logout-btn');
const adminSearch  = document.getElementById('admin-search');
const catFilter    = document.getElementById('cat-filter');
const saveBtn      = document.getElementById('save-btn');
const resetBtn     = document.getElementById('reset-btn');
const itemsTbody   = document.getElementById('items-tbody');
const toast        = document.getElementById('toast');

let menuData = JSON.parse(JSON.stringify(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || MENU_DATA
));

if (sessionStorage.getItem(SESSION_KEY) === 'true') {
  showAdmin();
}

loginBtn.addEventListener('click', tryLogin);
pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

pwToggle.addEventListener('click', () => {
  const isPass = pwInput.type === 'password';
  pwInput.type = isPass ? 'text' : 'password';
  pwToggle.textContent = isPass ? '🙈' : '👁';
});

function tryLogin() {
  if (pwInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    loginError.classList.add('hidden');
    showAdmin();
  } else {
    loginError.classList.remove('hidden');
    pwInput.value = '';
    pwInput.focus();
  }
}

function showAdmin() {
  loginScreen.classList.add('hidden');
  adminScreen.classList.remove('hidden');
  buildCatFilter();
  renderTable();
}

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
});

function buildCatFilter() {
  menuData.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.icon + ' ' + cat.name;
    catFilter.appendChild(opt);
  });
}

adminSearch.addEventListener('input', renderTable);
catFilter.addEventListener('change', renderTable);

function getCatName(id) {
  const c = menuData.categories.find(c => c.id === id);
  return c ? c.icon + ' ' + c.name : id;
}

function renderTable() {
  const q   = adminSearch.value.trim().toLowerCase();
  const cat = catFilter.value;

  const filtered = menuData.items.filter(item => {
    const matchCat    = cat === 'all' || item.category === cat;
    const matchSearch = !q || item.name.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  itemsTbody.innerHTML = '';

  if (filtered.length === 0) {
    itemsTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#a0aec0">Ürün bulunamadı</td></tr>';
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;

    tr.innerHTML = `
      <td>
        <img class="preview-img" src="${item.image}" alt="${item.name}"
             onerror="this.src='https://via.placeholder.com/48x48/e2e8f0/a0aec0?text=?'"
             title="Önizle" />
      </td>
      <td class="td-name">${item.name}</td>
      <td><span class="cat-tag">${getCatName(item.category)}</span></td>
      <td>
        <input class="td-input img-input" type="text" value="${item.image}"
               placeholder="https://..." data-id="${item.id}" data-field="image" />
      </td>
      <td>
        <input class="td-input price-input" type="number" min="0" value="${item.price}"
               data-id="${item.id}" data-field="price" />
      </td>
      <td>
        <input class="td-input badge-input" type="text" value="${item.badge || ''}"
               placeholder="Rozet yok" data-id="${item.id}" data-field="badge" />
      </td>
    `;

    itemsTbody.appendChild(tr);

    const imgInput   = tr.querySelector('.img-input');
    const previewImg = tr.querySelector('.preview-img');

    imgInput.addEventListener('input', () => {
      const val = imgInput.value.trim();
      if (val) previewImg.src = val;
      updateField(item.id, 'image', val);
    });

    tr.querySelector('.price-input').addEventListener('input', e => {
      updateField(item.id, 'price', parseFloat(e.target.value) || 0);
    });

    tr.querySelector('.badge-input').addEventListener('input', e => {
      updateField(item.id, 'badge', e.target.value.trim() || null);
    });

    previewImg.addEventListener('click', () => {
      const url = imgInput.value.trim();
      if (url) window.open(url, '_blank');
    });
  });
}

function updateField(id, field, value) {
  const item = menuData.items.find(i => i.id === id);
  if (item) item[field] = value;
}

saveBtn.addEventListener('click', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
  showToast('Değişiklikler kaydedildi!');
});

resetBtn.addEventListener('click', () => {
  if (!confirm('Tüm değişiklikler sıfırlanacak ve varsayılan menüye dönülecek. Emin misiniz?')) return;
  localStorage.removeItem(STORAGE_KEY);
  menuData = JSON.parse(JSON.stringify(MENU_DATA));
  catFilter.value = 'all';
  adminSearch.value = '';
  renderTable();
  showToast('Menü varsayılana sıfırlandı.');
});

function showToast(msg, isError = false) {
  toast.textContent = msg;
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('hidden'), 3000);
}
