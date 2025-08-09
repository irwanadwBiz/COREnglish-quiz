import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
    default: 'TO_DO',
  })
  status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
}