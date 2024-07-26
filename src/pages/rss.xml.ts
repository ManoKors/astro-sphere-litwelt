import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"

type Context = {
  site: string
}

export async function GET(context: Context) {
  const posts = await getCollection("blog")
  const projects = await getCollection("projects")
  const fantasybooks = await getCollection("fantasybooks")

  // Debugging: Log the collections
  console.log("Posts:", posts)
  console.log("Projects:", projects)
  console.log("Fantasybooks:", fantasybooks)

  const items = [...posts, ...projects, ...fantasybooks]

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

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
  })
}