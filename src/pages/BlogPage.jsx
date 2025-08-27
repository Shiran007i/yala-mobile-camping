// src/pages/BlogPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import BlogPost from '../components/Blog/BlogPost'

const BlogPage = () => {
  const navigate = useNavigate()

  const handleBackToMain = () => {
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>Mobile Camping Blog | Yala National Park Wildlife Adventures</title>
        <meta name="description" content="Read about revolutionary mobile camping experiences in Yala National Park, wildlife encounters, and safari adventures in Sri Lanka." />
        <meta name="keywords" content="yala mobile camping blog, sri lanka safari blog, wildlife camping stories, yala national park experiences" />
        <link rel="canonical" href="https://yalamobilecamping.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Mobile Camping Blog | Yala National Park Wildlife Adventures" />
        <meta property="og:description" content="Read about revolutionary mobile camping experiences in Yala National Park, wildlife encounters, and safari adventures in Sri Lanka." />
        <meta property="og:url" content="https://yalamobilecamping.com/blog" />
        <meta property="og:type" content="article" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Yala Mobile Camping Blog",
            "description": "Revolutionary mobile camping experiences and wildlife adventures in Yala National Park",
            "url": "https://yalamobilecamping.com/blog",
            "author": {
              "@type": "Organization",
              "name": "Yala Mobile Camping"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "Yala Mobile Camping",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yalamobilecamping.com/images/logo.webp"
              }
            }
          })}
        </script>
      </Helmet>

      <BlogPost onBackToMain={handleBackToMain} />
    </>
  )
}

export default BlogPage

// Alternative: If you want a blog listing page instead of directly showing the blog post
// Uncomment below and comment out the above if you prefer this approach:

/*
// src/pages/BlogPage.jsx - Blog Listing Version
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import camp3 from '../assets/images/camp3.webp'

const BlogPage = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  const blogPosts = [
    {
      id: 1,
      title: "Revolutionary Mobile Camping Inside Yala National Park: A New Era of Wildlife Adventure",
      excerpt: "Experience Sri Lanka's wilderness like never before with authentic mobile camping deep in the heart of Yala's untamed jungle",
      date: "August 21, 2025",
      author: "Yala Mobile Camping",
      image: camp3,
      slug: "revolutionary-mobile-camping-yala"
    }
    // Add more blog posts here as you create them
  ]

  return (
    <>
      <Helmet>
        <title>Blog | Yala Mobile Camping - Wildlife Adventures & Safari Stories</title>
        <meta name="description" content="Read inspiring stories, expert tips, and insights about mobile camping and wildlife adventures in Yala National Park, Sri Lanka." />
        <meta name="keywords" content="yala mobile camping blog, sri lanka safari stories, wildlife camping tips, yala national park experiences" />
        <link rel="canonical" href="https://yalamobilecamping.com/blog" />
        
        <meta property="og:title" content="Blog | Yala Mobile Camping - Wildlife Adventures & Safari Stories" />
        <meta property="og:description" content="Read inspiring stories, expert tips, and insights about mobile camping and wildlife adventures in Yala National Park, Sri Lanka." />
        <meta property="og:url" content="https://yalamobilecamping.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header onNavigate={handleNavigation} />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog & Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the wild side of Sri Lanka through our adventures, expert insights, and conservation stories from Yala National Park
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4" />
                          <time>{post.date}</time>
                          <span>•</span>
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                          <Link to={`/blog/${post.slug}`} className="hover:text-emerald-600 transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  <Link to="/blog/category/wildlife" className="block text-gray-600 hover:text-emerald-600 transition-colors">
                    Wildlife Encounters
                  </Link>
                  <Link to="/blog/category/camping" className="block text-gray-600 hover:text-emerald-600 transition-colors">
                    Camping Tips
                  </Link>
                  <Link to="/blog/category/photography" className="block text-gray-600 hover:text-emerald-600 transition-colors">
                    Wildlife Photography
                  </Link>
                  <Link to="/blog/category/conservation" className="block text-gray-600 hover:text-emerald-600 transition-colors">
                    Conservation Stories
                  </Link>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-8 mt-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Join Our Newsletter</h3>
                <p className="text-emerald-700 mb-6">Get the latest wildlife stories and camping tips delivered to your inbox.</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={handleNavigation} />
    </>
  )
}

export default BlogPage
*/
