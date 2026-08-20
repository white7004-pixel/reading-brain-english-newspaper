import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const selections = [
  ["File:Owl flying.jpg", "owl-flight.jpg", "CC BY-SA 4.0"],
  ["File:Low tide - geograph.org.uk - 171211.jpg", "ocean-tides.jpg", "CC BY-SA 2.0"],
  ["File:Macro Fingerprints.jpg", "fingerprints.jpg", "CC BY 2.0"],
  ["File:The stone bridge over the ancient Pinarus river, now known as Payas, Hatay, Turkey (36847107133).jpg", "ancient-bridge.jpg", "CC BY-SA 2.0"],
  ["File:Eastsound WA - glassblower - raw.jpg", "glassblower.jpg", "CC BY-SA 3.0"],
  ["File:Noodler's Black fountain pen ink writing samples.jpg", "ink-writing.jpg", "CC BY-SA 4.0"],
  ["File:Beeldhouwersgereedschap - Voorthuizen - 20246709 - RCE.jpg", "sculpture-tools.jpg", "CC BY-SA 4.0"],
  ["File:BBC Symphony Orchestra at the Royal Albert Hall.jpg", "orchestra.jpg", "CC BY 4.0"],
  ["File:Origami Paper Crane.jpg", "origami.jpg", "CC BY-SA 3.0"],
  ["File:Talking with the hands (cropped).jpg", "honest-conversation.jpg", "CC BY 3.0"],
  ["File:AGM Annual General Meeting of a typical small (141 member) volunteer organisation.jpg", "group-decisions.jpg", "CC BY-SA 4.0"],
  ["File:Back to school snacks water bottle notebook backpack (20503811429).jpg", "school-bag.jpg", "CC BY 2.0"],
  ["File:Old books, desk lamp and computer.jpg", "reading-focus.jpg", "CC BY-SA 4.0"],
  ["File:Japan tea ceremony 1165.jpg", "tea-ceremony.jpg", "CC BY-SA 4.0"],
  ["File:Kites flying high and people looking up at the Sydney Kite Festival.jpg", "kites.jpg", "CC BY 4.0"],
];

const headers = { "User-Agent": "NonfictionLab/1.0 (educational image curation; local asset downloader)" };
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchImageWithBackoff(url, title) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, { headers });
    if (response.ok) return response;
    if (response.status !== 429 || attempt === 5) {
      throw new Error(`Image download failed for ${title}: ${response.status}`);
    }
    const retryAfterSeconds = Number(response.headers.get("retry-after")) || attempt * 3;
    process.stdout.write(`rate limited for ${title}; retrying in ${retryAfterSeconds}s\n`);
    await wait(retryAfterSeconds * 1000);
  }
  throw new Error(`Image download failed for ${title}`);
}
const api = new URL("https://commons.wikimedia.org/w/api.php");
api.search = new URLSearchParams({
  action: "query",
  format: "json",
  prop: "imageinfo",
  iiprop: "url|extmetadata",
  iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl|ObjectName",
  iiurlwidth: "1600",
  titles: selections.map(([title]) => title).join("|"),
}).toString();

const metadataResponse = await fetch(api, { headers });
if (!metadataResponse.ok) throw new Error(`Commons metadata request failed: ${metadataResponse.status}`);
const metadata = await metadataResponse.json();
const pages = Object.values(metadata.query?.pages ?? {});
const byTitle = new Map(pages.map((page) => [page.title, page]));
const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(projectRoot, "public", "article-images", "ar1-batch-07");
await mkdir(outputDirectory, { recursive: true });

for (const [title, filename, expectedLicense] of selections) {
  const page = byTitle.get(title);
  const info = page?.imageinfo?.[0];
  const ext = info?.extmetadata;
  const license = ext?.LicenseShortName?.value;
  const creator = String(ext?.Artist?.value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const imageUrl = info?.thumburl;

  if (!page || !info || !imageUrl) throw new Error(`Missing image metadata for ${title}`);
  if (!creator) throw new Error(`Missing creator for ${title}`);
  if (license !== expectedLicense) throw new Error(`License changed for ${title}: expected ${expectedLicense}, received ${license}`);

  const imageResponse = await fetchImageWithBackoff(imageUrl, title);
  const contentType = imageResponse.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) throw new Error(`Non-image response for ${title}: ${contentType}`);
  const bytes = Buffer.from(await imageResponse.arrayBuffer());
  if (bytes.length === 0) throw new Error(`Empty image response for ${title}`);
  await writeFile(join(outputDirectory, filename), bytes);
  process.stdout.write(`${filename}\t${bytes.length} bytes\t${license}\t${creator}\n`);
  await wait(1500);
}
