import express from "express";
import { graphqlHTTP } from 'express-graphql';
import {schema} from './schema.js'
import {root} from './root.js'
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('Running a GraphQL API server at http://localhost:3000/graphql');
});
