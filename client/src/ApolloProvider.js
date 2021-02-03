import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
} from "@apollo/client";

import {setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri:  "http://localhost:4000"
})

const authlink = setContext((_,{headers}) =>{
  const token = localStorage.getItem('token')
  console.log("token",token)
  return {
    headers: {
      ...headers,
      jwtauth: token ? `${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authlink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = (props) => {
  return <Provider client={client} {...props} />;
};

export default ApolloProvider;
