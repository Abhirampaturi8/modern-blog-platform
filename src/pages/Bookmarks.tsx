import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArticles } from '../lib/api';
import { ArticleCard } from '../components/ArticleCard';
import { useBookmarkStore } from '../store/bookmarks';

export function Bookmarks() {
  const { bookmarks } = useBookmarkStore();
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(),
  });

  const bookmarkedArticles = articles?.filter((article) =>
    bookmarks.includes(article.id)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookmarked Articles</h1>
      {bookmarkedArticles?.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No bookmarked articles yet. Start browsing and bookmark articles you'd like to read later!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedArticles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}