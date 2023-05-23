import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Continent } from "./Continent.js";

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

  @ManyToOne((type) => Continent, (continent) => continent.countries, {
    cascade: ["insert"],
    nullable: true,
  })
  @Field((returns) => Continent, { nullable: true })
  // @ts-ignore
  continent?: Continent;
}
