module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.generated.photos',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'div2egd5483q4.cloudfront.net',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: []
        }
      ]
    ]
  }
}
