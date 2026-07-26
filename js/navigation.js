class Navigation {
    constructor() {
        this.album = document.getElementById('album');
        this.albumCover = document.getElementById('album-cover');
        this.navItems = document.querySelectorAll('.nav-item');
        this.dynamicContent = document.getElementById('dynamic-content');
        
        this.init();
    }

    init() {
        // Open album when cover is clicked
        if(this.albumCover) {
            this.albumCover.addEventListener('click', () => {
                this.album.classList.add('is-open');
                
                // Load first track if empty (checking children.length ignores HTML comments)
                if(this.dynamicContent.children.length === 0) {
                    const activeItem = document.querySelector('.nav-item.active');
                    if(activeItem) {
                        this.changeTrack(activeItem.getAttribute('data-url'), activeItem);
                    }
                }
            });
        }

        // Tracklist navigation
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const url = item.getAttribute('data-url');
                this.changeTrack(url, item);
            });
        });
    }

    async changeTrack(url, activeItem) {
        if(!url) return;

        // Update Nav
        this.navItems.forEach(nav => nav.classList.remove('active'));
        if(activeItem) activeItem.classList.add('active');

        // Fetch new content
        try {
            this.dynamicContent.style.opacity = '0';
            
            const response = await fetch(url);
            if(!response.ok) throw new Error('Network error');
            const html = await response.text();
            
            setTimeout(() => {
                this.dynamicContent.innerHTML = html;
                this.dynamicContent.style.opacity = '1';
                
                // Retrigger hover events for custom cursor if needed
                if(window.Cursor && window.cursorInstance) {
                    // Handled automatically if cursor just uses :hover, 
                    // but if JS events are attached, re-attach them here.
                }
            }, 300); // Wait for fade out
            
        } catch (error) {
            console.error('Error loading track:', error);
            this.dynamicContent.innerHTML = `<p style="color:red">Error loading track content.</p>`;
            this.dynamicContent.style.opacity = '1';
        }
    }
}

// Export for module (or just add to window since we are not using a bundler)
window.Navigation = Navigation;
