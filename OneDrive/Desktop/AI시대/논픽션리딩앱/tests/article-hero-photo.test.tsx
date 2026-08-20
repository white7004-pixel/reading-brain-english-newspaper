import { fireEvent, render, screen } from "@testing-library/react";
import { ArticleHeroPhoto } from "@/components/article-hero-photo";
import type { ArticleHeroImage } from "@/lib/types";

const heroImage: ArticleHeroImage = {
  src: "/article-images/ar1-batch-07/owl-flight.jpg",
  altKo: "날개를 펼쳐 날고 있는 올빼미",
  sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Owl_flying.jpg",
  title: "Owl flying",
  creator: "Tarvo Kuus",
  licenseName: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  isModified: false,
};

it("renders a local photograph with meaningful Korean alternative text", () => {
  render(<ArticleHeroPhoto heroImage={heroImage} visualTheme="owl" variant="home">오늘의 글</ArticleHeroPhoto>);

  expect(screen.getByRole("img", { name: heroImage.altKo })).toHaveAttribute("src", expect.stringContaining("owl-flight.jpg"));
  expect(screen.getByText("오늘의 글")).toBeInTheDocument();
  expect(screen.queryByText(heroImage.creator)).not.toBeInTheDocument();
});

it("shows complete linked attribution in reader mode", () => {
  render(<ArticleHeroPhoto heroImage={heroImage} visualTheme="owl" variant="reader" />);

  expect(screen.getByText(heroImage.title)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: heroImage.creator })).toHaveAttribute("href", heroImage.sourcePageUrl);
  expect(screen.getByRole("link", { name: heroImage.licenseName })).toHaveAttribute("href", heroImage.licenseUrl);
  for (const link of screen.getAllByRole("link")) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  }
});

it("renders the visual theme when no photograph exists", () => {
  const { container } = render(<ArticleHeroPhoto visualTheme="forest" variant="thumb">✦</ArticleHeroPhoto>);

  expect(container.firstChild).toHaveClass("article-hero--forest", "article-hero--fallback");
  expect(screen.getByText("✦")).toBeInTheDocument();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

it("replaces a broken photograph with the visual theme fallback", () => {
  const { container } = render(<ArticleHeroPhoto heroImage={heroImage} visualTheme="owl" variant="reader">대체 화면</ArticleHeroPhoto>);

  fireEvent.error(screen.getByRole("img", { name: heroImage.altKo }));

  expect(screen.queryByRole("img", { name: heroImage.altKo })).not.toBeInTheDocument();
  expect(container.firstChild).toHaveClass("article-hero--owl", "article-hero--fallback");
  expect(screen.getByText("대체 화면")).toBeInTheDocument();
  expect(screen.queryByText(heroImage.creator)).not.toBeInTheDocument();
});
