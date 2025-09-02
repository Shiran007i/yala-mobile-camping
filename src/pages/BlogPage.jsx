// src/pages/BlogPage.jsx
import React from "react";
import BlogPost from "../components/Blog/BlogPost";
import SEO from "../components/SEO.jsx";

const BlogPage = () => {
  const blogSEO = {
    title: "Mobile Camping Blog | Yala National Park Wildlife Adventures",
    description:
      "Read about revolutionary mobile camping experiences in Yala National Park, wildlife encounters, and safari adventures in Sri Lanka.",
    keywords:
      "yala mobile camping blog, sri lanka safari blog, wildlife camping stories",
  };

  return (
    <>
      <SEO
        title={blogSEO.title}
        description={blogSEO.description}
        keywords={blogSEO.keywords}
        canonical="https://yalamobilecamping.com/blog"
      />
      <BlogPost />
    </>
  );
};

export default BlogPage;