import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "medical_record" })
export class MedicalRecord extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  patientName: string;

  @Column({ type: "varchar", nullable: false })
  diagnosis: string;

  @Column({ type: "varchar", nullable: false })
  doctorName: string;
}
