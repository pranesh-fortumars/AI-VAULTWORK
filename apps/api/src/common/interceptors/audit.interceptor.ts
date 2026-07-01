import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as admin from 'firebase-admin';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    // Only log mutating requests (POST, PATCH, PUT, DELETE)
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      const user = req.user ? req.user.email : 'Unauthenticated';
      const ip = req.ip || req.connection.remoteAddress;
      
      return next.handle().pipe(
        tap(() => {
          // Fire-and-forget log to Firestore
          this.logToFirestore(method, url, user, ip, 'SUCCESS').catch(e => 
            this.logger.error(`Failed to write audit log: ${e.message}`)
          );
        })
      );
    }

    return next.handle();
  }

  private async logToFirestore(method: string, url: string, user: string, ip: string, status: string) {
    if (!admin.apps.length) return; // Ignore if Firebase not initialized

    const auditData = {
      action: `${method} ${url}`,
      user,
      ipAddress: ip,
      result: status,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      system: 'VaultWork API',
    };

    await admin.firestore().collection('audit_logs').add(auditData);
  }
}
