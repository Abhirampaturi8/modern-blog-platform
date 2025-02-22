import React, { useState } from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Article } from '../types/article';
import { useBookmarkStore } from '../store/bookmarks';
import { useLikesStore } from '../store/likes';
import { cn } from '../lib/utils';
import { CommentSection } from './CommentSection';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const { isLiked, toggleLike } = useLikesStore();
  const bookmarked = isBookmarked(article.id);
  const liked = isLiked(article.id);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  return (
    <>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={article.user.profile_image}
              alt={article.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{article.user.name}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(article.published_at), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleLike(article.id)}
                className="flex items-center space-x-1 group"
              >
                <Heart
                  className={cn('w-5 h-5 transition-colors', {
                    'text-red-500 fill-current': liked,
                    'text-gray-500 group-hover:text-red-500': !liked,
                  })}
                />
                <span className="text-sm text-gray-500">
                  {article.public_reactions_count + (liked ? 1 : 0)}
                </span>
              </button>
              <button
                onClick={() => setShowComments(true)}
                className="flex items-center space-x-1 group"
              >
                <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                <span className="text-sm text-gray-500">
                  {article.comments_count}
                </span>
              </button>
            </div>
            <button
              onClick={toggleBookmark}
              className="focus:outline-none"
              aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Bookmark
                className={cn('w-5 h-5', {
                  'text-blue-500 fill-current': bookmarked,
                  'text-gray-500': !bookmarked,
                })}
              />
            </button>
          </div>
        </div>
      </article>
      {showComments && (
        <CommentSection
          articleId={article.id}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}