import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { ListCommentDto } from './dtos/list-comment.dto'

@Injectable()
export class AppService {
  @InjectRepository(Comment) commentRepository: Repository<Comment>

  async listComment(listCommentDto: ListCommentDto) {
    const comments = await this.commentRepository.find({
      where: { locale: listCommentDto.locale, product: { id: listCommentDto.productId } },
    })

    return {
      totalCount: comments.length,
      comments,
    }
  }

  createComment(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(
      this.commentRepository.create({
        product: { id: createCommentDto.productId },
        user: { id: createCommentDto.userId },
        content: createCommentDto.comment,
        locale: createCommentDto.locale,
      }),
    )
  }
}
