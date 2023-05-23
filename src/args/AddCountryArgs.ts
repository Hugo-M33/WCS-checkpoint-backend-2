import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class AddCountryArgs {
  @Field()
  // @ts-ignore
  code: string;

  @Field()
  // @ts-ignore
  name: string;

  @Field()
  // @ts-ignore
  emoji: string;

  @Field()
  codeContinent?: string;
}
