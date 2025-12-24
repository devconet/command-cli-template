import { Option } from 'clipanion';
import { BaseCommand } from '../BaseCommand';
import type { CommandOutput } from '../BaseCommand';

/* -------------------------------------------------- */
/* Help command                                       */
/* -------------------------------------------------- */
export class HelpCommand extends BaseCommand {
  static paths = [['help']];

  run(): CommandOutput {
    return {
      success: true,
      message: this.cli.usage(null),
    };
  }
}
