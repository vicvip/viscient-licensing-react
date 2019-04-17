import * as React from 'react';

import { inject } from 'mobx-react';
import { RootStore } from '../../stores';
import Button from '@material-ui/core/Button';

export interface LogoutButtonProps {
    rootStore?: RootStore;
}

export const LogoutButton = inject('rootStore')(
    class extends React.Component<LogoutButtonProps> {
        public render() {
            return (
                <Button
                    color="inherit"
                    onClick={this.handleLogoutClicked}
                    aria-label="Logout"
                    size="large"
                >
                    Logout
                </Button>
            );
        }

        handleLogoutClicked = () => {
            localStorage.removeItem('auth_token');
            const { rootStore } = this.props;
            const { routerStore } = rootStore!;
            routerStore.goTo('signIn');
        };
    }
);
