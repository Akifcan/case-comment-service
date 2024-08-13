import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from './app.module'
import { AppService } from './app.service'
import { Locale } from './shared/shared.types'

describe('ProductService', () => {
  let service: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    service = module.get<AppService>(AppService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should list the comments', async () => {
    const products = await service.productRepository.find({ take: 3 })
    const response = await service.listComment({ locale: Locale.en, productId: products[0].id })

    expect(response).toHaveProperty('totalCount')
    expect(response).toHaveProperty('comments')
    expect(response.totalCount).toBeGreaterThanOrEqual(1)
    expect(Array.isArray(response.comments)).toBe(true)

    const comment = response.comments[0]
    expect(comment).toHaveProperty('id')
    expect(comment).toHaveProperty('content')
    expect(comment).toHaveProperty('createdAt')
    expect(comment).toHaveProperty('user')
  })
})
