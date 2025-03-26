import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.sessionsService.findByUserId(userId);
  }

  @Patch(':id/deactivate')
  deactivateSession(@Param('id') id: string) {
    return this.sessionsService.deactivateSession(id);
  }

  @Patch('user/:userId/deactivate-all')
  deactivateAllUserSessions(@Param('userId') userId: string) {
    return this.sessionsService.deactivateAllUserSessions(userId);
  }

  @Patch(':id/update-activity')
  updateLastActivity(@Param('id') id: string) {
    return this.sessionsService.updateLastActivity(id);
  }
}