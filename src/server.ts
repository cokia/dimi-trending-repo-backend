import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://docker.cloudus.io/dimi-tranding-repo-test',{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', function(){
    console.log("✅Connected to mongod server✅");
});

const app = express();

const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
});

app.use('*', cors());

app.use(compression());

server.applyMiddleware({ app, path: '/' });

const httpServer = createServer(app);

httpServer.listen(
    { port: 3000 },
    (): void => console.log(`\n🚀 GraphQL is now running on http://localhost:3000/graphql`));
