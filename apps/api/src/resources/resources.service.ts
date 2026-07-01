import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ResourcesService {
  private get db() {
    return admin.firestore();
  }

  async getResources(communityId: string) {
    try {
      if (!admin.apps.length) throw new Error('Firebase not initialized');
      const snapshot = await this.db.collection('community_resources')
        .where('communityId', '==', communityId)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Firestore missing in ResourcesService. Mocking response.');
      return [
        { id: 1, title: 'React Performance Cheat Sheet', type: 'PDF', size: '2.4 MB', author: 'Sarah J.', tags: ['React', 'Perf'] },
        { id: 2, title: 'Complete Guide to System Design', type: 'Link', author: 'Mark T.', tags: ['System Design'] },
        { id: 3, title: 'Q3 Interview Prep Guide', type: 'Doc', size: '15 KB', author: 'Admin', tags: ['Interviews'] },
        { id: 4, title: 'GraphQL Best Practices', type: 'Video', size: '45 mins', author: 'Sarah J.', tags: ['GraphQL'] },
      ];
    }
  }
}
