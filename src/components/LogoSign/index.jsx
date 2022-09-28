import { styled, Tooltip, tooltipClasses } from '@mui/material';
import Image from 'next/image';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 200px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const TooltipWrapper = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.colors.alpha.trueWhite[100],
      color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 'bold',
      borderRadius: theme.general.borderRadiusSm,
      boxShadow: '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.colors.alpha.trueWhite[100],
    },
  })
);

function Logo(props) {
  return (
    <TooltipWrapper title="TextMe Dashboard" arrow>
      <LogoWrapper href="/">
        {props.edition === 'small' ? (
          <Image src="/static/images/logo/logo-small.png" width="100" height="100" priority />
        ) : (
          <Image src="/static/images/logo/logo.png" width="200" height="200" priority />
        )}
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
