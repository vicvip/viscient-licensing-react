import * as React from 'react';

import { inject } from 'mobx-react';
import { RootStore } from '../../stores';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export interface SignInButtonProps extends WithStyles<typeof styles> {
    rootStore?: RootStore;
}

const styles = (theme: Theme) =>
  createStyles({
    mainButton: {
        background: 'linear-gradient(to right, #6befb8, #1CD8D2)',
    }
})
  
  
// export interface SignInProps extends WithStyles<typeof styles> {
//     rootStore?: RootStore;
//     userObject?: UserObject;
//   }
  
//   export const SignInContainerContent = withStyles(styles)(
//     class extends React.Component<SignInProps> {

    //export const SignInPage = withStyles(styles)(({ classes }: SignInPageProps) => {
export const SignInButton = withStyles(styles)(
    inject('rootStore')(
    class extends React.Component<SignInButtonProps> {
        public render() {
            return (
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                // className={classes.submit}
                onClick={this.handleSettingsClicked}
                style = {{backgroundColor: 'black'}}
                >
                    Sign in
                </Button>
            );
        }

        handleSettingsClicked = () => {
            const { rootStore } = this.props;
            const { routerStore } = rootStore!;
            routerStore.goTo('home');
        };
    }
)
);
