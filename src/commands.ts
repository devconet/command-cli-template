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
abstract class BaseCommand extends Command {
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





/* -------------------------------------------------- */
/* Greet command                                      */
/* -------------------------------------------------- */
class GreetCommand extends BaseCommand {
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

/* -------------------------------------------------- */
/* Status command                                     */
/* -------------------------------------------------- */
class StatusCommand extends BaseCommand {
  static paths = [['status']];

  run(): CommandOutput {
    return {
      success: true,
      message: 'System is running smoothly!',
      data: {
        uptime: process.uptime(),
        memory: process.memoryUsage().heapUsed,
      },
    };
  }
}


/* -------------------------------------------------- */
/* Help command                                       */
/* -------------------------------------------------- */
class HelpCommand extends BaseCommand {
  static paths = [['help']];

  run(): CommandOutput {
    return {
      success: true,
      message: this.cli.usage(null),
    };
  }
}


/* -------------------------------------------------- */
/* Exit command                                       */
/* -------------------------------------------------- */
class ExitCommand extends BaseCommand {
  static paths = [['exit'], ['quit'], ['q']];

  run(): CommandOutput {
    process.exit(0);
    return { success: true, message: 'Exiting...' };
  }
}

/* -------------------------------------------------- */
/* CLI setup                                          */
/* -------------------------------------------------- */
export function setupCommands(): Cli {
  const cli = new Cli({
    binaryLabel: 'my-cli',
    binaryName: 'my-cli',
    binaryVersion: '1.0.0',
  });

  cli.register(GreetCommand);
  cli.register(StatusCommand);
  cli.register(HelpCommand);
  cli.register(ExitCommand);

  return cli;
}
