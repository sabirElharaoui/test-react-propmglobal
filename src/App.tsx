import { CssBaseline, ThemeProvider, createTheme, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TaskManager from './features/tasks/components/TaskManager';
import { Container } from './components/layout/Container/Container';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="lg"
          header={
            <Typography variant="h4" component="h1" gutterBottom>
              Task Manager
            </Typography>
          }
        >
          <TaskManager />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
