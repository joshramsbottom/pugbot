'use strict';

import { ping } from './ping';
import { add } from './add';
import { remove } from './remove';
import { game } from './game';
import { help } from './help';
import { addRole } from './addRole';
import { rollMap } from './rollMap';

export const commands = [
  add,
  ping,
  remove,
  game,
  help,
  () => addRole(process.env.TANK_ROLE, 'tank'),
  () => addRole(process.env.FLEX_ROLE, 'flex'),
  () => addRole(process.env.DPS_ROLE, 'dps'),
  () => addRole(process.env.SUPPORT_ROLE, 'support'),
  rollMap,
];
