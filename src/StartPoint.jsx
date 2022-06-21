import React from 'react';

import { HomePage } from './containers/HomePage';
import POS from './containers/pos';

export default function StartPoint({ isPOS }) {
  return isPOS ? <POS /> : <HomePage />;
}
