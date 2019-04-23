import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HomeButton } from './home-button';
import { SettingsButton } from './settings-button';
import { LogoutButton } from './logout-button';
import { inject, observer } from 'mobx-react';
import { RootStore, UserObject } from '../../stores';
import { observable } from 'mobx';
import { getUserId } from '../../utils/verify'

const styles = () =>
    createStyles({
        title: {
            flex: 1,
            fontSize: 18
        }
    });

export interface HeaderProps {
    rootStore?: RootStore;
    userObject?: UserObject;
}

export interface HeaderContainer extends WithStyles<typeof styles> {
    username?: String;
    accountType?: String;
}

//export const Header = withStyles(styles)(
const HeaderContent = withStyles(styles)(
    class extends React.Component<HeaderContainer> {
        public render() {
            //this.authenticateUser();
            const { classes, username, accountType } = this.props;
            
            return (
                <AppBar position="static">
                    <Toolbar>
                        <HomeButton />
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.title}
                        >
                            Licensing Dashboard {accountType === 'admin' ? `(Admin Access) - ${username}` : `- ${username}`}
                        </Typography>
                        <SettingsButton />
                        <LogoutButton />
                    </Toolbar>
                </AppBar>
            );
        }
    }
);

@inject('rootStore', 'userObject')
@observer
export class Header extends React.Component<HeaderProps> {
    public render() {
        const { userObject, rootStore } = this.props;
        var authUser = authenticateUser(userObject, rootStore);
        userObject.username = authUser;

        return(
            <React.Fragment>
                <HeaderContent username={userObject.username} accountType={userObject.accountType}/>
            </React.Fragment>
        )
    }
}

function authenticateUser(userObject, rootStore){
    const token = localStorage.getItem('auth_token');
    if(token === null || token == null){
        //const { rootStore } = this.props;
        const { routerStore } = rootStore!;
        routerStore.goTo('signIn');
    } 
    else {
        userObject.username = getUserId(token);
        userObject.accountType = localStorage.getItem('type');
        //TODO - auth account type in local storage
    }
    return userObject.username;
}
