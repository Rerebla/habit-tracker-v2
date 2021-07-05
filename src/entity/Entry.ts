import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Entry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.entries)
    user: User;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    date;
}