import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { MessagePattern } from '@nestjs/microservices'
import { CreateCommentDto } from './dtos/create-comment.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'list-comment' })
  listComment(createCommentDto: CreateCommentDto) {
    return createCommentDto
  }
}
