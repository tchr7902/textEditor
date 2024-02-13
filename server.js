const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files with correct MIME types and caching headers
app.use(express.static(path.join(__dirname, 'client'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      // Set the Content-Type header for CSS files
      console.log('Setting Content-Type header for CSS file:', filePath);
      res.setHeader('Content-Type', 'text/css');
    }
    if (filePath.endsWith('.css') || filePath.endsWith('.js') || filePath.endsWith('.ico')) {
      // Set caching headers for CSS, JavaScript, and favicon files
      console.log('Setting caching headers for file:', filePath);
      res.setHeader('Cache-Control', 'public, max-age=604800'); // Cache for 7 days
    }
  }
}));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
