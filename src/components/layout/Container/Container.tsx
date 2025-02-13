import { Container as MuiContainer, ContainerProps as MuiContainerProps, Box } from '@mui/material';
import { ReactNode } from 'react';

export interface ContainerProps extends Omit<MuiContainerProps, 'children'> {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  spacing?: number;
}

export const Container = ({ children, header, footer, spacing = 2, ...props }: ContainerProps) => {
  return (
    <MuiContainer {...props} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      {header && (
        <Box
          sx={{
            mb: spacing,
            width: '100%',
          }}
        >
          {header}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing,
          width: '100%',
        }}
      >
        {children}
      </Box>
      {footer && (
        <Box
          sx={{
            mt: spacing,
            width: '100%',
          }}
        >
          {footer}
        </Box>
      )}
    </MuiContainer>
  );
};

export default Container;
