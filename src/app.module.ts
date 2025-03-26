import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'teachy',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //TODO: Set to false in production
    }),
    UsersModule,
    SchoolsModule,
    SessionsModule,
    AuthModule,
    CommonModule,
  ],
})
export class AppModule {}