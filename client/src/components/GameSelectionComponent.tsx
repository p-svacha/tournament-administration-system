import { useGetGamesQuery } from '../generated/graphql';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import React from 'react';

interface GamesProps {
  onGameSelected: (e: React.SyntheticEvent, value: any | null) => void;
}

export function Games({ onGameSelected }: GamesProps) {
  const { loading, error, data } = useGetGamesQuery();

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography>`Error! ${error.message}`</Typography>;

  return (
    <Autocomplete
      id="country-select-demo"
      options={data!.games}
      onChange={onGameSelected}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
            <img loading="lazy" width="40" src={`${process.env.PUBLIC_URL}${option.logoUrl}`} alt="" />
            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Spiel"
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