class URLShortener {
    constructor() {
        this.longUrlInput = document.getElementById('longUrlInput');
        this.generateButton = document.getElementById('generateButton');
        this.shortUrlOutput = document.getElementById('shortUrlOutput');
        this.copyButton = document.getElementById('copyButton');
        this.urlTableBody = document.getElementById('urlTableBody');
        this.previousUrlsContainer = document.getElementById('previousUrls');
        this.clearUrlsButton = document.getElementById('clearUrlsButton');

        this.generateButton.addEventListener('click', () => this.generateShortURL());
        this.copyButton.addEventListener('click', () => this.copyShortURL());
        this.clearUrlsButton.addEventListener('click', () => this.clearPreviousUrls());

        // Load existing URLs from localStorage
        this.urlMap = JSON.parse(localStorage.getItem('urlMap')) || {};
        this.displayPreviousUrls();
    }

    clearPreviousUrls() {
        // Clear the urlMap in localStorage
        this.urlMap = {};
        localStorage.removeItem('urlMap');

        // Clear the table body
        this.urlTableBody.innerHTML = '';

        // Hide the previous URLs container
        this.previousUrlsContainer.style.display = 'none';
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

        // Update the list of previous URLs
        this.displayPreviousUrls();
    }

    displayPreviousUrls() {
        this.urlTableBody.innerHTML = '';
        const entries = Object.entries(this.urlMap);
        if (entries.length === 0) {
            this.previousUrlsContainer.style.display = 'none';
            return;
        }
        this.previousUrlsContainer.style.display = 'block';
        entries.forEach(([shortCode, longUrl]) => {
            const row = document.createElement('tr');
            const shortUrl = `${window.location.origin}/${shortCode}`;
            row.innerHTML = `<td><a href="${shortUrl}" target="_blank">${shortUrl}</a></td><td>${longUrl}</td>`;
            this.urlTableBody.appendChild(row);
        });
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
