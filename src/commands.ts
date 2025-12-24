// src/commands.ts
import { Command } from 'commander';

let lastCommandOutput: CommandOutput | null = null;

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
      const output: CommandOutput = {
        success: true,
        message: `Hello ${title} ${name}!`,
        data: { name, title },
      }
        lastCommandOutput = output;
    }) as any);

  // Status command
  program
    .command('status')
    .description('Show current status')
    .action((() => {
  const output: CommandOutput = {
        success: true,
        message: 'System is running smoothly!',
        data: {
          uptime: process.uptime(),
          memory: process.memoryUsage().heapUsed,
        },
      }
        lastCommandOutput = output;
    }) as any);

  // Help command
  program
    .command('help')
    .description('Show help')
    .action((() => {
  const output: CommandOutput = {
        success: true,
        message: program.helpInformation(),
      }
        lastCommandOutput = output;
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
    const program = setupCommands(); // 
    
    const trimmed = commandLine.trim();
    if (!trimmed) {
      return { success: false, message: 'No command provided' };
    }

    const args = trimmed.split(/\s+/);
    const fullArgs = [process.argv[0] || 'node', ...args];

    const cmdName = args[0]?.toLowerCase();

    if (!cmdName) {
      return { success: false, message: 'No command name provided' };
    }

    // Find command to check if it exists
    const cmd = program.commands.find(
      c => c.name() === cmdName || c.aliases().includes(cmdName)
    );

    if (!cmd) {
      return {
        success: false,
        message: `Unknown command: ${cmdName}. Type "help" for available commands.`,
      };
    }

    lastCommandOutput = null;
    // Run the command – this will trigger the .action() handler
    await program.parseAsync(fullArgs, { from: 'user' });

//    if (lastCommandOutput) {
//  return lastCommandOutput;
//}
    // Return success – the action will have already logged or handled output
    return {
      success: true,
      message: `${lastCommandOutput} - Executed ${cmdName}`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Command failed',
    };
  }
}