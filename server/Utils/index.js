import { Shopify } from '@shopify/shopify-api';
import dotenv from 'dotenv';

dotenv.config();

const client = new Shopify.Clients.Graphql(
  process.env.SHOP_PROD || '',
  process.env.SHOPIFY_API_PWD_PROD
);

export const getCustomerTagsById = async (id) => {
  const query = `{
        customer(id: "gid://shopify/Customer/${id}") {
            tags
        }
      }`;
  const { body } = await client.query({
    data: query,
  });
  return body.data.customer.tags;
};
