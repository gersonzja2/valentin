// Configura aquí la fecha de inicio (Año, Mes [0=Enero, 1=Febrero...], Día)
const startDate = new Date(2023, 10, 1); 

const diff = new Date() - startDate;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
document.getElementById('days').innerText = days;

// Lógica del carrusel de fotos (image1.png a image29.png)
let currentImageIndex = 1;
const totalImages = 29;
const photoElement = document.querySelector('.couple-photo');

// Frases románticas que cambiarán
const reasons = [
    "Porque me haces reír como nadie más.",
    "Por tu forma de mirarme.",
    "Porque eres mi mejor amiga y mi amor.",
    "Por cada momento juntos.",
    "Porque haces mi vida más bonita.",
    "Simplemente porque eres tú, Liset."
];
let reasonIndex = 0;
const reasonElement = document.getElementById('reasons');

setInterval(() => {
    // 1. Desvanecer la imagen (Fade out)
    photoElement.style.opacity = 0;
    
    setTimeout(() => {
        // 2. Cambiar la imagen y el texto mientras está invisible
        currentImageIndex = (currentImageIndex % totalImages) + 1;
        photoElement.src = `src/images/image${currentImageIndex}.png`;
        
        // Cambiar frase
        reasonIndex = (reasonIndex + 1) % reasons.length;
        reasonElement.innerText = reasons[reasonIndex];
        
        // 3. Reaparecer la imagen (Fade in)
        photoElement.onload = () => {
            photoElement.style.opacity = 1;
        };
    }, 500); // Espera 500ms (tiempo de la transición CSS) para cambiar
}, 3000); // Cambia cada 3000ms (3 segundos)

document.getElementById('loveBtn').addEventListener('click', function() {
    // Mostrar el mensaje oculto
    const message = document.getElementById('hiddenMessage');
    message.style.display = 'block';
    this.style.display = 'none'; // Ocultar el botón

    // Reproducir música
    const music = document.getElementById('bgMusic');
    playMusic(music);

    // Iniciar lluvia de corazones
    setInterval(createHeart, 300);
});

// Control del botón de música
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', () => {
    const music = document.getElementById('bgMusic');
    if (music.paused) {
        playMusic(music);
        musicBtn.innerText = '⏸️';
    } else {
        music.pause();
        musicBtn.innerText = '🎵';
    }
});

function playMusic(music) {
    music.volume = 1.0;
    music.play().catch(e => console.log("Esperando interacción para reproducir audio"));
}

function createHeart() {
    const heart = document.createElement('div');
    const emojis = ['❤️', '💖', '💕', '🌹', '🥰', '💌', '✨'];
    heart.classList.add('floating-heart');
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    const duration = Math.random() * 2 + 3; // Duración entre 3 y 5 segundos
    heart.style.animationDuration = duration + 's';
    
    document.body.appendChild(heart);

    // Eliminar el corazón después de la animación
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// --- Cuenta regresiva para el próximo aniversario ---
const anniversaryMonth = 10; // Noviembre (0-11), igual que tu startDate
const anniversaryDay = 1;   // Igual que tu startDate

function setupAnniversaryCountdown() {
    const now = new Date();
    let anniversaryYear = now.getFullYear();
    let anniversaryDate = new Date(anniversaryYear, anniversaryMonth, anniversaryDay);

    // Si la fecha de aniversario de este año ya pasó, calcula para el próximo año
    if (now > anniversaryDate) {
        anniversaryYear++;
        anniversaryDate = new Date(anniversaryYear, anniversaryMonth, anniversaryDay);
    }

    const countdownElement = document.getElementById('anniversary-countdown');
    if (!countdownElement) return; // No hacer nada si el elemento no existe

    function updateCountdown() {
        const today = new Date();
        const diff = anniversaryDate - today;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Tiempo para nuestro próximo aniversario: <br> <strong>${d}d ${h}h ${m}m ${s}s</strong>`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial para que no espere 1 segundo
}

// Iniciar la cuenta regresiva cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupAnniversaryCountdown);

// --- Efecto de chispas/estrellas al mover el ratón ---
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Posición inicial en el cursor
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Movimiento aleatorio para un efecto más natural
    const randomX = (Math.random() - 0.5) * 60;
    const randomY = (Math.random() - 0.5) * 60;
    
    // Aplicamos el movimiento en el siguiente frame para que la transición funcione
    requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${randomX}px, ${randomY}px) rotate(360deg)`;
        sparkle.style.opacity = 0;
    });
    
    document.body.appendChild(sparkle);

    // Eliminar la chispa después de la animación (1000ms = 1s)
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Para no sobrecargar el navegador, creamos chispas solo de vez en cuando
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.75) { // Crea una chispa el 25% de las veces
        createSparkle(e.clientX, e.clientY);
    }
});