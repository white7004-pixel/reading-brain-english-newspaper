"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { ArticleHeroImage } from "@/lib/types";

type ArticleHeroPhotoProps = {
  heroImage?: ArticleHeroImage;
  visualTheme: string;
  variant: "home" | "thumb" | "reader";
  children?: ReactNode;
};

export function ArticleHeroPhoto({ heroImage, visualTheme, variant, children }: ArticleHeroPhotoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showPhoto = Boolean(heroImage && failedSrc !== heroImage.src);
  const className = [
    "article-hero",
    `article-hero--${variant}`,
    `article-hero--${visualTheme}`,
    showPhoto ? "article-hero--has-photo" : "article-hero--fallback",
  ].join(" ");
  const sizes = variant === "thumb" ? "76px" : "(max-width: 640px) 100vw, 560px";
  const photo = showPhoto && heroImage
    ? <Image className="article-hero__image" src={heroImage.src} alt={heroImage.altKo} fill sizes={sizes} loading={variant === "home" ? "eager" : "lazy"} onError={() => setFailedSrc(heroImage.src)} />
    : null;
  const content = children ? <div className="article-hero__content">{children}</div> : null;

  if (variant === "reader") {
    return (
      <figure className={className}>
        <div className="article-hero__frame">{photo}{content}</div>
        {showPhoto && heroImage && <figcaption className="article-hero__credit">
          <span>{heroImage.title}</span>
          <a href={heroImage.sourcePageUrl} target="_blank" rel="noreferrer">{heroImage.creator}</a>
          <a href={heroImage.licenseUrl} target="_blank" rel="noreferrer">{heroImage.licenseName}</a>
        </figcaption>}
      </figure>
    );
  }

  return <div className={className}>{photo}{content}</div>;
}
