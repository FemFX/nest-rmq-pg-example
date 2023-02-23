import { Controller, Inject } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SharedService } from '@app/shared';

@Controller()
export class PostsController {
  constructor(
    @Inject('PostsServiceInterface')
    private readonly postsService: PostsService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-all-posts' })
  async getAllPosts(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    return this.postsService.getAllPosts();
  }
  @MessagePattern({ cmd: 'create-post' })
  async createPost(@Ctx() context: RmqContext, @Payload() post) {
    this.sharedService.acknowledgeMessage(context);
    return this.postsService.createPost(post);
  }
}
