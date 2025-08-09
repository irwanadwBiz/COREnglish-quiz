import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Title cannot be longer than 100 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Description cannot be longer than 255 characters',
  })
  description?: string;
}
