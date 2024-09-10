import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  location: string;
}
