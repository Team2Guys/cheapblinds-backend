import { categoryRepository } from "./category.repository.js";
import { subCategoryRepository } from "./subCategory.repository.js";
import { userRepository } from "./user.repository.js";
import { otpRepository } from "./otp.repository.js";
import { productRepository } from "./product.repository.js";

export const repository = {
  read: {
    ...categoryRepository.read,
    ...otpRepository.read,
    ...userRepository.read,
    ...subCategoryRepository.read,
    ...productRepository.read,
  },

  write: {
    ...categoryRepository.write,
    ...otpRepository.write,
    ...userRepository.write,
    ...subCategoryRepository.write,
    ...productRepository.write,
  },

  update: {
    ...categoryRepository.update,
    ...userRepository.update,
    ...subCategoryRepository.update,
    ...productRepository.update,
  },

  remove: {
    ...categoryRepository.remove,
    ...userRepository.remove,
    ...subCategoryRepository.remove,
    ...productRepository.remove,
  },
};
