/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      'image.tmdb.org',
      'via.placeholder.com'
    ],
  },
}

module.exports = nextConfig