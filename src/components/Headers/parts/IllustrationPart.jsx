import { Avatar, Grid, useTheme } from '@mui/material';

export default function PageHeaderIllustrationPart(props) {
  const theme = useTheme();

  return (
    <Grid item>
      <Avatar
        sx={{
          mr: 2,
          width: theme.spacing(8),
          height: theme.spacing(8),
        }}
        variant="rounded"
        alt={props.illustration}
        src={props.illustration}
      />
    </Grid>
  );
}
