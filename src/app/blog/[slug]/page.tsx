import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import { siteUrl } from "@/config/site";


export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} – ${siteConfig.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}/`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image && {
        images: [{ url: post.image, alt: post.title }],
      }),
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

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
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: siteUrl + "/blog/",
      },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Michael Höger",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${slug}/`,
    ...(post.image && { image: post.image }),
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <main id="main" className="min-h-screen bg-background pt-24 pb-24 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Link
          href="/blog/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Alle Beiträge
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="blog-content max-w-none text-[15px] leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-secondary [&_strong]:text-foreground [&_strong]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_img]:rounded-xl [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Weitere Beiträge
          </Link>
        </div>
      </div>
      </main>
    </>
  );
}
