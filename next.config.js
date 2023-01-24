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
