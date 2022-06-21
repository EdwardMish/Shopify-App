import express from 'express';
import { getCustomerTagsById } from '../Utils/index.js';
const router = express.Router();

router.post('/promotions', async (req, res) => {
  console.log('promotions', req.body);
  const { customer_id } = req.body;
  var resBody = {};
  if (!customer_id) {
    resBody = { type: 'simple_action_list', actions: [] };
    return res.status(200).json({ ...resBody });
  }

  const customerTags = await getCustomerTagsById(customer_id);
  console.log('tags', customerTags);

  var discount = 0.0,
    message = '';
  if (customerTags.includes('SHIFT40/60')) {
    discount = 0.4;
    message = 'Shift 40% Discount';
  } else if (customerTags.includes('vip20')) {
    discount = 0.2;
    message = 'VIP 20% discount';
  } else if (customerTags.includes('vip15')) {
    discount = 0.15;
    message = 'VIP 15% discount';
  } else if (customerTags.includes('vip10')) {
    discount = 0.1;
    message = 'VIP 10% discount';
  } else if (customerTags.includes('vip5')) {
    discount = 0.05;
    message = 'VIP 5% discount';
  }

  resBody = {
    type: 'simple_action_list',
    points_label: 'POS Discount',
    points_balance: '',
    actions: [
      {
        type: 'percent_discount',
        title: message,
        description: message,
        action_id: '123AasdfBC',
        value: discount.toString(),
      },
    ],
  };
  return res.status(200).json({ ...resBody });
});

router.post('/perform_action', (req, res) => {
  var resBody = {
    type: 'simple_action_list',
    points_label: 'POS Discount',
    points_balance: '',
    actions: [],
  };

  return res.status(200).send({ ...resBody });
});

router.post('/revert_action', (req, res) => {
  console.log('revert', req.body);
  var resBody = {
    type: 'simple_action_list',
    points_label: 'POS Discount',
    points_balance: 'Reverted',
    actions: [],
  };

  return res.status(200).send({ ...resBody });
});

export default router;
