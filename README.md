# Task Management Application 📋

## Overview

A task management application built with React, TypeScript, and Material-UI. Features include drag-and-drop task reordering, inline editing, and a task limit system (maximum 4 tasks) to demonstrate error handling.

## Tech Stack

- React + TypeScript + Vite
- Material-UI for components
- Redux Toolkit for state management

- DND Kit for drag-and-drop functionality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   └── ui/             # Basic UI components
├── features/           # Feature-based modules
│   └── tasks/          # Task management feature
│       ├── components/ # Task-specific components
│       └── hooks/      # Custom hooks for feature-specific logic (eg:useTask For single task operations (create, update, toggle) useTasks For list operations and managing the task list (filter, reorder,getting statistics ...))
├── shared/             # Shared utilities and types
│   ├── hooks/         # Common hooks
│   ├── types/         # TypeScript types
│   └── utils/         # common utils
└── store/              # Redux store configuration
    └── slices/        # Redux slices
```

### Component Structure

1. **UI Components**: Pure presentational components without any business logic in `components/ui`
2. **Feature Components**: Feature-specific components in `features/{feature-name}`
3. **Layout Components**: Page layout components in `components/layout`

### State Management

- Use Redux for global state
- Use local state for UI-specific state
- Persist necessary data with Redux Persist

## Code Quality Standards

### ESLint Rules

```javascript
// Strict rules that must be followed
max-len: 120 characters
max-lines: 200 lines per file
max-lines-per-function: 100 lines
max-params: 3 parameters
max-depth: 3 levels nesting
complexity: max 10
no-console: warning
```

### Prettier Configuration

```javascript
{
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false
}
```

### Git Workflow

#### Commit Convention

- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Example: `feat(tasks): add drag-and-drop reordering`

#### Pre-commit Hooks (Husky)

The following checks run before each commit:

1. Prettier formatting
2. ESLint validation
3. TypeScript type checking
4. Conventional commit message validation

**Note**: Commits will be rejected if they don't meet these standards!

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development Guidelines

### Styling Conventions

#### File Organization

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx      # Component logic
│       ├── ComponentName.styles.ts # Styles
│       └── index.ts              # Export file
```

#### When to Separate Styles

1. **Inline Styles**: Use for simple components with minimal styling

   ```tsx
   <Box sx={{ p: 2, mb: 1 }}>
   ```

2. **Separate Style File**: Create when any of these conditions are met:
   - More than 5 style properties
   - Complex responsive styles
   - Reused styles across components
   - Dynamic styles based on props or theme

#### Style File Example (ComponentName.styles.ts)

```typescript
import { SxProps, Theme } from '@mui/material';

export const styles = {
  root: (theme: Theme): SxProps => ({
    display: 'flex',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }),
  content: {
    flex: 1,
    // ... more styles
  },
};
```

#### Component Usage Example

```tsx
import { styles } from './ComponentName.styles';

export const ComponentName = () => (
  <Box sx={styles.root}>
    <div sx={styles.content}>{/* content */}</div>
  </Box>
);
```

#### Style Guidelines

1. Use Material-UI's `sx` prop for styling
2. Leverage theme variables for consistency
3. Keep styles close to components (co-location)
4. Use semantic names for style objects
5. Document complex style logic
6. Use TypeScript for style definitions

7. **Component Creation**
   - One component per file
   - Use TypeScript interfaces for props
   - Keep components focused and single-responsibility
8. **Feature Creation**

   - One feature per folder
   - Use TypeScript interfaces for props
   - Keep features components focused and single-responsibility
   - Use custom hooks for complex logic
   - Using custom hooks encapsulate all Redux logic, making the components cleaner and more focused on their UI responsibilities

9. **State Management**

   - Use Redux for shared state
   - Use local state for UI-only state
   - Create custom hooks for complex logic

10. **Code Style**
    - Follow ESLint and Prettier configurations
    - Write meaningful commit messages
    - Document complex logic
    - Use TypeScript strictly
