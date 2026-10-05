import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

const PAGES: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/product-launch', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ai-operations', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ada', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/confiance', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/diagnostic', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/confidentialite', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }))
}
