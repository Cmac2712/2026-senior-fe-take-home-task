/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/booking/step-1",
        permanent: false,
      },
      {
        source: "/booking",
        destination: "/booking/step-1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
