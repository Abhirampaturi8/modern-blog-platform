import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '../lib/api';
import { Comment } from '../types/article';

interface CommentSectionProps {
  articleId: number;
  onClose: () => void;
}

export function CommentSection({ articleId, onClose }: CommentSectionProps) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => getComments(articleId),
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto p-4 max-h-[calc(80vh-4rem)]">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : !comments || comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={`comment-${comment.id}`} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={comment.user.profile_image}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{comment.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(comment.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: comment.body_html }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}