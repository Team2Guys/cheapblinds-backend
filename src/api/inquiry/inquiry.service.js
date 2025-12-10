import { inquiryRepository } from './inquiry.repository.js';

const { write, read, update, remove } = inquiryRepository;

export const inquiryServices = {
  createInquiry: (input) => write.inquiry(input),

  getInquiryList: () => read.inquiryList(),

  getInquiryById: (id) => read.inquiryById(id),

  updateInquiryById: (id, input) => update.inquiryById(id, input),

  removeInquiryById: (id) => remove.inquiryById(id)
};
