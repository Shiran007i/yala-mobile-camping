import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const hostname = 'https://yalamobilecamping.com'; // Replace with your actual domain

// Define all your routes based on your component structure
const routes = [
  // Main pages
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  
  // Booking & Services
  {
    url: '/booking',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/booking-details',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  
  // Camping & Safari
  {
    url: '/camping',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/safari-activities',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  
  // Location & Maps
  {
    url: '/location',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/interactive-map',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString()
  },
  {
    url: '/yala-wildlife-map',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  
  // Gallery & Media
  {
    url: '/gallery',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  
  // Information Pages
  {
    url: '/faq',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString()
  },
  {
    url: '/newsletter',
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: new Date().toISOString()
  },
  {
    url: '/tripadvisor',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString()
  },
  
  // Transportation & Services
  {
    url: '/transportation',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/pricing',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  
  // Legal Pages
  {
    url: '/privacy',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString()
  },
  {
    url: '/terms',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString()
  },
  
  // Additional sections
  {
    url: '/why-choose-us',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/unsubscribe',
    changefreq: 'yearly',
    priority: 0.2,
    lastmod: new Date().toISOString()
  }
];

async function generateSitemap() {
  try {
    // Create a sitemap stream
    const sitemap = new SitemapStream({ hostname });
    
    // Create write stream for sitemap.xml in the dist folder
    const writeStream = createWriteStream(resolve('./dist/sitemap.xml'));
    
    // Pipe sitemap to write stream
    sitemap.pipe(writeStream);
    
    // Add routes to sitemap
    routes.forEach(route => {
      sitemap.write(route);
    });
    
    // End the stream
    sitemap.end();
    
    // Wait for sitemap to be written
    await streamToPromise(sitemap);
    
    console.log('✅ Sitemap generated successfully at dist/sitemap.xml');
    console.log(`📋 Generated sitemap with ${routes.length} URLs`);
    console.log('🔗 Routes included:');
    routes.forEach(route => console.log(`   ${route.url}`));
    
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

    // Write robots.txt to dist folder
    import('fs').then(fs => {
      fs.writeFileSync(resolve('./dist/robots.txt'), robotsContent);
      console.log('✅ robots.txt generated successfully at dist/robots.txt');
    });
    
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error);
  }
}

// Run the function
generateSitemap();