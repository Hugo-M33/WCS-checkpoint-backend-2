import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../models/Country.js";
import dataSource from "../dataSource.js";

@Resolver()
export class CountryResolver {
  @Query((returns) => [Country])
  async countries() {
    return dataSource.manager.find(Country);
  }

  @Query((returns) => Country)
  async country(@Arg("code") code: string) {
    return dataSource.manager.findBy(Country, { code });
  }

  @Mutation((returns) => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ) {
    return dataSource.manager.save(Country, {
      code,
      name,
      emoji,
    });
  }
}
