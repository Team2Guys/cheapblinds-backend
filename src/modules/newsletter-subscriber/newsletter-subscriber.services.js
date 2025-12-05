import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update } = repository;
const { ensureResourceExists } = commonUtils;

export const newsletterSubscriberServices = {
  createNewsletterSubscriber: (input) => write.newsletterSubscriber(input),

  getNewsletterSubscriberList: () => read.newsletterSubscriberList(),

  getNewsletterSubscriberById: async (id) => {
    await ensureResourceExists("newsletterSubscriber", id);
    return read.newsletterSubscriberById(id);
  },

  updateNewsletterSubscriberById: async (id, input) => {
    await ensureResourceExists("newsletterSubscriber", id);
    return update.newsletterSubscriberById(id, input);
  },
};
