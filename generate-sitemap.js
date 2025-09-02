import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Assuming your locations data is accessible or can be imported
// For this example, I'll hardcode a simple version of locations
// In a real app, you might fetch this from an API or a data file
const locationsData = [
  {
    id: 2,
    name: "Yala Mobile Camp",
    location: "Yala National Park",
    // ... other location properties
  },
  // Add more locations as needed
];

const hostname = 'https://yalamobilecamping.com'; // Replace with your actual domain

async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({ hostname });
    const writeStream = createWriteStream(resolve('./public/sitemap.xml')); // Write to public folder
    sitemap.pipe(writeStream);

    // Static Routes
    const staticRoutes = [
      { url: '/', changefreq: 'weekly', priority: 1.0 },
      { url: '/safaris', changefreq: 'monthly', priority: 0.8 },
      { url: '/camping', changefreq: 'monthly', priority: 0.8 },
      { url: '/about', changefreq: 'monthly', priority: 0.7 },
      { url: '/transportation', changefreq: 'monthly', priority: 0.7 },
      { url: '/book', changefreq: 'weekly', priority: 0.9 }, // Main booking page
      { url: '/faq', changefreq: 'monthly', priority: 0.6 },
      { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
      { url: '/terms', changefreq: 'yearly', priority: 0.3 },
      { url: '/unsubscribe', changefreq: 'yearly', priority: 0.2 },
      { url: '/blog', changefreq: 'monthly', priority: 0.7 },
    ];

    staticRoutes.forEach(route => sitemap.write(route));

    // Dynamic Routes (e.g., /location/:locationId)
    locationsData.forEach(location => {
      sitemap.write({
        url: `/location/${location.id}`,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });

    sitemap.end();
    await streamToPromise(sitemap);

    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
    console.log(`📋 Generated sitemap with ${staticRoutes.length + locationsData.length} URLs`);
    
    // Generate robots.txt
    generateRobotsTxt();

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

function generateRobotsTxt() {
  try {
    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${hostname}/sitemap.xml

# Disallow admin/sensitive areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Allow specific files
Allow: /api/contact
Allow: /api/booking`;

    import('fs').then(fs => {
      fs.writeFileSync(resolve('./public/robots.txt'), robotsContent); // Write to public folder
      console.log('✅ robots.txt generated successfully at public/robots.txt');
    });
    
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error);
  }
}

// Run the function
generateSitemap();
