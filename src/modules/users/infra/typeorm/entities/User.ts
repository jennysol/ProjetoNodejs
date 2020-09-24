import {
   Entity, 
   Column, 
   PrimaryGeneratedColumn, 
   CreateDateColumn, 
   UpdateDateColumn
  } from 'typeorm';

//KISS - Keep It Simple & Stupid

@Entity('users') // Siginifica que a classe é um parametro que estamos passando para a nossa entidade
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default User;
