/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "propelrr.com",
        port: "", // Хэрвээ порт хэрэглэгдээгүй бол хоосон үлдээнэ
        pathname: "/wp-content/uploads/**", // Зургийн зам (бүх зургийг зөвшөөрөхийн тулд)
      },
    ],
  },
};

module.exports = nextConfig;