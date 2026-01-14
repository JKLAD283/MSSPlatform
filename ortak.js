// === ORTAK İŞLEVLER ===
document.addEventListener('DOMContentLoaded', () => {
  const isPremium = localStorage.getItem('isPremium') === 'true';
  const body = document.body;

  // Premium ve tema ayarları
  if (isPremium) body.classList.add('premium-active');
  else body.classList.remove('premium-active');

  const savedMode = localStorage.getItem('themeMode') || 'light';
  body.className = `${savedMode}-mode ${isPremium ? 'premium-active' : ''}`;

  if (document.getElementById('mode')) {
    const modeSelector = document.getElementById('mode');
    modeSelector.value = savedMode;
    modeSelector.addEventListener('change', (e) => {
      const selectedMode = e.target.value;
      body.className = `${selectedMode}-mode ${isPremium ? 'premium-active' : ''}`;
      localStorage.setItem('themeMode', selectedMode);
    });
  }

  if (document.getElementById('premiumButtonContainer')) {
    updatePremiumButton(isPremium);
  }

  // === REKLAM MANTIĞI ===
  const fullscreenAd = document.getElementById('fullscreenAd');
  const closeAdBtn = document.getElementById('closeAdBtn');
  const AD_INTERVAL = 30000; // 30 saniye

  // Ücretsiz rastgele servisler
  const RANDOM_IMAGE_API = 'https://picsum.photos/1920/1080'; // Tam ekran görsel
  const RANDOM_LINK_SOURCES = [
    'https://www.google.com/search?q=rastgele+ürün',
    'https://www.bing.com/discover',
    'https://unsplash.com',
    'https://www.wikipedia.org/wiki/Special:Random',
    'https://www.youtube.com/results?search_query=popüler+videolar'
  ];

  if (!isPremium && fullscreenAd && closeAdBtn) {
    showRandomWebAd();
    setInterval(showRandomWebAd, AD_INTERVAL);

    closeAdBtn.addEventListener('click', () => {
      fullscreenAd.style.display = 'none';
    });
  }

  // İnternetten rastgele reklam gösteren fonksiyon
  function showRandomWebAd() {
    const fullscreenAd = document.getElementById('fullscreenAd');
    const closeAdBtn = document.getElementById('closeAdBtn');

    // Rastgele bağlantı seç
    const randomLink = RANDOM_LINK_SOURCES[Math.floor(Math.random() * RANDOM_LINK_SOURCES.length)];
    // Rastgele görsel - her seferinde farklı olur (picsum.photos otomatik rastgele gönderir)
    const randomImage = `${RANDOM_IMAGE_API}?random=${Date.now()}`; // Benzersizlik için zaman damgası

    // Reklam içeriğini güncelle
    fullscreenAd.innerHTML = `
      <a href="${randomLink}" target="_blank" rel="noopener noreferrer">
        <img src="${randomImage}" alt="Rastgele Reklam Görseli" id="adFullImage">
      </a>
      <button id="closeAdBtn">&times;</button>
    `;

    // Kapatma butonu ayarları
    const yeniCloseBtn = fullscreenAd.querySelector('#closeAdBtn');
    yeniCloseBtn.addEventListener('click', () => {
      fullscreenAd.style.display = 'none';
    });

    // Reklamı göster
    fullscreenAd.style.display = 'flex';
    yeniCloseBtn.classList.remove('visible');
    setTimeout(() => {
      yeniCloseBtn.classList.add('visible');
    }, 5000);
  }
});

// Diğer fonksiyonlar aynı kalır
function updatePremiumButton(isActive) {
  const premiumButtonContainer = document.getElementById('premiumButtonContainer');
  premiumButtonContainer.innerHTML = '';
  const newButton = document.createElement('button');
  newButton.className = 'my-button';
  newButton.onclick = togglePremium;
  newButton.textContent = isActive ? 'Premium modu iptal et' : 'Premium moda geç';
  premiumButtonContainer.appendChild(newButton);
}

function togglePremium() {
  const currentIsPremium = localStorage.getItem('isPremium') === 'true';
  const newIsPremium = !currentIsPremium;
  localStorage.setItem('isPremium', newIsPremium);
  
  if (newIsPremium) window.location.href = 'premium.html';
  else window.location.reload();
}
