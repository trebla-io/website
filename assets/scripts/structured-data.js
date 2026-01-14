/**
 * Structured Data (JSON-LD) for SEO
 * Schema.org markup for Organization, WebSite, and BreadcrumbList
 */

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trebla",
  url: "https://trebla.io",
  logo: "https://trebla.io/assets/media/favicon.svg",
  description:
    "A research and engineering collective bridging theoretical research and applied technology in blockchain and artificial intelligence.",
  foundingDate: "2025",
  sameAs: ["https://github.com/trebla-io"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Technical Support",
    url: "https://github.com/trebla-io",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Open Source Contribution",
          description:
            "Active contribution to core infrastructure, developer tooling, and open protocols that power the decentralized web.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software Engineering Services",
          description:
            "End-to-end engineering for high-stakes environments. Smart contract auditing, full-stack application development, and system architecture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Applied Research",
          description:
            "Applied research in zero-knowledge proofs, agentic AI workflows, and decentralized governance models.",
        },
      },
    ],
  },
};

// WebSite Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trebla",
  url: "https://trebla.io",
  description: "Research & Engineering in Blockchain & AI",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://trebla.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
};

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://trebla.io/",
    },
  ],
};

// Inject schemas into page
function injectStructuredData() {
  const schemas = [organizationSchema, websiteSchema, breadcrumbSchema];

  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectStructuredData);
} else {
  injectStructuredData();
}
