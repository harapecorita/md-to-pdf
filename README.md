# md-to-pdf

This project exposes a small API that converts Markdown to PDF.

## Usage

1. Build and start the container:
   ```bash
   docker compose up
   ```
2. You can open `http://localhost:3000/` in your browser and test the API using the provided HTML page.
3. Send a POST request with JSON body `{ "markdown": "# Hello" }` to `http://localhost:3000/convert` to programmatically convert text.
   The response will be a PDF document.

You can customize print styles by editing `styles/print.css`.
