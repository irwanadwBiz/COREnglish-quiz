import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  title: string;

  @MaxLength(200, { message: 'Description must not exceed 200 characters' })
  description?: string;
}
