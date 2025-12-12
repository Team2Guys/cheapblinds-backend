import { newsletterSubscriberServices } from './newsletter-subscriber.service.js';
import { commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;

export const newsletterSubscriberResolvers = {
  Query: {
    newsletterSubscriberList: handlePromise(() =>
      newsletterSubscriberServices.getNewsletterSubscriberList()
    ),

    newsletterSubscriberById: handlePromise((_parent, { id }) =>
      newsletterSubscriberServices.getNewsletterSubscriberById(id)
    ),

    newsletterSubscriberByEmail: handlePromise((_parent, { email }) =>
      newsletterSubscriberServices.getNewsletterSubscriberByEmail(email)
    )
  },

  Mutation: {
    createNewsletterSubscriber: handlePromise((_parent, { input }) =>
      newsletterSubscriberServices.createNewsletterSubscriber(input)
    ),

    updateNewsletterSubscriberById: handlePromise((_parent, { id, input }) =>
      newsletterSubscriberServices.updateNewsletterSubscriberById(id, input)
    ),

    sendNewsletterEmail: handlePromise((_parent, { input }) =>
      emailServices.sendNewsletterEmail(input)
    )
  }
};
