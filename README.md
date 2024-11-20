# A basic URL Shortener app

This whole app was generated using the [windsurf ai ide](https://codeium.com/windsurf), it's currently deployed to netlify at https://magnificent-mermaid-ed0cca.netlify.app/ , this whole app was created within a few hours!

This is a simple, client-side URL shortener application that uses localStorage for persistence. It allows users to shorten URLs and provides a short URL using the `window.location.origin` domain for testing purposes.

## Features
- **URL Shortening**: Generate a short URL for any valid long URL.
- **Local Storage**: Persist URL mappings using the browser's localStorage.
- **Redirect Functionality**: Redirects to the original URL when accessing the short URL.
- **Copy to Clipboard**: Easily copy the generated short URL.

## Getting Started

### Prerequisites
- Node.js installed on your machine

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd windsurf-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Usage
- Enter a long URL in the input field and click "Generate Short URL".
- The application will display a short URL that you can copy.
- Access the short URL to be redirected to the original long URL.

## File Structure
- `index.html`: Main HTML file for the application.
- `styles.css`: CSS for styling the application.
- `app.js`: JavaScript logic for URL shortening and localStorage management.
- `server.js`: Express server to serve static files and handle redirects.
- `redirect.html`: Handles the redirection logic from short URLs.

## License
This project is open-source and available under the MIT License.

## Acknowledgments
- Developed using vanilla JavaScript and Express.js.
- Inspired by the need for simple, client-side URL shortening solutions.
