import { Injectable } from '@nestjs/common'
import { Comment } from './entities/comment.entity'

@Injectable()
export class AppTransformer {
  commentsToPublicEntity(comments: Comment[]) {
    return comments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: new Date(comment.createdAt).toLocaleDateString(),
        user: comment.user ? { name: comment.user.name } : { name: 'External Comment' },
      }
    })
  }
}
