import { Option } from 'clipanion';
import { BaseCommand } from '../BaseCommand';
import type { CommandOutput } from '../BaseCommand';

/* -------------------------------------------------- */
/* Greet command                                      */
/* -------------------------------------------------- */
export class GreetCommand extends BaseCommand {
  static paths = [['greet']];

  name = Option.String({ required: true });
  title = Option.String('-t,--title', 'Mr.');

  async run(): Promise<CommandOutput> {
    return {
      success: true,
      message: `Hello ${this.title} ${this.name}!`,
      data: { name: this.name, title: this.title },
    };
  }
}