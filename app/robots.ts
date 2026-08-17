import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.retapharma.co.uk';
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/api/'],
    },
    sitemap: `${cleanBaseUrl}/sitemap.xml`,
  };
}
