class URLShortener {
    constructor() {
        this.longUrlInput = document.getElementById('longUrlInput');
        this.generateButton = document.getElementById('generateButton');
        this.shortUrlOutput = document.getElementById('shortUrlOutput');
        this.copyButton = document.getElementById('copyButton');

        this.generateButton.addEventListener('click', () => this.generateShortURL());
        this.copyButton.addEventListener('click', () => this.copyShortURL());

        // Load existing URLs from localStorage
        this.urlMap = JSON.parse(localStorage.getItem('urlMap')) || {};
    }

    generateShortURL() {
        const longUrl = this.longUrlInput.value.trim();
        
        // Validate URL
        if (!this.isValidURL(longUrl)) {
            alert('Please enter a valid URL');
            return;
        }

        // Generate a short code (6 characters)
        const shortCode = this.generateShortCode();
        const shortUrl = `${window.location.origin}/${shortCode}`;

        // Store mapping in localStorage
        this.urlMap[shortCode] = longUrl;
        localStorage.setItem('urlMap', JSON.stringify(this.urlMap));

        // Display short URL
        this.shortUrlOutput.textContent = shortUrl;
        this.copyButton.style.display = 'inline-block';
        this.longUrlInput.value = '';
    }

    generateShortCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        do {
            result = Array.from(
                {length: 6}, 
                () => characters.charAt(Math.floor(Math.random() * characters.length))
            ).join('');
        } while (this.urlMap[result]); // Ensure unique short code
        return result;
    }

    copyShortURL() {
        navigator.clipboard.writeText(this.shortUrlOutput.textContent)
            .then(() => {
                alert('Short URL copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }
}

// Initialize the URL Shortener when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new URLShortener();
});
