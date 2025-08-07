
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
