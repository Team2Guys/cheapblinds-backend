import { searchService } from './search.service.js';
import { commonUtils } from '#lib/index.js';
import { searchInputSchema } from './search.validation.js';
import { validate } from '#lib/validation.lib.js';

const { handlePromise } = commonUtils;

export const searchResolvers = {
  Query: {
    search: handlePromise((_parent, { input }) => {
      const validatedInput = validate(searchInputSchema, input);
      return searchService.search(validatedInput);
    })
  }
};
