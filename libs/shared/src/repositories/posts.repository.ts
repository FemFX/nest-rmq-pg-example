import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { UserRepositoryInterface } from '../interfaces/users.repository.interface';
import { PostEntity } from '../entities/post.entity';
import { PostRepositoryInterface } from '../interfaces/posts.repository.interface';

@Injectable()
export class PostsRepository
  extends BaseAbstractRepository<PostEntity>
  implements PostRepositoryInterface
{
  constructor(
    @InjectRepository(PostEntity)
    private readonly PostRepository: Repository<PostEntity>,
  ) {
    super(PostRepository);
  }
}
