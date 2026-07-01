import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class DiscussionsService {
  private get db() {
    return admin.firestore();
  }

  async getPostsByCommunity(communityId: string) {
    try {
      if (!admin.apps.length) throw new Error('Firebase Admin not initialized');
      const snapshot = await this.db.collection('community_posts')
        .where('communityId', '==', communityId)
        .orderBy('createdAt', 'desc')
        .get();
        
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.warn('Firestore unavailable in DiscussionsService. Returning mock posts.', error.message);
      return [
        {
          id: 'p1',
          communityId,
          title: 'Welcome to the Community!',
          content: 'This is a mock post because Firestore is unconfigured.',
          author: 'Admin',
          time: 'Just now',
          likes: 10,
          comments: 2,
          tags: ['Welcome'],
        }
      ];
    }
  }

  async createPost(uid: string, communityId: string, postData: any) {
    try {
      if (!admin.apps.length) throw new Error('Firebase Admin not initialized');
      
      const newPost = {
        communityId,
        authorId: uid,
        author: postData.authorName || 'Unknown User',
        title: postData.title,
        content: postData.content,
        tags: postData.tags || [],
        likes: 0,
        comments: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await this.db.collection('community_posts').add(newPost);
      return { id: docRef.id, ...newPost };
    } catch (error) {
      console.warn('Firestore unavailable. Mocking post creation.', error.message);
      return { id: 'mock-post-id', ...postData, authorId: uid, likes: 0, comments: 0 };
    }
  }
}
