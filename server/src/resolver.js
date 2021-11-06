const resolvers = {
  Query: {
    // helloというQueryがきたらHello Worldを返す
    hello: (root, args, context) => "Hello World",
    // usersというQueryがきたらユーザーを全取得して返す
    users: async (root, args, { dataSources }) => {
      return await dataSources.User.findAll();
    },
  },

  Mutation: {
    // createUserというMutationがきたらユーザーを探して返す（なければ作成）
    createUser: async (root, { name }, { dataSources }) => {
      const user = await dataSources.User.findOrCreate({ where: { name } });
      return user[0].dataValues;
    },
  },
};

module.exports = resolvers;