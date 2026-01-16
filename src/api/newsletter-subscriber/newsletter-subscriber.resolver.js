import { newsletterSubscriberServices } from './newsletter-subscriber.service.js';
import { commonUtils } from '#lib/index.js';
import { validate } from '#lib/validation.lib.js';
import {
  createNewsletterSubscriberSchema,
  updateNewsletterSubscriberSchema,
  sendNewsletterEmailSchema
} from './newsletter-subscriber.validation.js';
import { emailServices } from '../email/email.service.js';

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
    createNewsletterSubscriber: handlePromise((_parent, { input }) => {
      const validated = validate(createNewsletterSubscriberSchema, input);
      return newsletterSubscriberServices.createNewsletterSubscriber(validated);
    }),

    updateNewsletterSubscriberById: handlePromise((_parent, { id, input }) => {
      const validated = validate(updateNewsletterSubscriberSchema, input);
      return newsletterSubscriberServices.updateNewsletterSubscriberById(
        id,
        validated
      );
    }),

    sendNewsletterEmail: handlePromise((_parent, { input }) => {
      const validated = validate(sendNewsletterEmailSchema, input);
      return emailServices.sendNewsletterEmail(validated);
    })
  }
};
