// src/commands.ts
import { Cli, Command, Option } from 'clipanion';

export interface CommandOutput {
  success: boolean;
  message: string;
  data?: any;
}

/* -------------------------------------------------- */
/* Base command with typed output                      */
/* -------------------------------------------------- */
export abstract class BaseCommand extends Command {
  abstract run(): Promise<CommandOutput> | CommandOutput;

  async execute(): Promise<number | void> {
    const output = await this.run();

    if (output?.message) {
      // Print to Clipanion stdout (captured by runCommand)
      this.context.stdout.write(output.message + '\n');
    }

    return output?.success ? 0 : 1;
  }
}