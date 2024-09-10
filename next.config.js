/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: { serverActions: true },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        hostname: 'dropshipping-upload.s3.eu-north-1.amazonaws.com',
      },
      {
        hostname: 'api.dunorte.online',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=self',
          },
        ],
      },
    ];
  },
  /*
  async redirects() {
    return [
      //{ source: "/", destination: "/", permanent: true },
      //{ source: '/pickup', destination: '/pickup/home', permanent: true },
    ];
  },*/

  // async rewrites() {
  //   return [
  //     {
  //       source: "/src/actions/:path*",
  //       destination: "http://localhost:3000/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
