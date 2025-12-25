# Command Shell Template

A template for building **extensible, command-driven interactive CLIs** with a split terminal UI.

This project provides a foundation for creating a shell-like command-line application where users can:

- Type commands into an interactive prompt
- See command output rendered in a live log panel
- Easily add, remove, or extend commands
- Keep command logic cleanly separated from the UI

It is intended as a **starter template**, not a finished product.

---

## ✨ Features

- Interactive terminal UI with:
  - command input prompt
  - scrollable log/output area
- Command-based architecture
- Clean separation of concerns:
  - command logic
  - command execution/runtime
  - UI
- Designed for easy extensibility
- TypeScript-first

---

## 📁 Project Structure


```
src/
├── cli/               # Defines commands and assembles the CLI.
│   ├── commands/      # Command definitions
├── utilities/         # Various utility functions
├── ui/                # Terminal UI components
└── index.ts           # Main entry point
```

---

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```

---

## 🔧 Customization

To add your own commands:

1. Create a new command file in `src/cli/commands/`
2. Extend the `BaseCommand` class
3. Implement the required methods
4. Register your command in `src/cli/setupCommand.ts`

---

## 📜 License

MIT