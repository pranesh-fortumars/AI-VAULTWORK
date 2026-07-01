import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class CommunitiesService {
  private get db() {
    return admin.firestore();
  }

  async getAllCommunities() {
    try {
      if (!admin.apps.length) throw new Error('Firebase Admin not initialized');
      const snapshot = await this.db.collection('communities').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.warn('Firestore unavailable in CommunitiesService. Returning mock data.', error.message);
      return [
        { id: 'c1', name: 'React Native Developers', members: 1250, category: 'tech', tags: ['React', 'Mobile'] },
        { id: 'c2', name: 'Product Management Hub', members: 850, category: 'career', tags: ['PM'] },
      ];
    }
  }

  async getUserCommunities(uid: string) {
    try {
      if (!admin.apps.length) throw new Error('Firebase Admin not initialized');
      const membersSnapshot = await this.db.collection('community_members').where('userId', '==', uid).get();
      const communityIds = membersSnapshot.docs.map(doc => doc.data().communityId);
      
      if (communityIds.length === 0) return [];
      
      const comms = [];
      for (const id of communityIds) {
        const doc = await this.db.collection('communities').doc(id).get();
        if (doc.exists) comms.push({ id: doc.id, ...doc.data() });
      }
      return comms;
    } catch (error) {
      return [{ id: 'c1', name: 'React Native Developers', members: 1250, category: 'tech', role: 'Member' }];
    }
  }

  async joinCommunity(uid: string, communityId: string) {
    try {
      if (!admin.apps.length) throw new Error('Firebase Admin not initialized');
      const communityRef = this.db.collection('communities').doc(communityId);
      const communityDoc = await communityRef.get();
      if (!communityDoc.exists) throw new NotFoundException('Community not found');

      const memberRef = this.db.collection('community_members').doc(`${uid}_${communityId}`);
      await memberRef.set({
        userId: uid,
        communityId,
        role: 'Member',
        joinedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Increment member count
      await communityRef.update({
        members: admin.firestore.FieldValue.increment(1)
      });

      return { success: true };
    } catch (error) {
      console.warn('Firestore unavailable. Mocking success.');
      return { success: true };
    }
  }
}
