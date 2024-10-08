import { Locale } from '../shared/shared.types'

export class CreateCommentDto {
  productId: number

  userId: number

  comment: string

  locale: Locale
}
