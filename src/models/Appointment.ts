import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // Siginifica que a classe é um parametro que estamos passando para a nossa entidade
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}
export default Appointment;
