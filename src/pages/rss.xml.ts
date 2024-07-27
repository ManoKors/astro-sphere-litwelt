import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@consts";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const posts = await getCollection("blog");
  const projects = await getCollection("projects");
  const fantasybooks = await getCollection("fantasybooks");

  const items = [...posts, ...projects, ...fantasybooks];

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  // Logging for debugging
  console.log("Items:", items);
  
  // Check if fantasybooks are included
  const fantasybooksItems = items.filter(item => item.slug.startsWith("fantasybooks"));
  console.log("Fantasybooks Items:", fantasybooksItems);

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: item.slug.startsWith("blog")
        ? `/blog/${item.slug}/`
        : item.slug.startsWith("projects")
        ? `/projects/${item.slug}/`
        : item.slug.startsWith("fantasybooks")
        ? `/fantasybooks/${item.slug}/`
        : `/`,  // Fallback if the slug does not match any known categories
    })),
  });
}
