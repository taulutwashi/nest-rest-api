import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { Auth } from './auth/auth.module';
import { Bookmark } from './bookmark/bookmark.module';
import { User } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    CatsModule, 
    Auth, Bookmark, 
    User, 
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CatsModule]
})

export class AppModule {}
