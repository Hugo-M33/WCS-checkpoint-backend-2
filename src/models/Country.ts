import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Country {
  @Field((type) => ID)
  @PrimaryColumn({ generated: false })
  // @ts-ignore
  code: string;

  @Field()
  @Column()
  // @ts-ignore
  name: string;

  @Field()
  @Column()
  // @ts-ignore
  emoji: string;
}
