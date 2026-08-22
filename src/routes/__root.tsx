import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import { ChatWidget } from "@/components/site/ChatWidget";
import { CookieConsentBanner } from "@/components/site/CookieConsentBanner";
import { MobileQuickActionDock } from "@/components/site/MobileQuickActionDock";
import { PageLoader } from "@/components/site/PageLoader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "author", content: "One World Solutions / ABHIPRIYA GROUPS LLC" },
      { name: "publisher", content: "One World Solutions" },
      {
        name: "keywords",
        content:
          "passport services company usa, expedited passport renewal usa, 24 hour passport rush, oci card application, surrendered passport certificate, web development company in usa, custom saas development usa, ai agent engineering, react nextjs developers, enterprise software development, digital marketing services in usa, technical seo agency, google ads ppc agency usa",
      },
      {
        name: "description",
        content:
          "USA's premier agency for Expedited US Passport Renewal, Custom Web Application & SaaS Development, and High-ROI Digital Marketing Services. Headquartered in Chicago with nationwide processing.",
      },
      { name: "geo.region", content: "US-IL" },
      { name: "geo.placename", content: "Chicago" },
      { name: "geo.position", content: "41.8781;-87.6298" },
      { name: "ICBM", content: "41.8781, -87.6298" },
      { property: "og:site_name", content: "One World Solutions" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "One World Solutions — Passport Services, Web Development & Digital Marketing USA" },
      {
        property: "og:description",
        content:
          "USA's premier agency for Expedited Passport Renewal, Custom Web & SaaS Development, and High-ROI Digital Marketing. Chicago HQ with nationwide service.",
      },
      { property: "og:url", content: "https://www.oneworldsolutionsusa.com" },
      { property: "og:image", content: "https://www.oneworldsolutionsusa.com/logo-square.png" },
      { property: "og:image:alt", content: "One World Solutions Logo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@oneworldsolutions" },
      { name: "twitter:title", content: "One World Solutions — Passport Services, Web Development & Digital Marketing USA" },
      { name: "twitter:description", content: "Expedited Passport Renewal, Custom SaaS Software & High-ROI Digital Marketing in the USA." },
      { name: "twitter:image", content: "https://www.oneworldsolutionsusa.com/logo-square.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.oneworldsolutionsusa.com" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo-square.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "One World Solutions",
          "url": "https://www.oneworldsolutionsusa.com",
          "logo": "https://www.oneworldsolutionsusa.com/logo-square.png",
          "image": "https://www.oneworldsolutionsusa.com/logo-square.png",
          "telephone": "+1-417-569-0711",
          "email": "support@oneworldsolutionsusa.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Chicago",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60613",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 41.8781,
            "longitude": -87.6298
          },
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2500"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "One World Solutions Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Passport Services Company USA",
                  "description": "Expedited US Passport Renewal, OCI Card Application & Consular Surrender."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Development Company USA",
                  "description": "Custom SaaS Platforms, AI Agents, RAG Vector Search & React Applications."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Marketing Services USA",
                  "description": "Technical SEO, Google/Meta PPC Ads & Conversion Rate Optimization."
                }
              }
            ]
          }
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideSiteChrome =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employee-portal") ||
    pathname.startsWith("/auth");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PageLoader />
        <div className={`flex min-h-screen flex-col bg-background font-sans antialiased ${hideSiteChrome ? "" : "pb-16 sm:pb-0"}`}>
          {!hideSiteChrome && <SiteHeader />}
          <main key={pathname} className="flex-1 transition-all duration-300 animate-in fade-in ease-out">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          {!hideSiteChrome && <SiteFooter />}
        </div>
        {!hideSiteChrome && <ChatWidget />}
        {!hideSiteChrome && <MobileQuickActionDock />}
        {!hideSiteChrome && <CookieConsentBanner />}
        <Toaster position="top-center" />
        <Analytics />
      </AuthProvider>
    </QueryClientProvider>
  );
}
