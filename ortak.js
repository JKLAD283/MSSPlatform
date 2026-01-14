// === ORTAK İŞLEVLER ===
document.addEventListener('DOMContentLoaded', () => {
  const isPremium = localStorage.getItem('isPremium') === 'true';
  const body = document.body;

  // Premium durumu için body sınıfı ekle
  if (isPremium) {
    body.classList.add('premium-active');
  } else {
    body.classList.remove('premium-active');
  }

  // Tema ayarlarını uygula (settings.html dışındaki sayfalarda da çalışır)
  const savedMode = localStorage.getItem('themeMode') || 'light';
  body.className = `${savedMode}-mode ${isPremium ? 'premium-active' : ''}`;

  // Eğer sayfada tema seçici varsa çalıştır
  const modeSelector = document.getElementById('mode');
  if (modeSelector) {
    modeSelector.value = savedMode;
    modeSelector.addEventListener('change', (e) => {
      const selectedMode = e.target.value;
      body.className = `${selectedMode}-mode ${isPremium ? 'premium-active' : ''}`;
      localStorage.setItem('themeMode', selectedMode);
    });
  }

  // Eğer sayfada premium butonu kapsayıcısı varsa çalıştır
  const premiumButtonContainer = document.getElementById('premiumButtonContainer');
  if (premiumButtonContainer) {
    updatePremiumButton(isPremium);
  }

  // === REKLAM MANTIĞI ===
  const fullscreenAd = document.getElementById('fullscreenAd');
  const closeAdBtn = document.getElementById('closeAdBtn');
  const AD_INTERVAL = 30000; // 30 saniye

  if (!isPremium && fullscreenAd && closeAdBtn) {
    // İlk reklamı göster ve döngüyü başlat
    showAd();
    setInterval(showAd, AD_INTERVAL);

    // Kapatma butonu işlevi
    closeAdBtn.addEventListener('click', () => {
      fullscreenAd.style.display = 'none';
    });
  }
});

// Premium butonu güncelleme fonksiyonu
function updatePremiumButton(isActive) {
  const premiumButtonContainer = document.getElementById('premiumButtonContainer');
  premiumButtonContainer.innerHTML = '';
  const newButton = document.createElement('button');
  newButton.className = 'my-button';
  newButton.onclick = togglePremium;
  newButton.textContent = isActive ? 'Premium modu iptal et' : 'Premium moda geç';
  premiumButtonContainer.appendChild(newButton);
}

// Premium mod aç/kapat fonksiyonu
function togglePremium() {
  const currentIsPremium = localStorage.getItem('isPremium') === 'true';
  const newIsPremium = !currentIsPremium;
  localStorage.setItem('isPremium', newIsPremium);
  
  if (newIsPremium) {
    window.location.href = 'premium.html';
  } else {
    window.location.reload(); // Sayfayı yenileyerek değişiklikleri uygula
  }
}

// Reklam göster fonksiyonu
function showAd() {
  const fullscreenAd = document.getElementById('fullscreenAd');
  const closeAdBtn = document.getElementById('closeAdBtn');
  closeAdBtn.classList.remove('visible');
  fullscreenAd.style.display = 'flex';
  
  setTimeout(() => {
    closeAdBtn.classList.add('visible');
  }, 5000);
}
