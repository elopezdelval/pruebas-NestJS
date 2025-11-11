import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // convierte la clase en una tabla de base de datos
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  pass: string;
}
