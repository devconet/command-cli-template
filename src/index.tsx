#!/usr/bin/env tsx

import { render, Box, Text, Newline } from 'ink';
import TextInput from 'ink-text-input';
import { useState, memo } from 'react';
import { setupCommands } from './commands';
import type { CommandOutput } from './commands';
import { runCommand } from './runCommand';
import { Cli } from 'clipanion';

// Memoized Dashboard to prevent unnecessary re-renders on every keystroke
const Dashboard = memo(({ logs, status }: { logs: string[]; status: string }) => (
  <Box flexDirection="column" flexGrow={1} padding={1} borderStyle="round">
    <Text bold color="green">My TUI CLI Dashboard</Text>
    <Newline />
    <Text>Status: {status}</Text>
    <Newline count={2} />

    <Text bold>Recent Commands:</Text>
    <Newline />

    {logs.length === 0 ? (
      <Text dimColor italic>No commands yet...</Text>
    ) : (
      logs.map((log, i) => (
        <Text key={i} dimColor>
          {log}
        </Text>
      ))
    )}
  </Box>
));

function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('Ready');
  const [cli] = useState<Cli>(() => setupCommands());

  const handleSubmit = async (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return;

  // Add timestamped input to logs
  setLogs((prev) => [
    ...prev,
    `[${new Date().toLocaleTimeString()}] > ${trimmed}`,
  ]);

  // Execute command using Clipanion
  try {
    const { stdout, stderr } = await runCommand(cli, trimmed);

    if (stdout) {
      setLogs((prev) => [...prev, `✓ ${stdout}`]);
    }
    if (stderr) {
      setLogs((prev) => [...prev, `✗ ${stderr}`]);
    }
  } catch (err: any) {
    setLogs((prev) => [...prev, `✗ ${err.message ?? 'Command failed'}`]);
  }

  // Clear input
  setInput('');
};


  return (
    <Box flexDirection="column" height="100%">
      {/* Dashboard */}
      <Dashboard logs={logs} status={status} />

      {/* Prompt */}
      <Box paddingX={1} borderStyle="single">
        <Text>❯ </Text>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder="Type a command (e.g., greet John --title Dr.)"
        />
      </Box>
    </Box>
  );

}

render(<App />);