import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useGetEventsQuery } from '../generated/graphql';

interface EventsProps {
  onEventSelected: (e: React.SyntheticEvent, value: any | null) => void;
}

export function Events({ onEventSelected }: EventsProps) {
  const { loading, error, data } = useGetEventsQuery();

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography>`Error! ${error.message}`</Typography>;

  return (
    <Autocomplete
      id="country-select-demo"
      options={data!.events}
      onChange={onEventSelected}
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
          required
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
}