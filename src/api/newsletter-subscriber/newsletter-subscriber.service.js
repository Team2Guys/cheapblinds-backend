import createError from 'http-errors';
import { newsletterSubscriberRepository } from './newsletter-subscriber.repository.js';
import { env } from '#config/index.js';

const { write, read, update } = newsletterSubscriberRepository;
const { FRONTEND_URL } = env;

export const newsletterSubscriberServices = {
  createNewsletterSubscriber: async ({ email, ...rest }) => {
    const existingNewsletterSubscriber =
      await read.newsletterSubscriberByEmail(email);
    if (existingNewsletterSubscriber)
      throw createError(400, 'Newsletter subscriber already exists.');

    return write.newsletterSubscriber({ email, ...rest });
  },

  getNewsletterSubscriberList: () => read.newsletterSubscriberList(),

  getNewsletterSubscriberById: (id) => read.newsletterSubscriberById(id),

  getNewsletterSubscriberByEmail: (email) =>
    read.newsletterSubscriberByEmail(email),

  updateNewsletterSubscriberById: (id, input) =>
    update.newsletterSubscriberById(id, input),

  sendNewsletterEmail: async (input) => {
    const { recipientList } = input;

    let sentCount = 0;

    await Promise.all(
      recipientList.map(async (email) => {
        try {
          const existingNewsletterSubscriber =
            await read.newsletterSubscriberByEmail(email);
          if (!existingNewsletterSubscriber) return;

          const sent = await sendEmail('newsletter-email', {
            email,
            subject: 'Newsletter',
            FRONTEND_URL
          });

          if (sent) sentCount++;
        } catch (err) {
          console.error(`Newsletter failed for ${email}: ${err.message}`);
        }
      })
    );

    const total = recipientList.length;

    return {
      message: `Newsletter emails sent ${sentCount} out of ${total}`
    };
  }
};
