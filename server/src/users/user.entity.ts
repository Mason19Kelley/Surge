
import { Organization } from '../organizations/organization.entity';
import { Role } from '../roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// user typeorm entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email:string;

  @Column()
  adminName: string;


  @ManyToOne(() => Role, role => role.users, {eager: true})
  @JoinColumn()
  role: Role;

  @ManyToOne(() => Organization, organization => organization.users, {eager: true})
  @JoinColumn()
  organization: Organization;
}