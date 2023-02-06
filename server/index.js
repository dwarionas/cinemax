import 'dotenv/config';

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import cors from 'cors';
import resolvers from "./root.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`server started on ${PORT} port`));

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });
const schema = buildSchema(schemaString);

app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: resolvers,
    }),
);


