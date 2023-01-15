import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import cors from 'cors';
import root from "./root.js";

const app = express();
app.use(cors());
app.listen(5000, () => console.log('server started on 5000 port'));

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });
const schema = buildSchema(schemaString);

app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: root,
    }),
);