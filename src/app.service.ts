import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { ListCommentDto } from './dtos/list-comment.dto'
import { AppTransformer } from './app.transformer'
import { Product } from './entities/product.entity'

@Injectable()
export class AppService {
  @InjectRepository(Comment) commentRepository: Repository<Comment>
  @InjectRepository(Product) productRepository: Repository<Product>
  @Inject() appTransformer: AppTransformer

  async listComment(listCommentDto: ListCommentDto) {
    const comments = await this.commentRepository.find({
      select: { id: true, content: true, createdAt: true, user: { id: true, name: true } },
      relations: ['user'],
      where: { locale: listCommentDto.locale, product: { id: listCommentDto.productId } },
      order: { createdAt: -1 },
    })

    return {
      totalCount: comments.length,
      comments: this.appTransformer.commentsToPublicEntity(comments),
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
