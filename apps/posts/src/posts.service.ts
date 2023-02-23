import { PostEntity } from '@app/shared/entities/post.entity';
import { PostRepositoryInterface } from '@app/shared/interfaces/posts.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createPost(post) {
    const { title, text } = post;
    console.log(title, text);

    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }
  async getAllPosts() {
    return this.postsRepository.find();
  }
}
