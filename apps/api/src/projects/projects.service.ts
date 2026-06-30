import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class ProjectsService {
  private get collection() {
    return admin.firestore().collection('projects');
  }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const docRef = await this.collection.add({
        ...createProjectDto,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { id: docRef.id, ...createProjectDto };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async findAll() {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch projects');
    }
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.collection.doc(id).update({
      ...updateProjectDto,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.collection.doc(id).delete();
    return { success: true };
  }
}
