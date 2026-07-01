import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class JobsService {
  private get db() {
    return admin.firestore();
  }

  async getJobs() {
    try {
      if (!admin.apps.length) throw new Error('Firebase not initialized');
      const snapshot = await this.db.collection('community_jobs').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn('Firestore missing in JobsService. Mocking response.');
      return [
        { id: 1, title: 'Senior Frontend Engineer', company: 'Vercel', location: 'Remote', salary: '$140k - $180k', type: 'Full-time', posted: '2 days ago', featured: true },
        { id: 2, title: 'Product Designer', company: 'Figma', location: 'San Francisco, CA', salary: '$130k - $160k', type: 'Full-time', posted: '5 hours ago', featured: false },
        { id: 3, title: 'React Native Developer', company: 'Meta', location: 'Remote', salary: '$150k - $200k', type: 'Contract', posted: '1 week ago', featured: false }
      ];
    }
  }
}
