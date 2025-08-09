import { IsOptional, IsString, IsIn, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTasksFilterDto {
  @IsOptional()
  @IsString()
  @IsIn(['TO_DO', 'IN_PROGRESS', 'DONE'], {
    message: 'Status must be one of: TO_DO, IN_PROGRESS, DONE',
  })
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  limit?: number = 10;
}
