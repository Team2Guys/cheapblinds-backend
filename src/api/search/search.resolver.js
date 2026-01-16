import { searchService } from './search.service.js';
import { commonUtils } from '#lib/index.js';

const { handlePromise } = commonUtils;

export const searchResolvers = {
  Query: {
    search: handlePromise((_parent, { input }) => searchService.search(input))
  }
};
