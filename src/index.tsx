#!/usr/bin/env tsx

import { render, Box, Text, Newline } from 'ink';
import TextInput from 'ink-text-input';
import { useState, memo } from 'react';
import { Command } from 'commander';
import { setupCommands, executeCommand } from './commands';
import type { CommandOutput } from './commands';

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
  const [program] = useState<Command>(() => setupCommands());

  const handleSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Add timestamped input to logs
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] > ${trimmed}`,
    ]);

    // Execute command
    const result: CommandOutput = await executeCommand(value, program);

    // Add result to logs
    setLogs((prev) => [
      ...prev,
      result.success ? `✓ ${result.message}` : `✗ ${result.message}`,
    ]);

    // Update status if there's data
    if (result.data) {
      setStatus(JSON.stringify(result.data, null, 2));
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