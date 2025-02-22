import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArticles, getTags } from '../lib/api';
import { ArticleCard } from '../components/ArticleCard';

export function Home() {
  const [selectedTag, setSelectedTag] = useState<string>();

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['articles', selectedTag],
    queryFn: () => getArticles(selectedTag),
  });

  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h1>
        {!tagsLoading && tags && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                !selectedTag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {tags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {articlesLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md h-96 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}