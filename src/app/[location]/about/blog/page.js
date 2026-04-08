import BlogLibrary from "@/components/about/blog/Bloglibrary";
import { getArticles, getCategories } from "@/lib/strapi";

export default async function BlogPage({ params }) {
    const { location } = await params;

    // Fetch all articles and categories in parallel
    const [articles, categories] = await Promise.all([
        getArticles(),
        getCategories(),
    ]);

    return (
        <BlogLibrary
            articles={articles ?? []}
            categories={categories ?? []}
            location={location}
        />
    );
}