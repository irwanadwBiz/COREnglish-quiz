import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTaskDto {
  @IsNotEmpty({ message: 'Task ID is required' })
  @IsUUID('4', { message: 'Task ID must be a valid UUID v4' })
  id: string;
}
