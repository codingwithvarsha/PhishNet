# PhishNet

## Description
This project checks URLs against the Google Safe Browsing API to determine if they are malicious.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PhishNet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_google_api_key
   ```

## Running the Server
To start the server, run:
```bash
node server.js
```
The server will be running on `http://localhost:3000`.

## API Endpoint
- **POST /check-url**: Checks if a URL is malicious. Send a JSON body with the URL:
  ```json
  {
    "url": "http://example.com"
  }
