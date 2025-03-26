import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSchool } from '../user-schools/entities/user-school.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserSchool)
    private userSchoolRepository: Repository<UserSchool>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if(!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async findUserSchools(userId: string) {
    const userSchools = await this.userSchoolRepository.find({
      where: { user: { id: userId } },
      relations: ['school'],
    });

    return userSchools.map(userSchool => ({
      id: userSchool.school.id,
      name: userSchool.school.name,
      role: userSchool.role,
    }));
  }

  async addUserToSchool(userId: string, schoolId: string, role: Role) {
    const userSchool = this.userSchoolRepository.create({
      user: { id: userId },
      school: { id: schoolId },
      role,
    });
    return this.userSchoolRepository.save(userSchool);
  }

  async updateUserRoleInSchool(userId: string, schoolId: string, newRole: Role) {
    const userSchool = await this.userSchoolRepository.findOne({
      where: { user: { id: userId }, school: { id: schoolId } },
    });

    if (!userSchool) {
      throw new NotFoundException('User is not associated with this school');
    }

    userSchool.role = newRole;
    return this.userSchoolRepository.save(userSchool);
  }
}