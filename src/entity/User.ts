import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from "typeorm";
import { Entry } from './Entry';

@Entity()
@Unique(["token"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ name: "token" })
    token: string;

    @OneToMany(() => Entry, entry => entry.user)
    entries: Entry[];
}
