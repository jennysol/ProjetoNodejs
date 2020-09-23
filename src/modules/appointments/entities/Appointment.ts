import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

import User from '../../users/infra/typeorm/entities/User';
/**
 * Um para um )(OntoOne)
 * Um para Muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 */

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
  created_at: string; // DATE

  @UpdateDateColumn()
  updated_at: string; // DATE
}
export default Appointment;
