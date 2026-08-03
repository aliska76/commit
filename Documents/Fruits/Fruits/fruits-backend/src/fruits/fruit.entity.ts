import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fruits')
export class Fruit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Column()
    description: string;

    @Column()
    imageUrl: string;
}
