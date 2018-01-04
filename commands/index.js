'use strict';

import { ping } from './ping';
import { add } from './add';
import { remove } from './remove';
import { game } from './game';

export const commands = [
  add,
  ping,
  remove,
  game,
];
