import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

export type InputProps = TextFieldProps & {
  error?: boolean;
  helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, helperText, ...props }, ref) => {
  return (
    <TextField
      ref={ref}
      fullWidth
      variant="outlined"
      size="small"
      error={error}
      helperText={helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 1,
          backgroundColor: 'background.paper',
          '&:hover': {
            '& > fieldset': {
              borderColor: 'primary.main',
            },
          },
        },
        ...props.sx,
      }}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
