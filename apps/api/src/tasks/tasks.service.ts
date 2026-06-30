import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class TasksService {
  private get collection() {
    return admin.firestore().collection('tasks');
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const docRef = await this.collection.add({
        ...createTaskDto,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { id: docRef.id, ...createTaskDto };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAllByProject(projectId: string) {
    try {
      const snapshot = await this.collection.where('project_id', '==', projectId).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.collection.doc(id).update({
      ...updateTaskDto,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.collection.doc(id).delete();
    return { success: true };
  }
}
