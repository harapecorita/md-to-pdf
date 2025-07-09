# md-to-pdf

This project exposes a small API that converts Markdown to PDF.

## Usage

1. Build and start the container:
   ```bash
   docker compose up
   ```
2. Send a POST request with JSON body `{ "markdown": "# Hello" }` to `http://localhost:3000/convert`.
   The response will be a PDF document.

You can customize print styles by editing `styles/print.css`.
