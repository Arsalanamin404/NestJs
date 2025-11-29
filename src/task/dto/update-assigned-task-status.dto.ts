import { IsEnum } from 'class-validator';
import { Status } from 'src/generated/prisma/enums';

export class UpdateAssignedTaskStatusDto {
  @IsEnum(Status)
  status!: Status;
}
