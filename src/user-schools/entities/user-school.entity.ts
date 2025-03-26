import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { School } from '../../schools/entities/school.entity';
import { Role } from '../../common/enums/roles.enum';

@Entity('user_schools')
export class UserSchool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.userSchools)
  user: User;

  @ManyToOne(() => School, school => school.userSchools)
  school: School;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TEACHER
  })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}