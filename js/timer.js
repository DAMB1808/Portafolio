class Timer {
    constructor() {
        this.timeCurrentEl = document.getElementById('time-current');
        this.progressBar = document.getElementById('progress-bar');
        this.bufferBar = document.getElementById('buffer-bar');
        
        this.seconds = 0;
        this.totalSeconds = 260; // 04:20
        this.interval = null;
        
        this.init();
    }

    init() {
        this.startTimer();
        this.simulateBuffer();
    }

    formatTime(sec) {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.seconds++;
            if (this.seconds > this.totalSeconds) {
                this.seconds = 0; // loop
            }
            this.updateUI();
        }, 1000);
    }

    updateUI() {
        this.timeCurrentEl.textContent = this.formatTime(this.seconds);
        const progressPercent = (this.seconds / this.totalSeconds) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
    }

    simulateBuffer() {
        setInterval(() => {
            const currentProgress = (this.seconds / this.totalSeconds) * 100;
            const bufferAmount = currentProgress + Math.random() * 10 + 5;
            this.bufferBar.style.width = `${Math.min(bufferAmount, 100)}%`;
        }, 2000);
    }
}

window.Timer = Timer;
