import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Ganti dengan konfigurasi Firebase dari Console Anda
const firebaseConfig = {
  apiKey: "AIzaSyD7HjnejYp_1-a0aBR7Tq4lbSid8M3Tu3U",
  authDomain: "toko-online-55257.firebaseapp.com",
  projectId: "toko-online-55257",
  storageBucket: "toko-online-55257.firebasestorage.app",
  messagingSenderId: "153434049866",
  appId: "1:153434049866:web:396b623f96dc44a17745b3"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productContainer = document.getElementById('product-container');

async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productContainer.innerHTML = ''; // Hapus teks loading
        
        if (querySnapshot.empty) {
            productContainer.innerHTML = '<p>Belum ada produk tersedia.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = document.createElement('div');
            productCard.className = 'card';
            
            productCard.innerHTML = `
                <img src="${product.imageUrl || 'https://via.placeholder.com/200'}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price ? product.price.toLocaleString('id-ID') : '0'}</p>
                <button onclick="addToCart('${doc.id}')">Tambah ke Keranjang</button>
            `;
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error mengambil dokumen: ", error);
        productContainer.innerHTML = '<p>Gagal memuat produk. Periksa koneksi atau aturan Firebase.</p>';
    }
}

// Fungsi dummy untuk tombol keranjang
window.addToCart = (productId) => {
    alert(`Produk ${productId} berhasil ditambahkan!`);
}

// Jalankan fungsi saat halaman dimuat
fetchProducts();