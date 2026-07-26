class BackgroundCanvas {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.particles = [];
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create subtle floating particles / "audio dust"
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 1.5 + 0.5,
                speedY: Math.random() * 0.5 - 0.25,
                speedX: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.3
            });
        }

        this.render();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    drawNoise() {
        // Very subtle static noise
        const imageData = this.ctx.createImageData(this.width, this.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const val = Math.random() * 255;
            data[i] = val;
            data[i+1] = val;
            data[i+2] = val;
            data[i+3] = 8; // very low opacity
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw noise
        this.drawNoise();

        // Draw particles
        this.ctx.fillStyle = `rgba(17, 17, 17, 0.2)`;
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.render());
    }
}

window.BackgroundCanvas = BackgroundCanvas;
