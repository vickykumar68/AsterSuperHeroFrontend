import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DIST = path.join(__dirname, 'dist');
const BASE = '/super-hero-power-project';
const API_TARGET = 'https://asteradmin.stldigitaltech.com:3000';

app.use((req, res, next) => {
  console.log(`[Express] ${req.method} ${req.url}`);
  next();
});

const apiProxy = createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  secure: false,
  pathRewrite: (path) => `/api/v1/superhero${path}`, // Add back stripped prefix
  on: {
    error: (err, req, res) => {
      console.error('[Proxy Error]', err.message);
      res.status(502).json({ error: 'Proxy error', detail: err.message });
    },
    proxyReq: (proxyReq, req) => {
      console.log(`[Proxy] ${req.method} ${req.url} => ${API_TARGET}${proxyReq.path}`);
    },
  },
});

app.use('/api/v1/superhero', apiProxy);

app.use(BASE, express.static(DIST));

app.use(BASE, (req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
  console.log('API proxy: /api/v1/superhero =>', API_TARGET);
});
