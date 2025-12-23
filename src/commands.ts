// src/commands.ts
import { Command } from 'commander';

export interface CommandOutput {
  success: boolean;
  message: string;
  data?: any;
}

export function setupCommands(): Command {
  const program = new Command();

  program
    .name('my-cli')
    .version('1.0.0')
    .description('My awesome TUI CLI');

  // Greet command
  program
    .command('greet')
    .description('Greet someone')
    .argument('<name>', 'name to greet')
    .option('-t, --title <title>', 'title', 'Mr.')
    .action(((name: string, options: { title?: string }) => {
      const title = options.title || 'Mr.';
      return {
        success: true,
        message: `Hello ${title} ${name}!`,
        data: { name, title },
      } as CommandOutput;
    }) as any);

  // Status command
  program
    .command('status')
    .description('Show current status')
    .action((() => {
      return {
        success: true,
        message: 'System is running smoothly!',
        data: {
          uptime: process.uptime(),
          memory: process.memoryUsage().heapUsed,
        },
      } as CommandOutput;
    }) as any);

  // Help command
  program
    .command('help')
    .description('Show help')
    .action((() => {
      return {
        success: true,
        message: program.helpInformation(),
      } as CommandOutput;
    }) as any);

  // Exit command
  program
    .command('exit')
    .aliases(['quit', 'q'])
    .description('Exit the application')
    .action((() => {
      console.log('Goodbye! 👋');
      process.exit(0);
      // The return below is never reached, but satisfies type
      return { success: true, message: 'Exiting...' } as CommandOutput;
    }) as any);

  // Handle unknown commands
  program.on('command:*', () => {
    return {
      success: false,
      message: `Unknown command: ${program.args.join(' ')}. Type "help" for available commands.`,
    } as CommandOutput;
  });

  return program;
}

export async function executeCommand(
  commandLine: string,
  program: Command
): Promise<CommandOutput> {
  try {
    const trimmed = commandLine.trim();
    if (!trimmed) {
      return { success: false, message: 'No command provided' };
    }

    const args = trimmed.split(/\s+/);
    const cmdName = args[0]?.toLowerCase(); // still string | undefined

    if (!cmdName) {
      return { success: false, message: 'No command name provided' };
    }

    const cmd = program.commands.find(
      c => c.name() === cmdName || c.aliases().includes(cmdName)
    );

    if (!cmd) {
      return {
        success: false,
        message: `Unknown command: ${cmdName}. Type "help" for available commands.`,
      };
    }

    // Success fallback if no error occurred
    return {
      success: true,
      message: `Executed ${cmdName}`,
    };
    // ... rest of the function
  } catch (err: any) {
    return { success: false, message: err.message || 'Command failed' };
  }
}