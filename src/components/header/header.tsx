import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HomeButton } from './home-button';
import { SettingsButton } from './settings-button';
import { LogoutButton } from './logout-button';
import { inject } from 'mobx-react';
import { RootStore } from '../../stores';

const styles = () =>
    createStyles({
        title: {
            flex: 1,
            fontSize: 18
        }
    });

export interface HeaderProps extends WithStyles<typeof styles> {
    rootStore?: RootStore;
}

//export const Header = withStyles(styles)(
const HeaderContent = withStyles(styles)(
    class extends React.Component<HeaderProps> {
        // constructor(props){
        //     super(props);
        //     this.state = {
        //         username: this.props.username
        //     }
        // }
        authenticateUser = () => {
            console.log(this.props)
            //console.log(this.props.username)
            const token = localStorage.getItem('auth_token');
            if(token === null || token == null){
                const { rootStore } = this.props;
                const { routerStore } = rootStore!;
                routerStore.goTo('signIn');
            }
        }

        public render() {
            this.authenticateUser();
            const { classes } = this.props;
            
            return (
                <AppBar position="static">
                    <Toolbar>
                        <HomeButton />
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.title}
                        >
                            {/* {this.props.username} */}
                            Viscient Dashboard
                        </Typography>
                        <SettingsButton />
                        <LogoutButton />
                    </Toolbar>
                </AppBar>
            );
        }
    }
);

export const Header = inject('rootStore')(HeaderContent);


// import * as React from 'react';

// import IconButton from '@material-ui/core/IconButton';
// import Settings from '@material-ui/icons/Settings';
// import { inject } from 'mobx-react';
// import { RootStore } from '../../stores';

// export interface SettingsButtonProps {
//     rootStore?: RootStore;
// }

// export const SettingsButton = inject('rootStore')(
//     class extends React.Component<SettingsButtonProps> {
//         public render() {
//             return (
//                 <IconButton
//                     color="inherit"
//                     onClick={this.handleSettingsClicked}
//                     aria-label="Settings"
//                 >
//                     <Settings />
//                 </IconButton>
//             );
//         }

//         handleSettingsClicked = () => {
//             const { rootStore } = this.props;
//             const { routerStore } = rootStore!;
//             routerStore.goTo('settings');
//         };
//     }
// );
