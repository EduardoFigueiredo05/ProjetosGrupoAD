
/**
 * Script principal para o site AtriumDesign
 * Contém a lógica para:
 * 1. Carrossel da seção Hero
 * 2. Menu Hambúrguer responsivo
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica do Carrossel ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        // Inicia o primeiro slide como ativo
        slides[0].classList.add('active');

        // Define o intervalo para trocar de slide
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }, 3000); // Troca a imagem a cada 5 segundos
    }

     // --- Lógica do Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Alterna a classe 'active' no menu de navegação para mostrá-lo/escondê-lo
            navMenu.classList.toggle('active');
            
            // Alterna a classe 'active' no botão hambúrguer para a animação "X"
            hamburger.classList.toggle('active');

            // Atualiza o atributo aria-expanded para acessibilidade
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }

});


// --- Lógica do Contador Animado ---
const counters = document.querySelectorAll('.counter');

const activateCounters = () => {
    counters.forEach(counter => {
        // Garante que o contador só anime uma vez
        if (counter.classList.contains('animated')) return;
        counter.classList.add('animated');

        const targetAttr = counter.getAttribute('data-target');
        // Extrai apenas o número do atributo para o cálculo da animação
        const target = +targetAttr.replace(/[^0-9]/g, ''); ;

        counter.innerText = '0';

        const updateCounter = () => {
            const current = +counter.innerText;
            // Define um incremento para a animação ser suave
            const increment = target / 200; ;

            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(updateCounter, 10);
            } else {
                // Ao final, define o texto como o atributo data-target original completo
                counter.innerText = targetAttr; ;
            }
        };
        updateCounter();
    });
};

// Cria um "observador" para ativar a animação quando a seção ficar visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateCounters();
        }
    });
}, {
    threshold: 0.5 // Ativa quando 50% da seção estiver visível
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// --- Lógica do Carrossel Horizontal Infinito ---
const scrollers = document.querySelectorAll(".scroller");

// Se o usuário não prefere movimento, não adicionamos a animação
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        // Adiciona um atributo para o CSS saber que o JS está ativo
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // Duplica os itens para criar o efeito de loop contínuo
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

