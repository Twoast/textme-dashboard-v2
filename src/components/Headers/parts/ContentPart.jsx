import { Grid, Typography } from '@mui/material';

export default function PageHeaderContentPart(props) {
  return (
    <Grid item>
      <Typography variant="h3" component="h3" gutterBottom>
        {props.title}
      </Typography>
      <Typography variant="subtitle2">{props.content}</Typography>
    </Grid>
  );
}
