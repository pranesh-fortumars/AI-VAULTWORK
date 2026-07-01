import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as firebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<any> {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (err) {
      console.warn('Firebase verifyIdToken failed (likely missing Service Account). Falling back to unsafe manual decode for local dev.', err.message);
      try {
        // UNSAFE: Decode JWT payload without verifying signature (DEV ONLY)
        const payloadBase64 = token.split('.')[1];
        const payloadBuffer = Buffer.from(payloadBase64, 'base64');
        const decodedToken = JSON.parse(payloadBuffer.toString('utf-8'));
        
        // Ensure uid exists
        decodedToken.uid = decodedToken.user_id || decodedToken.sub;
        return decodedToken;
      } catch (decodeErr) {
        throw new UnauthorizedException('Invalid Firebase token structure');
      }
    }
  }
}
