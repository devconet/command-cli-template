import { Option } from 'clipanion';
import { BaseCommand } from '../BaseCommand';
import type { CommandOutput } from '../BaseCommand';

/* -------------------------------------------------- */
/* Exit command                                       */
/* -------------------------------------------------- */
export class ExitCommand extends BaseCommand {
  static paths = [['exit'], ['quit'], ['q']];

  run(): CommandOutput {
    process.exit(0);
    return { success: true, message: 'Exiting...' };
  }
}