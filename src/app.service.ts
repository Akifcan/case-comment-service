import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AppService {
  @InjectRepository(Comment) commentRepository: Repository<Comment>

  getHello(): string {
    return 'Hello World!'
  }
}
