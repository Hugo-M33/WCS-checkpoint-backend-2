import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../models/Country.js";
import dataSource from "../dataSource.js";
import { Continent } from "../models/Continent.js";
import { GraphQLError } from "graphql/error/index.js";

@Resolver()
export class CountryResolver {
  @Query((returns) => [Country])
  async countries() {
    return dataSource.manager.find(Country, { relations: { continent: true } });
  }

  @Query((returns) => Country)
  async country(@Arg("code") code: string) {
    const country = await dataSource.manager.findOne(Country, {
      where: { code },
      relations: { continent: true },
    });

    if (!country) {
      throw new GraphQLError(`Country with code ${code} does not exist.`, {
        extensions: {
          code: "COUNTRY_NOT_FOUND",
        },
      });
    }

    return country;
  }

  @Mutation((returns) => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("codeContinent", { nullable: true }) codeContinent?: string
  ) {
    let continent;
    const country = dataSource.manager.create(Country, { code, name, emoji });

    if (codeContinent) {
      continent = await dataSource.manager.findOneBy(Continent, {
        code: codeContinent,
      });
      if (!continent) {
        continent = dataSource.manager.create(Continent, {
          code: codeContinent,
          name: "Inconnu",
          countries: [],
        });
        await dataSource.manager.save(continent);
      }
    }

    if (continent) {
      country.continent = continent;
    }

    return dataSource.manager.save(Country, country);
  }

  @Query((returns) => [Country])
  async countriesByContinent(@Arg("code") code: string) {
    const continent = await dataSource.manager.findOne(Continent, {
      where: {
        code,
      },
      relations: { countries: true },
    });
    if (!continent) {
      throw new GraphQLError(`Continent with code ${code} does not exist.`, {
        extensions: {
          code: "CONTINENT_NOT_FOUND",
        },
      });
    }
    return continent.countries.map((c) => ({ ...c, continent }));
  }
}
