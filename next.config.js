/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async redirects() {
  //   console.log("redirects");
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
  //       permanent: true,
  //     },
  //   ];
  // },
  // async rewrites() {
  //   console.log("rewrites");
  //   return {
  //     beforeFiles: [
  //       {
  //         source: "/api/:path*",
  //         destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
  //       },
  //     ],
  //   };
  // },
};

module.exports = nextConfig;
