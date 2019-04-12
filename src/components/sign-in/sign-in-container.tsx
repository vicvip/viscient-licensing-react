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
//import { VALIDATE_LOGIN } from './sign-in-queries';
import { DefaultQuery } from '..';
import { Query, Mutation } from 'react-apollo';
//import { routerStore } from 'react-router';
import { RootStore } from '../../stores';
import { inject } from 'mobx-react';
import gql from 'graphql-tag';

// export const VALIDATE_LOGIN = gql`
//     mutation{
//         login(username: "viscient", password: "viscient"){
//             token
//         }
//     }
// `;

export const VALIDATE_LOGIN = gql`
    mutation Login($username: String!, $password: String!){
  login(username: $username, password: $password){
      response
      message
      user
      token
  }
}
`;
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
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },
      avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
      },
      submit: {
        marginTop: theme.spacing.unit * 3,
      },
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
    class extends React.Component<SignInProps>{
      state = {
        username: null,
        password: null
      }

      _confirm = async data => {
        
        alert(data.login.token);
        //if(data.)
        const { rootStore } = this.props;
        const { routerStore } = rootStore!;
        routerStore.goTo('home');
      }

      public render() {
          const { classes } = this.props;
          //const { username, password } = this.state;
          
          return (
              // <Mutation mutation={ VALIDATE_LOGIN } onCompleted={data => {alert(data), this._confirm(data)} }>
              // {mutation => (
                <main className={classes.main}>
                 {/* {alert(mutation)}  */}
                    <CssBaseline />
                    <Paper className={classes.paper}>*
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus onChange={e => this.setState({ username: e.target.value})} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"  onChange={e => this.setState({ password: e.target.value})}/>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {/* <SignInButton /> */}

                        <Mutation 
                        mutation={ VALIDATE_LOGIN } 
                        //onCompleted={data => { this._confirm(data)} }
                        onCompleted= { data => this._confirm(data)}
                        >
                        { mutation => (
                          <Button
                          //type="submit"
                          fullWidth
                          variant="contained"
                          color="inherit"
                          size="large"
                          // className={classes.submit}
                          //onClick={() => { this._confirm(mutation) }}
                          //onClick={ () => { mutation }}
                          onClick ={a => {
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
                  </main>)}
    }
))


{/* <Mutation mutation={CREATE_AUTHOR}>
                        {createAuthor => (
                            <AuthorDialog
                                author={this.editedAuthor}
                                onSave={author => {
                                    createAuthor({
                                        variables: {
                                            name: author.name
                                        },
                                        // Update AuthorsQuery in Apollo cache
                                        // Needed only in this "Create" case
                                        update: updateAuthorsQuery
                                    }); */}

              //</Mutation>
              
              //     alert(data.login.message)
              //     return (
              //       <main className={classes.main}>
              //       <CssBaseline />
              //       <Paper className={classes.paper}>
              //           <Avatar className={classes.avatar}>
              //           <LockOutlinedIcon />
              //           </Avatar>
              //           <Typography component="h1" variant="h5">
              //           Sign in
              //           </Typography>
              //           <form className={classes.form}>
              //           <FormControl margin="normal" required fullWidth>
              //               <InputLabel htmlFor="username">Username</InputLabel>
              //               <Input id="username" name="username" autoComplete="username" autoFocus onChange={e => this.setState({ username: e.target.value})} />
              //           </FormControl>
              //           <FormControl margin="normal" required fullWidth>
              //               <InputLabel htmlFor="password">Password</InputLabel>
              //               <Input name="password" type="password" id="password" autoComplete="current-password"  onChange={e => this.setState({ password: e.target.value})}/>
              //           </FormControl>
              //           <FormControlLabel
              //               control={<Checkbox value="remember" color="primary" />}
              //               label="Remember me"
              //           />
              //           <SignInButton />
              //           </form>
              //       </Paper>
              //       </main>
              //     );
              //   }}
              // </DefaultQuery>
//           );
//       }
//     }
// );
//export class SignInContainer extends React.Component {
//     unsubscribe = null;

//     render() {

//         return (
//             <main className={classes.main}>
//             <CssBaseline />
//             <Paper className={classes.paper}>
//                 <Avatar className={classes.avatar}>
//                 <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                 Sign in
//                 </Typography>
//                 <form className={classes.form}>
//                 <FormControl margin="normal" required fullWidth>
//                     <InputLabel htmlFor="email">Email Address</InputLabel>
//                     <Input id="email" name="email" autoComplete="email" autoFocus />
//                 </FormControl>
//                 <FormControl margin="normal" required fullWidth>
//                     <InputLabel htmlFor="password">Password</InputLabel>
//                     <Input name="password" type="password" id="password" autoComplete="current-password" />
//                 </FormControl>
//                 <FormControlLabel
//                     control={<Checkbox value="remember" color="primary" />}
//                     label="Remember me"
//                 />
//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     className={classes.submit}
//                 >
//                     Sign in
//                 </Button>
//                 </form>
//             </Paper>
//             </main>
//         );
//     }

//     componentWillUnmount() {
//         if (this.unsubscribe) {
//             this.unsubscribe();
//         }
//     }
// }