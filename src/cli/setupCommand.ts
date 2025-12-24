import { Cli, Command, Option } from 'clipanion';
import { GreetCommand } from './commands/GreetCommand';
import { StatusCommand } from './commands/StatusCommand';
import { HelpCommand } from './commands/HelpCommand';
import { ExitCommand } from './commands/ExitCommand';

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