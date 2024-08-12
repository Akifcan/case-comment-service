import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { MessagePattern } from '@nestjs/microservices'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { ListCommentDto } from './dtos/list-comment.dto'

@Controller()
export class AppController {
  @Inject() appService: AppService

  @MessagePattern({ cmd: 'list-comment' })
  listComment(listCommentDto: ListCommentDto) {
    return this.appService.listComment(listCommentDto)
  }

  @MessagePattern({ cmd: 'create-comment' })
  createComment(createCommentDto: CreateCommentDto) {
    return this.appService.createComment(createCommentDto)
  }
}
