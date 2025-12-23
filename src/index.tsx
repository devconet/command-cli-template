#!/usr/bin/env tsx

import { render, Box, Text, Newline, Spacer } from 'ink';
import TextInput from 'ink-text-input';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <Box flexDirection="column" height="100%">
      {/* Top: Dashboard */}
      <Box flexGrow={1} padding={1} borderStyle="round">
        <Text bold color="green">My CLI Dashboard</Text>
        <Newline />
        <Text>Status: Running</Text>
        <Text>Logs:</Text>
        {logs.map((log, i) => (
          <Text key={i} dimColor>{log}</Text>
        ))}
      </Box>

      {/* Bottom: Prompt */}
      <Box paddingX={1} borderStyle="single">
        <Text>❯ </Text>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={(value) => {
            setLogs((prev) => [...prev, `> ${value}`]);
            // Here you can process commands
            setInput('');
          }}
          placeholder="Type a command..."
        />
      </Box>
    </Box>
  );
}

render(<App />);