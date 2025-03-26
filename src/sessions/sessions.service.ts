import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    private usersService: UsersService,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const user = await this.usersService.findOne(createSessionDto.userId);
    const session = this.sessionsRepository.create({
      ...createSessionDto,
      user,
    });
    return this.sessionsRepository.save(session);
  }

  findAll(): Promise<Session[]> {
    return this.sessionsRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!session) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }
    return session;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const session = await this.findOne(id);
    if (updateSessionDto.userId) {
      session.user = await this.usersService.findOne(updateSessionDto.userId);
    }
    this.sessionsRepository.merge(session, updateSessionDto);
    return this.sessionsRepository.save(session);
  }

  async remove(id: string): Promise<void> {
    const session = await this.findOne(id);
    await this.sessionsRepository.remove(session);
  }

  async findByUserId(userId: string): Promise<Session[]> {
    return this.sessionsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async deactivateSession(id: string): Promise<Session> {
    const session = await this.findOne(id);
    session.isActive = false;
    return this.sessionsRepository.save(session);
  }

  async deactivateAllUserSessions(userId: string): Promise<void> {
    await this.sessionsRepository.update(
      { user: { id: userId }, isActive: true },
      { isActive: false }
    );
  }

  async updateLastActivity(id: string): Promise<Session> {
    const session = await this.findOne(id);
    session.lastActivityAt = new Date();
    return this.sessionsRepository.save(session);
  }
}