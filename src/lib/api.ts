import axios from 'axios';
import { Article, Comment } from '../types/article';

const api = axios.create({
  baseURL: 'https://dev.to/api',
});

export const getArticles = async (tag?: string): Promise<Article[]> => {
  const params = tag ? { tag } : {};
  const { data } = await api.get('/articles', { params });
  return data;
};

export const getTags = async (): Promise<string[]> => {
  const { data } = await api.get('/tags');
  return data.map((tag: any) => tag.name);
};

export const getComments = async (articleId: number): Promise<Comment[]> => {
  const { data } = await api.get(`/comments?a_id=${articleId}`);
  return data;
};