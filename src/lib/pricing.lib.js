import axios from 'axios';

import { env } from '#config/index.js';

const {
  ILLUMIN8S_BASE_URL,
  ILLUMIN8S_FABRIC_PRICE_ENDPOINT,
  ILLUMIN8S_OPTIONS_PRICE_ENDPOINT,
  ILLUMIN8S_API_KEY,
  ILLUMIN8S_RETAILER_ID,
  ILLUMIN8S_RETAILER_MASTER_ID,
  ILLUMIN8S_MEASURE_ID
} = env;

const fabricApiUrl = `${ILLUMIN8S_BASE_URL}${ILLUMIN8S_FABRIC_PRICE_ENDPOINT}`;
const optionApiUrl = `${ILLUMIN8S_BASE_URL}${ILLUMIN8S_OPTIONS_PRICE_ENDPOINT}`;

export const getFabricPrice = async (drop, width, fabricId, blindTypeId) => {
  const response = await axios.get(fabricApiUrl, {
    params: {
      key: ILLUMIN8S_API_KEY,
      drop,
      width,
      fabricid: fabricId,
      blindtypeid: blindTypeId,
      userid: ILLUMIN8S_RETAILER_ID,
      retailermasterid: ILLUMIN8S_RETAILER_MASTER_ID,
      measureid: ILLUMIN8S_MEASURE_ID
    }
  });

  return response.data[0];
};

export const getOptionsPrice = async (drop, width, fabricId, blindTypeId) => {
  const response = await axios.get(optionApiUrl, {
    params: {
      key: ILLUMIN8S_API_KEY,
      drop,
      width,
      fabricid: fabricId,
      blindtypeid: blindTypeId,
      retailerId: ILLUMIN8S_RETAILER_ID,
      retailermasterid: ILLUMIN8S_RETAILER_MASTER_ID
    }
  });

  return response.data;
};
