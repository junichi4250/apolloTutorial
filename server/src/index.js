const { ApollpServer, ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");

const resolvers = require("./resolver");

// Userモデル
const User = require("./db/models/User");

// DB接続インスタンス
const { getDB } = require("./db");

const boot = async () => {
  const store = await getDB();

  // ApolloServerを初期化
  const server = new ApolloServer({
    cors: {
      origin: "*",
      credentials: true,
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
      User: new User({ store }),
    }),
  });

  // 指定ポートでの待ち受けを開始
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

boot();
