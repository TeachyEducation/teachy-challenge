import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolsRepository: Repository<School>,
  ) {}

  create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolsRepository.create(createSchoolDto);
    return this.schoolsRepository.save(school);
  }

  findAll(): Promise<School[]> {
    return this.schoolsRepository.find();
  }

  async findOne(id: string): Promise<School> {
    const school = await this.schoolsRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID "${id}" not found`);
    }
    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);
    this.schoolsRepository.merge(school, updateSchoolDto);
    return this.schoolsRepository.save(school);
  }

  async remove(id: string): Promise<void> {
    const school = await this.findOne(id);
    await this.schoolsRepository.remove(school);
  }
}