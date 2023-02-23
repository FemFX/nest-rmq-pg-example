import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ConfigModule } from '@nestjs/config';
import { PostgresDBModule, SharedModule, SharedService } from '@app/shared';
import { PostsRepository } from '@app/shared/repositories/posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@app/shared/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [PostsController],
  providers: [
    {
      provide: 'PostsServiceInterface',
      useClass: PostsService,
    },
    {
      provide: 'PostsRepositoryInterface',
      useClass: PostsRepository,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class PostsModule {}
