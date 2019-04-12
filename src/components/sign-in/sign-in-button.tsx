import * as React from 'react';

import { inject } from 'mobx-react';
import { RootStore } from '../../stores';
import Button from '@material-ui/core/Button';

export interface SignInButtonProps {
    rootStore?: RootStore;
}

export const SignInButton = inject('rootStore')(
    class extends React.Component<SignInButtonProps> {
        public render() {
            return (
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                size="large"
                // className={classes.submit}
                onClick={this.handleSettingsClicked}
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
);
