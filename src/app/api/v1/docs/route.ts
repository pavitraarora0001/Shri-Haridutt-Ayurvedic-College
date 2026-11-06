import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  const swaggerPath = path.join(process.cwd(), 'public', 'swagger.json');
  const specRaw = fs.readFileSync(swaggerPath, 'utf8');

  if (format === 'json' || request.headers.get('accept')?.includes('application/json')) {
    return new NextResponse(specRaw, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Deliver an interactive Swagger UI client
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>API Documentation — Shri Haridutt Ayurvedic Medical College</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <link rel="icon" type="image/png" href="/favicon.ico" />
  <style>
    body { margin: 0; background-color: #0F2821; color: #F6F2E9; font-family: sans-serif; }
    .topbar { display: none; }
    .swagger-ui { background: #FFFFFF; max-width: 1400px; margin: 0 auto; padding: 24px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header-banner { background: #173D32; color: #C5A46D; padding: 20px 40px; border-bottom: 2px solid #C5A46D; display: flex; align-items: center; justify-content: space-between; }
    .header-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header-banner">
    <div class="header-title">Shri Haridutt Ayurvedic Medical College & Hospital — OpenAPI 3.0 REST Specification</div>
    <div><a href="/public/swagger.json" download style="color: #C5A46D; text-decoration: none; font-size: 13px; font-weight: 600;">Download JSON Spec ↓</a></div>
  </div>
  <div style="padding: 24px;">
    <div id="swagger-ui"></div>
  </div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api/v1/docs?format=json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
