import { cloudinary } from "#config/index.js";

export const fileServices = {
  uploadFile: async (file) => {
    const { mimetype, createReadStream } = await file;

    const isVideo = mimetype.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    const stream = createReadStream();

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "uploads",
            resource_type: resourceType,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(stream);
    });

    return {
      status: "success",
      message: "File uploaded",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
      },
    };
  },

  deleteFile: async (publicId) => {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error("Failed to delete image from Cloudinary");
    }

    return {
      status: "success",
      message: "File deleted successfully",
    };
  },
};
