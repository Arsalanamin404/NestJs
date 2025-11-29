import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { paginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/generated/prisma/enums';
import { UpdateAssignedTaskStatusDto } from './dto/update-assigned-task-status.dto';
import { AssignTaskDto } from './dto/assign-task.dto';

interface RequestWithUser extends Request {
  user: {
    sub: string;
    role: Role;
  };
}

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  // only admin can create tasks
  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() data: CreateTaskDto) {
    return this.taskService.createTask(data);
  }

  // only admin can asign tasks to users
  @Post(':taskId/assign/:userId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  assignTask(
    @Param(new ValidationPipe({ transform: true }))
    params: AssignTaskDto,
  ) {
    return this.taskService.assignTaskToUser({
      taskId: params.taskId,
      assignedToUserId: params.assignedToUserId,
    });
  }

  @Patch(':taskId/status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  updateTaskStatus(
    @Param('taskId') taskid: string,
    @Body() data: UpdateAssignedTaskStatusDto,
    @Req() req: RequestWithUser,
  ) {
    return this.taskService.updateAssignedTaskStatus(
      taskid,
      req.user.sub,
      data,
    );
  }

  @Get(':taskId/status')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  GetTaskStatus(@Param('taskId') taskid: string) {
    return this.taskService.getTaskStatus(taskid);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  updateTask(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return this.taskService.updateTask(id, data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  getAllTasks(
    @Query(new ValidationPipe({ transform: true })) query: paginationDto,
  ) {
    return this.taskService.getAllTasks(query);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getMyTasks(@Req() req: RequestWithUser) {
    return this.taskService.getTasksForUser(req.user.sub);
  }

  @Get('titles')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getAllTaskTitles(
    @Query(new ValidationPipe({ transform: true })) query: paginationDto,
  ) {
    return this.taskService.getAllTaskTitles(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getTask(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
}
