import { gql } from "graphql-tag";

export const fileUploadTypeDefs = gql`
  scalar Upload

  type UploadedFile {
    imageUrl: String!
    publicId: String!
    resourceType: String!
  }

  input DeleteFileInput {
    publicId: String!
  }

  type FileUploadResponse {
    status: String!
    message: String!
    data: UploadedFile
  }

  type DeleteResponse {
    status: String!
    message: String!
  }

  type Mutation {
    uploadImage(file: Upload!): FileUploadResponse!
    deleteImage(input: DeleteFileInput!): DeleteResponse!
  }
`;
