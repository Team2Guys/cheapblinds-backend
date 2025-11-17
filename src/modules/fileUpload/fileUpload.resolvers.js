import { fileUploadService } from "./fileUpload.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { verifyAccess, verifyRole } = verifications;
const { handleAsync } = commonUtils;

export const fileUploadResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    uploadImage: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { file }) =>
          fileUploadService.upload(file),
        ),
      ),
    ),

    deleteImage: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { input }) =>
          fileUploadService.delete(input.publicId),
        ),
      ),
    ),
  },
};
