class Cursor {
    constructor() {
        this.dot = document.getElementById('cursor-dot');
        this.ring = document.getElementById('cursor-ring');
        
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.ringX = this.mouseX;
        this.ringY = this.mouseY;
        
        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Instantly move dot
            this.dot.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0) translate3d(-50%, -50%, 0)`;
        });

        // Hover effects on interactive elements
        const interactives = document.querySelectorAll('a, .nav-item, .project-item, .contact-link');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });

        this.render();
    }

    render() {
        // Spring animation for ring
        this.ringX += (this.mouseX - this.ringX) * 0.2;
        this.ringY += (this.mouseY - this.ringY) * 0.2;
        
        this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate3d(-50%, -50%, 0)`;
        
        requestAnimationFrame(() => this.render());
    }
}

window.Cursor = Cursor;
