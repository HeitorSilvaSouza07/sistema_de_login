import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tblUser')
export class User {
    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;
    @Column({type: 'varchar', length: 255})
    emailUser!: string;

    @Column({type: 'varchar', length: 255})
    passwordUser!: string;

}