import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';


const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

const app = express();
app.use(cors());

app.listen(5000, () => console.log('server started on 5000 port'));

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });
const schema = buildSchema(schemaString);


const { results: recData } = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`).then(res => res.json());


const root = {
    getRec: () => {
        return recData
    },
};

app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: root,
    }),
);

