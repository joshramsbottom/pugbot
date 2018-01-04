'use strict';

import { ping } from './ping';
import { add } from './add';
import { remove } from './remove';
import { game } from './game';
import { help } from './help';

export const commands = [
  add,
  ping,
  remove,
  game,
  help,
];
