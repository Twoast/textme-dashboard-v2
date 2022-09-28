import { Grid } from '@mui/material';
import PageHeaderContentPart from './parts/ContentPart';
import PageHeaderIllustrationPart from './parts/IllustrationPart';

const PageHeader = (props) => {
  return (
    <Grid container alignItems="center">
      {props.illustration && <PageHeaderIllustrationPart illustration={props.illustration} />}
      <PageHeaderContentPart title={props.title} content={props.content} />
    </Grid>
  );
};

export default PageHeader;
