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
import { observable, action } from 'mobx';
import { getUserId, decryptAccountType } from '../../utils/verify'
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
    createStyles({
        title: {
            flex: 1,
            fontSize: 18
        },
        mainAppBar: {
            color: theme.palette.secondary.light
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
                <AppBar position="static" className={classes.mainAppBar}>
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
        this.setUser(userObject, rootStore);

        return(
            <React.Fragment>
                <HeaderContent username={userObject.username} accountType={userObject.accountType}/>
            </React.Fragment>
        )
    }

    @action
    setUser = (userObject, rootStore) => {
        var authUser = authenticateUser(userObject, rootStore);
        userObject.username = authUser;
    };
    
}

function authenticateUser(userObject, rootStore){
    const token = localStorage.getItem('auth_token');
    if(token === null || token == null){
        const { routerStore } = rootStore!;
        routerStore.goTo('signIn');
    } 
    else {
        try{
            userObject.username = getUserId(token);

            const accountTypeToken = localStorage.getItem('type');
            userObject.accountType = decryptAccountType(accountTypeToken);
        } catch(ex){
            console.log('Error decoding username or accountType');
            console.log(ex);
            const { routerStore } = rootStore!;
            routerStore.goTo('signIn');
        }
    }
    return userObject.username;
}
