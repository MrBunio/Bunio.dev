
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(counter, target, speed), 1);
        } else {
            counter.innerText = target;
        }
    });
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        let scroll = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            let speed = element.getAttribute('data-speed');
            element.style.transform = `translateY(${scroll * speed}px)`;
        });
    });
}

function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.getAttribute('data-text');
        let i = 0;
        let speed = 100; 
        
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); 
}

function initEasterEgg() {
    let consoleStyle = `
        font-family: 'Courier New', monospace;
        color: #00ff00;
        background: #000;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        display: none;
    `;
    
    const consoleElement = document.createElement('div');
    consoleElement.id = 'secret-console';
    consoleElement.style.cssText = consoleStyle;
    consoleElement.innerHTML = '<p>> Witaj w konsoli Bunio! Wpisz "help" aby zobaczyć komendy.</p>';
    document.body.appendChild(consoleElement);
    
    const secretCommands = {
        'help': 'Dostępne komendy: theme, rainbow, disco, reset',
        'theme': 'Zmienia motyw strony',
        'rainbow': 'Aktywuje tryb tęczy',
        'disco': 'Aktywuje tryb disco (uwaga: migające światła)',
        'reset': 'Resetuje efekty specjalne'
    };
    
    let consoleOpen = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            consoleOpen = !consoleOpen;
            consoleElement.style.display = consoleOpen ? 'block' : 'none';
            e.preventDefault();
        }
        
        if (consoleOpen && e.key === 'Enter') {
            const command = consoleElement.textContent.split('>').pop().trim();
            executeCommand(command);
            consoleElement.innerHTML += '<br>> ';
            e.preventDefault();
        }
    });
}

function executeCommand(command) {
    switch(command.toLowerCase()) {
        case 'help':
            consoleElement.innerHTML += '<br>' + secretCommands.help;
            break;
        case 'theme':
            toggleTheme();
            consoleElement.innerHTML += '<br>Motyw zmieniony!';
            break;
        case 'rainbow':
            document.body.classList.add('rainbow-mode');
            consoleElement.innerHTML += '<br>Tryb tęczy aktywowany!';
            break;
        case 'disco':
            document.body.classList.add('disco-mode');
            consoleElement.innerHTML += '<br>Tryb disco aktywowany!';
            break;
        case 'reset':
            document.body.classList.remove('rainbow-mode', 'disco-mode');
            consoleElement.innerHTML += '<br>Efekty zresetowane!';
            break;
        default:
            consoleElement.innerHTML += '<br>Nieznana komenda. Wpisz "help" dla pomocy.';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    initParallax();
    initTypewriter();
    initScrollReveal();
    initEasterEgg();
    
    createFloatingParticles();
});

function createFloatingParticles() {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(container);
    
    for (let i = 0; i < 20; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9c74f', '#ffafcc'];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.2};
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
    `;
    
    container.appendChild(particle);
    
    const duration = Math.random() * 20 + 10;
    particle.animate([
        { transform: 'translateY(0px)' },
        { transform: `translateY(-${Math.random() * 100 + 50}px)` }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}