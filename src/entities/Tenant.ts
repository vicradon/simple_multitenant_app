import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tenants" })
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false, name: "database_connection_string" })
  databaseConnectionString!: string;

  @Column({ type: "varchar", nullable: false })
  domain!: string;
}
