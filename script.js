// ============ كلمة السر ============
const PASSWORD = "Shorouk";

const loginScreen = document.getElementById('loginScreen');
const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('passwordInput');
const loginError = document.getElementById('loginError');
const mainContent = document.getElementById('mainContent');

function tryLogin() {
  const value = passwordInput.value.trim();
  if (value.toLowerCase() === PASSWORD.toLowerCase()) {
    loginError.classList.remove('show');
    loginScreen.classList.add('hidden');
    setTimeout(() => {
      mainContent.classList.add('show');
      document.body.style.overflow = 'auto';
      initReveal();
      fireConfetti(150);
    }, 500);
  } else {
    loginError.classList.add('show');
    passwordInput.style.borderColor = '#ff6b6b';
    passwordInput.style.animation = 'shakeBox 0.5s ease';
    setTimeout(() => {
      passwordInput.style.animation = '';
      passwordInput.style.borderColor = '';
    }, 600);
  }
}

loginBtn.addEventListener('click', tryLogin);
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') tryLogin();
});

// منع السكرول قبل الدخول
document.body.style.overflow = 'hidden';

// ============ العداد الحي ============
const birthDate = new Date(2008, 10, 11, 0, 0, 0); // 11 نوفمبر 2008

function updateCounter() {
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // أيام إجمالية منذ الميلاد
  const totalDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));

  const cYears = document.getElementById('cYears');
  const cDays = document.getElementById('cDays');
  const cHours = document.getElementById('cHours');
  const cMinutes = document.getElementById('cMinutes');

  if (cYears) cYears.textContent = years;
  if (cDays) cDays.textContent = totalDays.toLocaleString('ar-EG');
  if (cHours) cHours.textContent = (totalDays * 24).toLocaleString('ar-EG');
  if (cMinutes) cMinutes.textContent = (totalDays * 24 * 60).toLocaleString('ar-EG');
}

setInterval(updateCounter, 1000);
updateCounter();

// ============ Reveal on scroll ============
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

// ============ كروت المفضلة ============
document.querySelectorAll('.fav-card').forEach(card => {
  card.addEventListener('click', () => {
    const wasOpened = card.classList.contains('opened');
    document.querySelectorAll('.fav-card').forEach(c => c.classList.remove('opened'));
    if (!wasOpened) {
      card.classList.add('opened');
      fireConfetti(25, card);
    }
  });
});

// ============ اختاري مزاجك ============
const moodMessages = {
  coffee: "☕ قهوة جاية في السكة.. استني شوية وسيبك من الدنيا، النهارده يومك إنتي 😌💛",
  bechamel: "🍝 البشاميل اختيار مضمون.. اختيارك دايمًا صح، يلا بينا نجيب طبق كبير! 😋",
  hawawshi: "🥙 الحواوشي بيقولك: أنا جاهز.. ولما الجوع يتكلم مفيش حد يرد عليه 😄🔥",
  fruit: "🥭 ولا جوافة ولا مانجا.. خدي الاتنين! العصيرين على حسابي النهارده 🥭🥤💗"
};

const moodResult = document.getElementById('moodResult');
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const mood = btn.dataset.mood;
    moodResult.classList.remove('show');
    setTimeout(() => {
      moodResult.textContent = moodMessages[mood];
      moodResult.classList.add('show');
      fireConfetti(40);
    }, 200);
  });
});

// ============ صندوق الهدايا ============
const giftBox = document.getElementById('giftBox');
const giftSurprises = document.getElementById('giftSurprises');
let giftOpened = false;

giftBox.addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;
  giftBox.classList.add('shake');

  setTimeout(() => {
    giftBox.classList.remove('shake');
    giftBox.classList.add('open');
    giftSurprises.classList.add('open');
    fireConfetti(180);
  }, 600);
});

// ============ Confetti ============
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const confettiColors = ['#c9a961', '#e6d5a8', '#d4b896', '#ff9a3c', '#ff7a1a', '#e8d5b7', '#b89e6e'];

function fireConfetti(count = 100, originEl = null) {
  let originX = canvas.width / 2;
  let originY = canvas.height / 2;

  if (originEl) {
    const rect = originEl.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;
  }

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 12;
    confettiParticles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 4 + Math.random() * 6,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 20,
      opacity: 1,
      gravity: 0.2 + Math.random() * 0.15,
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }

  if (!confettiRunning) {
    confettiRunning = true;
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.99;
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.008;

    if (p.opacity <= 0 || p.y > canvas.height + 50) {
      confettiParticles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(p.opacity, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (confettiParticles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}