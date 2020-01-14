import { IResolvers } from "graphql-tools";
import QueryUser from "./Query/User";
import MutationUser from "./Mutation/User";
const resolver: IResolvers = {
  Query: {
    ...QueryUser
  },
  Mutation: {
    ...MutationUser
  }
};
export default resolver;
