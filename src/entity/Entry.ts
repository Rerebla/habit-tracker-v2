import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum helpMaterial {
    mind = "mind",
    picture = "picture",
    video = "video",
    text = "text",
    audio = "audio"
}
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
    date: Date;

    @Column({
        type: 'enum',
        enum: helpMaterial
    })
    helpMaterial: helpMaterial;

    @Column({ default: "Nothing to add." })
    notes: string;
}
