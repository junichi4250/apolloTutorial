import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import {
  ApolloProvider as ApolloHooksProvider,
  useMutation,
  useQuery,
} from "react-apollo-hooks";

import { appClient } from "./graphql/client";
import { GET_USERS, CREATE_USER } from "./graphql/tags/MyUser";

// ユーザー表示用のリスト
const UserList = () => {
  const { data, error, loading } = useQuery(GET_USERS);

  if (loading) {
    return <div>Loading...</div>;
  };

  if (error) {
    return `Error! ${error.message}`;
  };

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

// 新規ユーザー作成
const UserInput = () => {
  const [state, setState] = useState("");

  const createUser = useMutation(CREATE_USER, {
    update: (proxy, { data: { createUser } }) => {
      // ユーザー新規作成後にキャッシュを更新
      proxy.writeQuery({
        query: GET_USERS,
        data: {
          users: createUser,
        },
      });
    },
    variables: { name: state },
  });

  const onChange = (e) => {
    setState(e.currentTarget.value);
  };

  return (
    <div>
      <input type="text" value={state} onChange={onChange} />
      <button onClick={createUser}>Add</button>
    </div>
  );
};

export const App = () => (
  <ApolloProvider client={appClient}>
    <ApolloHooksProvider client={appClient}>
      <UserInput />
      <UserList />
    </ApolloHooksProvider>
  </ApolloProvider>
);
