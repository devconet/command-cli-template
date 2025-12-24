// src/runtime/runCommand.ts
import { Cli } from 'clipanion';
import { OutputBuffer } from './OutputBuffer';

export async function runCommand(
  cli: Cli,
  input: string
): Promise<{ stdout: string; stderr: string }> {
  const stdout = new OutputBuffer();
  const stderr = new OutputBuffer();

  await cli.run(input.split(/\s+/), {
    stdout,
    stderr,
  });

  
  return {
    stdout: stdout.toString(),
    stderr: stderr.toString(),
  };
}
