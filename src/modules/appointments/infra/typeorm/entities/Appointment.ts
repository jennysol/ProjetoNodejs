import { 
  Entity,
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments') // Siginifica que a classe é um parametro que estamos passando para a nossa entidade
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date; 
}
export default Appointment;
