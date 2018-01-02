'use strict';

import { ping } from './ping';
import { add } from './add';
import { remove } from './remove';

export const commands = [
  add,
  ping,
  remove,
];
