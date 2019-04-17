import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
//import { withStyles, WithStyles } from '@material-ui/core/styles/withStyles';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { SignInButton } from './sign-in-button';
import { values } from 'mobx';
import { VALIDATE_LOGIN } from './sign-in-queries';
import { DefaultQuery } from '..';
import { Query, Mutation } from 'react-apollo';
//import { routerStore } from 'react-router';
import { RootStore } from '../../stores';
import { inject } from 'mobx-react';
import { getUserId } from '../../utils/verify'; 
import { throwServerError } from 'apollo-link-http-common';
import { HomePage } from './../../pages/home-page';


const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  });

export interface SignInProps extends WithStyles<typeof styles> {
  rootStore?: RootStore;
}

//export const SignInButton = inject('rootStore')(

//   inject(stores => ({
//     value: stores.appState.value,
// }))(MainCompClass);

//export const SignInContainer = withStyles(styles)(
export const SignInContainer = withStyles(styles)(
  inject('rootStore')(
    class extends React.Component<SignInProps> {
      // constructor(props){
      //   super(props);
      //   this.state = {
      //     username: this.props.username,
      //     password: '',
      //   }
      // }
      state = {
        username: '',
        password: '',
      };

      _confirm = data => {
        //alert(data);
        // var zxc = getUserId(data.login.token);
        // alert(zxc);
        if (data.login.response === '200') {
          this._saveUserData(data.login.token);
          // var asd = localStorage.getItem('auth_token');
          // alert(asd);
          const { rootStore } = this.props;
          const { routerStore } = rootStore!;
          routerStore.goTo('home');
        } else if (data.login.response === '404') {
          alert('Invalid username or password');
        }
      };

      _saveUserData = token => {
        localStorage.setItem('auth_token', token)
      }

      public render() {
        // TODO - Mechanism to redirect user to Dashboard when local storage authentication exist
        localStorage.removeItem('auth_token');
        const { classes } = this.props;
        
        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={e =>
                      this.setState({
                        username: e.target.value
                      })
                    }
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e =>
                      this.setState({
                        password: e.target.value
                      })
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Mutation
                  mutation={VALIDATE_LOGIN}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button
                      //type="submit"
                      fullWidth
                      variant="contained"
                      color="inherit"
                      size="large"
                      onClick={() => {
                        const variables = {
                          username: this.state.username,
                          password: this.state.password
                        };
                        mutation({
                          variables
                        });
                      }}
                    >
                      Sign in
                    </Button>
                  )}
                </Mutation>
              </form>
            </Paper>
          </main>
        );
      }
    }
  )
);
