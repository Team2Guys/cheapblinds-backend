import { newsletterSubscriberServices } from "./newsletter-subscriber.services.js";
import { commonUtils } from "#utils/index.js";

const { handlePromise } = commonUtils;

export const newsletterSubscriberResolvers = {
  Query: {
    newsletterSubscriberList: handlePromise(() =>
      newsletterSubscriberServices.getNewsletterSubscriberList(),
    ),

    newsletterSubscriberById: handlePromise((_parent, { id }) =>
      newsletterSubscriberServices.getNewsletterSubscriberById(id),
    ),
  },

  Mutation: {
    createNewsletterSubscriber: handlePromise((_parent, { input }) =>
      newsletterSubscriberServices.createNewsletterSubscriber(input),
    ),

    updateNewsletterSubscriberById: handlePromise((_parent, { id, input }) =>
      newsletterSubscriberServices.updateNewsletterSubscriberById(id, input),
    ),
  },
};
