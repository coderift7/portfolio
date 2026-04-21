import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { siteConfig, siteUrl } from "@/config/site";



export const metadata: Metadata = {
  title: `Blog – ${siteConfig.name}`,
  description:
    "Tipps und Einblicke rund um Webdesign, SEO und KI-Optimierung für kleine Unternehmen.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: `Blog – ${siteConfig.name}`,
    description:
      "Tipps und Einblicke rund um Webdesign, SEO und KI-Optimierung für kleine Unternehmen.",
    url: `${siteUrl}/blog/`,
    type: "website",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog – ${siteConfig.name}`,
    description:
      "Tipps und Einblicke rund um Webdesign, SEO und KI-Optimierung für kleine Unternehmen.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: siteUrl + "/",
    },
    { "@type": "ListItem", position: 2, name: "Blog" },
  ],
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <main id="main" className="min-h-screen bg-background pt-24 pb-24 lg:pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Startseite
          </Link>

          <div className="mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Blog
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Wissen, das Ihnen weiterhilft
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Praktische Tipps rund um Webdesign, Sichtbarkeit bei Google und
              KI-Optimierung — verständlich erklärt.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">
              Noch keine Beiträge vorhanden.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-depth transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/[0.06] px-2.5 py-0.5 text-xs font-medium text-primary"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
