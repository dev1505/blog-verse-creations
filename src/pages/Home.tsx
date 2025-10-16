import { Navbar } from '@/components/Navbar';
import { BlogCard } from '@/components/BlogCard';
import { getAllBlogs, useBlog } from '@/contexts/BlogContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

const Home = () => {
  const { posts, setPosts } = useBlog();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const blogs = await getAllBlogs();
      setPosts(blogs);
      setIsLoading(false);
    })();
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Discover Stories & Ideas
          </h1>
          <p className="text-xl text-muted-foreground">
            A place to read, write, and connect with great minds
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))
          ) : (posts && posts?.length) ? posts.map((post, index) => (
            <div key={index} className="animate-fade-in">
              <BlogCard post={post} />
            </div>
          )) : (
            <div className="text-center py-12 col-span-full">
              <p className="text-muted-foreground">No posts yet. Be the first to write!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
