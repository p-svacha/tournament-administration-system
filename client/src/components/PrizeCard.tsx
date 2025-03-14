import {Stack, Typography} from "@mui/material";
import React from "react";

const PrizeCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        margin="1em 2em"
        sx={{ border: '2px solid ' + color, borderRadius: '8px', padding: '16px', backgroundColor: color }}
    >
        <Typography variant="body1">{title}</Typography>
        <Typography variant="h6" fontWeight="bold">
            {value}
        </Typography>
    </Stack>
);

export default PrizeCard;