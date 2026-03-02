import { supabase } from "@/lib/supabaseClient";
import { Post } from "@/types/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getLatestPosts() {
    const { data, error } = await supabase
        .from('posts_view')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    if (error) {
        console.error("Error fetching latest posts:", error);
        return [];
    }
    return data as Post[];
}

export async function BlogSection() {
    const posts = await getLatestPosts();

    if (posts.length === 0) return null;

    return (
        <section id="blog" className="py-20 sm:py-28 bg-accent/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-primary mb-4">
                            Insights sobre Arquitectura y Ejecución
                        </h2>
                        <p className="text-lg text-foreground/70">
                            Exploramos cómo la ingeniería operativa y la IA están redefiniendo el control y la escalabilidad empresarial.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/blog">Ver todos los artículos</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogPostCard post={post} key={post.post_id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
