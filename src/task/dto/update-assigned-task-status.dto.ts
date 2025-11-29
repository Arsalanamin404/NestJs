import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/generated/prisma/enums';

export class UpdateAssignedTaskStatusDto {
  @IsString()
  @IsNotEmpty()
  assignedToUserId!: string;

  @IsEnum(Status)
  status!: Status;
}
