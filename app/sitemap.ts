import { MetadataRoute } from 'next';
import { products } from '@/lib/data';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.retapharma.co.uk';
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const lastModDate = new Date('2025-01-15T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${cleanBaseUrl}`,
      lastModified: lastModDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${cleanBaseUrl}/shop`,
      lastModified: lastModDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${cleanBaseUrl}/retatrutide`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${cleanBaseUrl}/mt2`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${cleanBaseUrl}/peptide-information`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${cleanBaseUrl}/laboratory-testing`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${cleanBaseUrl}/peptide-calculator`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${cleanBaseUrl}/batch-data`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${cleanBaseUrl}/blog`,
      lastModified: lastModDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/about`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/contact`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/faqs`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${cleanBaseUrl}/shipping-policy`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${cleanBaseUrl}/returns-policy`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${cleanBaseUrl}/terms-of-use`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${cleanBaseUrl}/privacy-policy`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${cleanBaseUrl}/disclaimer`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${cleanBaseUrl}/cookie-policy`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${cleanBaseUrl}/shop/${product.slug}`,
    lastModified: lastModDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
