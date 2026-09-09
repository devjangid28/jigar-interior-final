import { useEffect } from 'react';

const SITE_URL = 'https://jigarinterior.com';

export default function usePageMeta({ title, description, path, image, schema }) {
  useEffect(() => {
    const prevDesc = document.querySelector('meta[name="description"]');
    const prevDescVal = prevDesc ? prevDesc.getAttribute('content') : null;
    const prevCanonical = document.querySelector('link[rel="canonical"]');
    const prevCanonicalHref = prevCanonical ? prevCanonical.getAttribute('href') : null;
    const prevTitle = document.title;

    document.title = title;

    let desc = prevDesc;
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', description);

    let canonical = prevCanonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${path}`);

    let scriptNode = document.getElementById('page-schema');
    if (!scriptNode) {
      scriptNode = document.createElement('script');
      scriptNode.type = 'application/ld+json';
      scriptNode.id = 'page-schema';
      document.head.appendChild(scriptNode);
    }

    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title.split('|')[0].trim(),
      url: `${SITE_URL}${path}`,
      image: image ? `${SITE_URL}${image}` : `${SITE_URL}/logo.PNG`,
      description,
      provider: {
        '@type': 'InteriorService',
        name: 'Jigar Interiors',
        url: SITE_URL,
        telephone: '+91-97244-41259',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'A-8, Govardhan Township, Waghodia Dabhoi Ring Road',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          postalCode: '390025',
          addressCountry: 'IN',
        },
      },
      areaServed: ['Vadodara', 'Gujarat'],
      ...(schema || {}),
    };
    scriptNode.textContent = JSON.stringify(baseSchema);

    return () => {
      document.title = prevTitle;
      if (prevDesc && prevDescVal !== null) prevDesc.setAttribute('content', prevDescVal);
      if (prevCanonical && prevCanonicalHref !== null) prevCanonical.setAttribute('href', prevCanonicalHref);
      const node = document.getElementById('page-schema');
      if (node) node.remove();
    };
  }, [title, description, path, image, schema && JSON.stringify(schema)]);
}