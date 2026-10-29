/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/CaseStudy/WaterOnClick',
        destination: '/clients',
        permanent: true,
      },
      {
        source: '/casestudy/wateronclick',
        destination: '/clients',
        permanent: true,
      },
      {
        source: '/careers/hr-operations-executive',
        destination: '/careers/hr-operations-associate',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/',
        permanent: false,
      },
      {
        source: '/blogs',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
