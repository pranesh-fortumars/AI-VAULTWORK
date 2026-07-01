import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private get collection() {
    return admin.firestore().collection('users');
  }

  async getProfile(uid: string, email: string) {
    const doc = await this.collection.doc(uid).get();
    
    if (!doc.exists) {
      // Auto-create pending profile for new Firebase users
      const newProfile = {
        email,
        status: 'Pending',
        roleId: null,
        permissions: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await this.collection.doc(uid).set(newProfile);
      return { id: uid, ...newProfile };
    }
    
    return { id: doc.id, ...doc.data() };
  }

  async upgradeToSuperAdmin(email: string) {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) {
      throw new NotFoundException('User not found. Please log in first to create a profile.');
    }
    const doc = snapshot.docs[0];
    await doc.ref.update({
      status: 'Active',
      roleId: 'Super Administrator',
      permissions: ['*'], 
    });
    return { success: true, message: `${email} has been upgraded to Super Administrator.` };
  }

  async getPendingUsers() {
    const snapshot = await this.collection.where('status', '==', 'Pending').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async approveUser(uid: string, approvalData: { roleId: string; department: string; permissions: string[] }) {
    const doc = await this.collection.doc(uid).get();
    if (!doc.exists) throw new NotFoundException('User not found');
    
    await doc.ref.update({
      status: 'Active',
      roleId: approvalData.roleId,
      department: approvalData.department,
      permissions: approvalData.permissions,
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    return { success: true };
  }

  async suspendUser(uid: string) {
    const doc = await this.collection.doc(uid).get();
    if (!doc.exists) throw new NotFoundException('User not found');
    
    await doc.ref.update({
      status: 'Suspended',
    });
    
    return { success: true };
  }
}
