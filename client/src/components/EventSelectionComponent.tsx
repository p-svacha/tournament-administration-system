import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useGetEventsQuery } from '../generated/graphql';

interface EventSelectionProps {
  onChange: (e: React.SyntheticEvent, value: any | null) => void;
  err?: boolean;
  helperText?: string;
  onBlur?: () => void;
  required: boolean;
}

const EventSelectionComponent: React.FC<EventSelectionProps> = ({
  onChange,
  err = false,
  helperText = '',
  onBlur,
  required = false,
}) => {
  const { loading, error, data } = useGetEventsQuery();

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography>`Error! ${error.message}`</Typography>;

  return (
    <Autocomplete
      id="event-selection"
      options={data!.events}
      onChange={onChange}
      onBlur={onBlur}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Event"
          required={required}
          error={err}
          helperText={helperText}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
  );
};

export default EventSelectionComponent;