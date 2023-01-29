import { AxiosResponse } from 'axios';
import apiClient from './http-base';
import PostSchema from '../types/PostSchema';

class PostDataService {
  fetchPost(): Promise<AxiosResponse> {
    return apiClient.get('/posts');
  }

  fetchPostsByEmail(email: string): Promise<AxiosResponse> {
    return apiClient.get(`/posts/${email}`);
  }

  addPost(data: PostSchema): Promise<AxiosResponse> {
    return apiClient.post('/posts', data);
  }

  deletePost(postId: string): Promise<AxiosResponse> {
    return apiClient.delete(`/posts/${postId}`);
  }

  updatePost(data: PostSchema, postId: string): Promise<AxiosResponse> {
    return apiClient.put(`/posts/${postId}`, data);
  }
}

export default new PostDataService();
