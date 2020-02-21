import { FirebaseService } from '../services/firebase.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
