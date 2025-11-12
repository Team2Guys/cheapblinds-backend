import { categoryRepository } from "./category.repository.js";
import { subcategoryRepository } from "./subcategory.repository.js";
import { userRepository } from "./user.repository.js";
import { otpRepository } from "./otp.repository.js";
import { productRepository } from "./product.repository.js";

export const repository = {
  read: {
    ...categoryRepository.read,
    ...otpRepository.read,
    ...userRepository.read,
    ...subcategoryRepository.read,
    ...productRepository.read,
  },

  write: {
    ...categoryRepository.write,
    ...otpRepository.write,
    ...userRepository.write,
    ...subcategoryRepository.write,
    ...productRepository.write,
  },

  update: {
    ...categoryRepository.update,
    ...userRepository.update,
    ...subcategoryRepository.update,
    ...productRepository.update,
  },

  remove: {
    ...categoryRepository.remove,
    ...userRepository.remove,
    ...subcategoryRepository.remove,
    ...productRepository.remove,
  },
};
