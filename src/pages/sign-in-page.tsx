
import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { SignInContainer, SignInPanel } from '../components'

//linear-gradient(to right, #93EDC7, #1CD8D2)
const styles = (theme: Theme) =>
    createStyles({
        backgroundColorContainer: {
          background: 'linear-gradient(to right, #6befb8, #1CD8D2)',
          position:'fixed',
          padding:0,
          margin:0,
          top:0,
          left:0,
          width: '100%',
          height: '100%'
      },
    })

// export function SignInPage() {
//   return (
//       <SignInPanel />
//   );
// }
export interface SignInPageProps extends WithStyles<typeof styles> {}

export const SignInPage = withStyles(styles)(({ classes }: SignInPageProps) => {
    return (
        <div className={classes.backgroundColorContainer}>
           <SignInPanel />
        </div>
    );
});
