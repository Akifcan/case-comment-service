import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from './product.entity'
import { User } from './user.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  content: string

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
