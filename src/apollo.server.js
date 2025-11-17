import depthLimit from "graphql-depth-limit";
import { ApolloServer } from "@apollo/server";

import { typeDefs, resolvers } from "#modules/index.js";

// Request/response logger plugin for Apollo
const requestLoggerPlugin = {
  async requestDidStart(requestContext) {
    const { request } = requestContext;
    const operationName = request.operationName || "Unnamed";
    const query = request.query ? request.query.replace(/\s+/g, " ").trim() : "";
    const variables = request.variables || {};
    const hasInlineArgs = query.includes("{") && Object.keys(variables).length === 0;

    console.group(`[GraphQL Request] ${operationName}`);
    console.log("Query:", query);
    if (Object.keys(variables).length > 0) {
      console.log("Variables:", JSON.stringify(variables, null, 2));
    } else if (hasInlineArgs) {
      console.log("Variables: None (inline arguments used)");
    }
    console.groupEnd();

    return {
      async willSendResponse({ response }) {
        const status = response.http?.status || "OK";
        const payload = response.body?.singleResult || response.body || {};
        console.group(`[GraphQL Response] ${operationName}: ${status}`);
        console.log("Response:", JSON.stringify(payload, null, 2));
        console.groupEnd();
      },
    };
  },
};

/**
 * formatError - Production-ready GraphQL error formatter
 * Logs full error details internally, but only exposes safe messages to clients
 */
const formatError = (error) => {
  // Log full error stack for internal monitoring
  if (error.originalError) {
    console.error("GraphQL Error:", {
      message: error.message,
      stack: error.originalError.stack,
      path: error.path,
      extensions: error.extensions,
    });
  } else {
    console.error("GraphQL Error:", error);
  }

  // Only expose safe message to client
  return {
    message: "Something went wrong.", // Generic message
    path: error.path,
    extensions: {
      code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
    },
  };
};

// Initialize Apollo Server
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  introspection: process.env.NODE_ENV !== "production",
  allowBatchedHttpRequests: true,
  validationRules: [depthLimit(5)], // prevent very deep queries
  plugins: [requestLoggerPlugin],
});
