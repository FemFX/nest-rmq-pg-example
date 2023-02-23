import { BaseInterfaceRepository } from '@app/shared';

import { PostEntity } from '../entities/post.entity';

export interface PostRepositoryInterface
  extends BaseInterfaceRepository<PostEntity> {}
