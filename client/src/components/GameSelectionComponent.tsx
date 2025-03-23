import { useGetGamesQuery } from '../generated/graphql';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import React from 'react';

interface GameSelectionProps {
  onChange: (e: React.SyntheticEvent, value: any | null) => void;
  err?: boolean;
  helperText?: string;
  onBlur?: () => void;
  required: boolean;
}

const GameSelectionComponent: React.FC<GameSelectionProps> = ({
  onChange,
  err = false,
  helperText = '',
  onBlur,
  required = false,
}) => {
  const { loading, error, data } = useGetGamesQuery();

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography>`Error! ${error.message}`</Typography>;

  return (
    <Autocomplete
      id="game-selection"
      options={data!.games}
      onChange={onChange}
      onBlur={onBlur}
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

export default GameSelectionComponent;