// Hapus semua konfigurasi Supabase. Kita gunakan data lokal (pura-pura).

let currentUser = null; // Menyimpan status login
let authMode = "login";
let selectedMaker = null;

// 1. DATA PENJAHIT SEDERHANA (Bisa kamu tambah/edit sendiri di sini)
const dummyMakers = [
  { id: '1', name: 'Budi Tailor', city: 'Bandung', specialty: 'Denim & Permak', styles: ['Upcycle', 'Denim'], starting_price: 50000, rating: 4.8, review_count: 24, bio: 'Spesialis mengubah celana jeans lamamu jadi jaket keren.', emoji: '👖' },
  { id: '2', name: 'Siska Studio', city: 'Jakarta', specialty: 'Gaun Pesta', styles: ['Formal', 'Custom'], starting_price: 250000, rating: 4.9, review_count: 51, bio: 'Ubah baju lama menjadi gaun elegan untuk acara spesial.', emoji: '👗' },
  { id: '3', name: 'Tono Reworks', city: 'Surabaya', specialty: 'Kasual', styles: ['Casual', 'Upcycle'], starting_price: 75000, rating: 4.5, review_count: 12, bio: 'Gaya kasual sehari-hari dari kemeja bekas.', emoji: '👕' }
];

// Data pesanan pura-pura untuk ditampilkan di halaman "Pesanan"
let myOrders = [];

function toast(t) {
  const x = document.getElementById("toast");
  x.textContent = t; x.classList.add("show");
  clearTimeout(window.__t);
  window.__t = setTimeout(() => x.classList.remove("show"), 2500);
}

function idr(n) { return new Intl.NumberFormat("id-ID").format(n || 0); }
function go(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }
window.go = go;
window.closeModal = id => document.getElementById(id).classList.add("hidden");
window.openAuth = () => document.getElementById("authModal").classList.remove("hidden");

window.toggleAuthMode = () => {
  authMode = authMode === "login" ? "signup" : "login";
  document.getElementById("authTitle").textContent = authMode === "login" ? "Masuk" : "Daftar";
  document.querySelectorAll(".signupOnly").forEach(x => x.classList.toggle("hidden", authMode === "login"));
  document.getElementById("authSwitch").textContent = authMode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk";
};

// 2. LOGIN PURA-PURA
window.submitAuth = () => {
  const email = document.getElementById("email").value;
  if (!email) return toast("Isi email terlebih dahulu (bebas apa saja).");
  
  // Set user pura-pura
  currentUser = {
    name: document.getElementById("fullName").value || "Pengguna Demo",
    role: document.getElementById("role").value || "customer"
  };
  
  closeModal("authModal");
  toast("Berhasil masuk!");
  refreshUserUI();
};

function refreshUserUI() {
  const authArea = document.getElementById("authArea");
  if (!currentUser) {
    authArea.innerHTML = '<button class="btn outline" onclick="openAuth()">Masuk / Daftar</button>';
  } else {
    authArea.innerHTML = `<button class="btn outline" onclick="signOut()">Keluar (${currentUser.name})</button>`;
  }
  loadOrders();
}

window.signOut = () => {
  currentUser = null;
  toast("Kamu sudah keluar.");
  refreshUserUI();
};

// 3. TAMPILKAN DATA PENJAHIT DARI ARRAY LOKAL
window.loadMakers = () => {
  const wrap = document.getElementById("makers");
  const q = document.getElementById("search").value.toLowerCase();
  
  const filtered = dummyMakers.filter(m => m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q));
  
  wrap.innerHTML = filtered.length ? filtered.map(m => `
    <article class="card">
      <div class="card-cover">${m.emoji}</div>
      <div class="card-body">
        <div class="card-top">
          <h3>${m.name}</h3><span class="rating">★ ${m.rating}</span>
        </div>
        <div class="meta">${m.city} · ${m.review_count} ulasan · ${m.specialty}</div>
        <div class="tags">${m.styles.map(x => `<span class="tag">${x}</span>`).join("")}</div>
        <div class="price">Mulai Rp${idr(m.starting_price)}</div>
        <button class="btn primary" onclick="openMaker('${m.id}')">Lihat profil</button>
      </div>
    </article>`).join("") : '<div class="empty" style="grid-column:1/-1">Tidak ditemukan.</div>';
};

window.openMaker = id => {
  selectedMaker = dummyMakers.find(m => m.id === id);
  document.getElementById("makerDetail").innerHTML = `
    <div class="detail-grid">
      <div class="detail-cover">${selectedMaker.emoji}</div>
      <div>
        <small class="eyebrow">${selectedMaker.city}</small>
        <h2>${selectedMaker.name}</h2>
        <p><strong>★ ${selectedMaker.rating}</strong> · ${selectedMaker.review_count} ulasan</p>
        <p>${selectedMaker.bio}</p>
        <p><strong>Mulai Rp${idr(selectedMaker.starting_price)}</strong></p>
        <button class="btn primary wide" onclick="openOrder()">Ajukan pesanan</button>
      </div>
    </div>`;
  document.getElementById("makerModal").classList.remove("hidden");
};

window.openOrder = () => {
  if (!currentUser) return openAuth();
  closeModal("makerModal");
  document.getElementById("orderMaker").textContent = `Pengrajin: ${selectedMaker.name}`;
  document.getElementById("orderModal").classList.remove("hidden");
};

// 4. BUAT PESANAN PURA-PURA
window.submitOrder = () => {
  const service = document.getElementById("service").value;
  if (!service) return toast("Isi jenis layanan.");
  
  // Simpan ke array lokal
  myOrders.push({
    makerName: selectedMaker.name,
    service: service,
    status: "Diterima",
    date: new Date().toLocaleDateString("id-ID")
  });
  
  closeModal("orderModal");
  toast("Pesanan berhasil dikirim (Demo)!");
  loadOrders();
  go("orders");
};

function loadOrders() {
  const list = document.getElementById("ordersList");
  if (!currentUser) {
    list.innerHTML = '<div class="empty">Silakan masuk untuk melihat pesanan.</div>';
    return;
  }
  
  list.innerHTML = myOrders.length ? myOrders.map(o => `
    <article class="order">
      <div class="order-head">
        <div>
          <strong>${o.service}</strong>
          <div class="meta">${o.makerName} · ${o.date}</div>
        </div>
        <span class="status">${o.status}</span>
      </div>
    </article>`).join("") : '<div class="empty">Belum ada pesanan.</div>';
}

// Inisialisasi awal
refreshUserUI();
loadMakers();