// sitemapGenerator.js - Place this in your project root or src/utils/
import fs from 'fs';
import path from 'path';

class SitemapGenerator {
  constructor(baseUrl = 'https://www.yalamobilecamping.com') {
    this.baseUrl = baseUrl;
    this.urls = [];
  }

  addUrl(url, options = {}) {
    const defaultOptions = {
      changefreq: 'monthly',
      priority: '0.5',
      lastmod: new Date().toISOString().split('T')[0]
    };

    this.urls.push({
      loc: `${this.baseUrl}${url}`,
      ...defaultOptions,
      ...options
    });
  }

  addImageUrl(url, imageUrl, title) {
    const existingUrl = this.urls.find(u => u.loc === `${this.baseUrl}${url}`);
    if (existingUrl) {
      if (!existingUrl.images) existingUrl.images = [];
      existingUrl.images.push({
        loc: `${this.baseUrl}${imageUrl}`,
        title: title
      });
    }
  }

  generateSitemap() {
    // Define your site structure
    const siteStructure = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/services', priority: '0.9', changefreq: 'monthly' },
      { url: '/locations', priority: '0.9', changefreq: 'monthly' },
      { url: '/booking', priority: '0.8', changefreq: 'weekly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/safari-activities', priority: '0.8', changefreq: 'monthly' },
      { url: '/camping', priority: '0.8', changefreq: 'monthly' },
      { url: '/gallery', priority: '0.6', changefreq: 'weekly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
      { url: '/faq', priority: '0.5', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' }
    ];

    // Add URLs to sitemap
    siteStructure.forEach(page => {
      this.addUrl(page.url, {
        priority: page.priority,
        changefreq: page.changefreq
      });
    });

    // Add images to specific pages
    this.addImageUrl('/', '/assets/images/logo.png', 'Yala Mobile Camping Logo');
    this.addImageUrl('/', '/assets/images/camp3.jpg', 'Yala National Park Camping Experience');
    this.addImageUrl('/about', '/assets/images/about/camp3.jpg', 'About Yala Mobile Camping');
    this.addImageUrl('/safari-activities', '/assets/images/activities/morning-safari.jpg', 'Morning Safari at Yala');
    this.addImageUrl('/safari-activities', '/assets/images/activities/full-day-safari.jpg', 'Full Day Safari Experience');
    this.addImageUrl('/camping', '/assets/images/activities/campsite.jpg', 'Yala Camping Experience');
    this.addImageUrl('/gallery', '/assets/images/leopard.jpg', 'Sri Lankan Leopard at Yala');
    this.addImageUrl('/gallery', '/assets/images/dear.jpg', 'Wildlife at Yala National Park');

    return this.buildXML();
  }

  buildXML() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    this.urls.forEach(url => {
      xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;

      if (url.images) {
        url.images.forEach(image => {
          xml += `    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
    </image:image>
`;
        });
      }

      xml += `  </url>
`;
    });

    xml += `</urlset>`;
    return xml;
  }

  saveSitemap(filePath = './public/sitemap.xml') {
    const sitemapContent = this.generateSitemap();
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap generated successfully at ${filePath}`);
    return sitemapContent;
  }
}

// Usage example for ES modules
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new SitemapGenerator();
  generator.saveSitemap();
}

export default SitemapGenerator;