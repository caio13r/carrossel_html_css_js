
const track = document.getElementById("track");
const slides = Array.from(track.children);
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("dots");

let index = 0;
let autoplayTimer = null;

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => { goToSlide(i); });
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateCarousel() {
  const width = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * width}px)`;
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

function goToSlide(i) {
  index = i;
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  updateCarousel();
  restartAutoplay();
}

prevBtn.addEventListener("click", () => { goToSlide(index - 1); });
nextBtn.addEventListener("click", () => { goToSlide(index + 1); });

function startAutoplay() {
  autoplayTimer = setInterval(() => { goToSlide(index + 1); }, 4000);
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

let startX = 0;
let isDragging = false;

track.addEventListener("mousedown", e => { isDragging = true; startX = e.clientX; });
track.addEventListener("mouseup", e => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  if (diff > 50) goToSlide(index - 1);
  if (diff < -50) goToSlide(index + 1);
  isDragging = false;
});
track.addEventListener("mouseleave", () => { isDragging = false; });
track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
track.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) goToSlide(index - 1);
  if (diff < -50) goToSlide(index + 1);
});

window.addEventListener("resize", updateCarousel);
updateCarousel();
startAutoplay();

const noticias = {
  1: { 
    titulo: "Título da Notícia 1", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_2_54.png"
  },
  2: { 
    titulo: "Título da Notícia 2", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_1_53.png"
  },
  3: { 
    titulo: "Título da Notícia 3", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_4_56.png"
  },
  4: { 
    titulo: "Título da Notícia 4", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_3_55.png"
  },
  5: { 
    titulo: "Título da Notícia 5", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_2_54.png"
  },
  6: { 
    titulo: "Título da Notícia 6", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_1_53.png"
  },
  7: { 
    titulo: "Título da Notícia 7", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_4_56.png"
  },
  8: { 
    titulo: "Título da Notícia 8", 
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "assets/img_3_55.png"
  }
};

function abrirNoticia(id) {
  const modal = document.getElementById("modal-noticia");
  const titulo = document.getElementById("modal-titulo");
  const texto = document.getElementById("modal-texto");
  const imagem = document.getElementById("modal-img");
  
  if (noticias[id]) {
    titulo.textContent = noticias[id].titulo;
    texto.textContent = noticias[id].texto;
    if (imagem) {
      imagem.src = noticias[id].imagem;
    }
  }
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  const modal = document.getElementById("modal-noticia");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

document.getElementById("modal-noticia").addEventListener("click", function(e) {
  if (e.target === this) fecharModal();
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") fecharModal();
});

const progTrack = document.getElementById("prog-track");
const progSlides = Array.from(progTrack.children);
const progPrevBtn = document.getElementById("prog-prev");
const progNextBtn = document.getElementById("prog-next");
const progDotsContainer = document.getElementById("prog-dots");

let progIndex = 0;

progSlides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("prog-dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => { goToProgSlide(i); });
  progDotsContainer.appendChild(dot);
});

const progDots = Array.from(progDotsContainer.children);

function updateProgCarousel() {
  const width = progSlides[0].getBoundingClientRect().width;
  progTrack.style.transform = `translateX(-${progIndex * width}px)`;
  progDots.forEach(d => d.classList.remove("active"));
  progDots[progIndex].classList.add("active");
}

function goToProgSlide(i) {
  progIndex = i;
  if (progIndex < 0) progIndex = progSlides.length - 1;
  if (progIndex >= progSlides.length) progIndex = 0;
  updateProgCarousel();
}

progPrevBtn.addEventListener("click", () => { goToProgSlide(progIndex - 1); });
progNextBtn.addEventListener("click", () => { goToProgSlide(progIndex + 1); });

window.addEventListener("resize", updateProgCarousel);
updateProgCarousel();

function toggleMaisNoticias() {
  const btn = document.getElementById("ver-mais-noticias");
  const extras = document.getElementById("noticias-extras");
  const texto = btn.querySelector(".ver-mais-texto");
  
  btn.classList.toggle("active");
  extras.classList.toggle("show");
  
  if (extras.classList.contains("show")) {
    texto.textContent = "Ver menos";
    setTimeout(() => {
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  } else {
    texto.textContent = "Ver mais";
  }
}
