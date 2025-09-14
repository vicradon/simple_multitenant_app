import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  displayName: string;

  @Column({ type: "varchar", nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;
}
