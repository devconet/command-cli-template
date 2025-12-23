#!/usr/bin/env tsx;

import { render, Box, Text, Newline, Spacer, useFocus, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { useState, useEffect } from 'react';
import { Command } from 'commander';
import { setupCommands, executeCommand } from './commands';
import type { CommandOutput } from './commands';

function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('Ready');
  const [program] = useState<Command>(() => setupCommands());

  const handleSubmit = async (value: string) => {
    if (!value.trim()) return;

    setLogs((prev) => [...prev, `> ${value}`]);

    const result: CommandOutput = await executeCommand(value, program);

    setLogs((prev) => [
      ...prev,
      result.success ? `✓ ${result.message}` : `✗ ${result.message}`
    ]);

    if (result.data) {
      setStatus(JSON.stringify(result.data, null, 2));
    }

    setInput('');
  };

  return (
    <Box flexDirection="column" height="100%">
      {/* Top: Dashboard */}
      <Box flexGrow={1} padding={1} borderStyle="round">
        <Text bold color="green">My TUI CLI Dashboard</Text>
        <Newline />
        <Text>Status: {status}</Text>
        <Newline />
        <Text>Recent Commands:</Text>
        {logs.slice(-10).map((log, i) => (
          <Text key={i} dimColor>{log}</Text>
        ))}
      </Box>

      {/* Bottom: Prompt */}
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