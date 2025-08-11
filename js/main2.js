
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

// --- Lógica da Galeria Interativa (Página Móveis) ---
const galleryContainer = document.querySelector('.interactive-gallery-section');

if (galleryContainer) {
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.thumbnail-item');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove a classe 'active' de todos os thumbnails
            thumbnails.forEach(item => item.classList.remove('active'));
            // Adiciona a classe 'active' ao thumbnail clicado
            thumb.classList.add('active');

            const newImageSrc = thumb.getAttribute('data-image');
            
            // Adiciona um efeito de fade out na imagem atual
            mainImage.style.opacity = '0';

            // Troca a imagem após o fade out
            setTimeout(() => {
                mainImage.src = newImageSrc;
                // Adiciona um efeito de fade in na nova imagem
                mainImage.style.opacity = '1';
            }, 300); // O tempo deve corresponder à transição no CSS
        });
    });
}

// --- Lógica do Formulário de Contato ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Adiciona a classe ao body para os estilos específicos
    document.body.classList.add('contato-page');

    const successMessage = document.getElementById('form-success-message');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    // Máscara para o telefone (XX) XXXXX-XXXX
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        let formattedValue = '';

        if (value.length > 0) {
            formattedValue = `(${value.substring(0, 2)}`;
        }
        if (value.length > 2) {
            if (value.length > 10) { // Celular com 9 dígitos
                formattedValue += `) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
            } else { // Fixo ou celular com 8 dígitos
                formattedValue += `) ${value.substring(2, 6)}-${value.substring(6, 10)}`;
            }
        }
        e.target.value = formattedValue;
    });

    // Função de validação de e-mail
    const validateEmail = () => {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length === 0) {
            emailInput.style.borderColor = '#ddd';
            if (emailError) emailError.textContent = '';
            return true; // Campo vazio é válido até ser obrigatório no submit
        }

        if (!emailRegex.test(email)) {
            emailInput.style.borderColor = '#dc3545'; // Vermelho
            if (emailError) emailError.textContent = 'Por favor, insira um formato de e-mail válido.';
            return false;
        } else {
            emailInput.style.borderColor = '#28a745'; // Verde
            if (emailError) emailError.textContent = '';
            return true;
        }
    };

    emailInput.addEventListener('input', validateEmail);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão

        // Validação final antes de "enviar"
        const isEmailValid = validateEmail();
        // Verifica também se os campos obrigatórios não estão vazios
        const requiredFields = contactForm.querySelectorAll('[required]');
        let allFieldsValid = true;
        requiredFields.forEach(field => {
            if (!field.value) {
                field.style.borderColor = '#dc3545';
                allFieldsValid = false;
            }
        });

        if (!isEmailValid || !allFieldsValid) {
            return; // Impede o envio se algo for inválido
        }

        // Simulação de envio bem-sucedido
        successMessage.style.display = 'block';
        contactForm.style.display = 'none';

        // Opcional: resetar após alguns segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
            // Reseta a cor da borda dos campos
            requiredFields.forEach(field => field.style.borderColor = '#ddd');
        }, 5000); // Mostra a mensagem por 5 segundos
    });
}

