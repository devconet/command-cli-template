import { Option } from 'clipanion';
import { BaseCommand } from '../BaseCommand';
import type { CommandOutput } from '../BaseCommand';

/* -------------------------------------------------- */
/* Status command                                     */
/* -------------------------------------------------- */
export class StatusCommand extends BaseCommand {
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