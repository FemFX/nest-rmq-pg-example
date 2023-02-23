import { AuthGuard } from '@app/shared';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('POSTS_SERVICE') private readonly postsService: ClientProxy,
  ) {}

  @Get()
  async getAllPosts() {
    return this.postsService.send(
      {
        cmd: 'get-all-posts',
      },
      {},
    );
  }
  @Post()
  async createPost(@Body('title') title: string, @Body('text') text: string) {
    return this.postsService.send(
      {
        cmd: 'create-post',
      },
      { title, text },
    );
  }

  @Get('auth')
  async getUsers() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('auth')
  async postUser() {
    return this.authService.send(
      {
        cmd: 'post-user',
      },
      {},
    );
  }

  // @UseGuards(AuthGuard)
  // @Get('presence')
  // async getPresence() {
  //   return this.presenceService.send(
  //     {
  //       cmd: 'get-presence',
  //     },
  //     {},
  //   );
  // }

  @Post('auth/register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'register',
      },
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }
}
