import { useState, KeyboardEvent, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

interface EditableCellProps {
  value: string;
  onSave: (value: string) => void;
  onComplete?: () => void;
  onTab?: () => void;
  disabled?: boolean;
}
 
export const EditableCell = ({
  value: initialValue,
  onSave,
  onComplete,
  onTab,
  disabled = false,
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  // Update local value when prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const commitChanges = () => {
    if (value !== initialValue) {
      onSave(value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitChanges();
      onComplete?.();
    } else if (e.key === 'Tab') {
      commitChanges();
      onTab?.();
    } else if (e.key === 'Escape') {
      setValue(initialValue); // Reset to initial value
      setIsEditing(false);
    }
  };

  if (isEditing && !disabled) {
    return (
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitChanges}
        autoFocus
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    );
  }

  return (
    <Box
      onClick={() => !disabled && setIsEditing(true)}
      sx={{
        cursor: disabled ? 'default' : 'text',
        p: 1,
        minHeight: '32px',
        opacity: disabled ? 0.7 : 1,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {value}
    </Box>
  );
};

export default EditableCell;
