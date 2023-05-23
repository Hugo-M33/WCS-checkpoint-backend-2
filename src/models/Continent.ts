import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Country } from "./Country.js";

@ObjectType()
@Entity()
export class Continent {
  @PrimaryColumn()
  @Field()
  // @ts-ignore
  code: string;

  @Column()
  @Field()
  // @ts-ignore
  name: string;

  @OneToMany((type) => Country, (country) => country.continent, {
    cascade: true,
  })
  @Field((returns) => [Country])
  // @ts-ignore
  countries: Country[];
}
