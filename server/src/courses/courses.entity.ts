import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';

@Entity('courses')
export class Courses {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  courseName: string;

  @Column({ nullable: true })
  instructor: string;

  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable()
  users: User[]
}