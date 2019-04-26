import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextInput } from '..';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () =>
    createStyles({
        dialogPaper: {
            width: 400
        },
        content: {
            display: 'flex',
            flexDirection: 'column'
        },
        cancelButton: {
            color: 'red',
            borderColor: 'red'
        },
        buttonProgress: {
            position: 'absolute',
            bottom: '5%',
            right: '8%',
            marginTop: -12,
            marginLeft: -12,
        },
        buttonProgressAdmin: {
            position: 'absolute',
            bottom: '3%',
            right: '8%',
            marginTop: -12,
            marginLeft: -12,
        }
    });

interface SavePublisherFunc {
    (publisher: any): void;
}

export interface PocLicenseDialogProps extends WithStyles<typeof styles> {
    dialogObject: any;
    onSave: SavePublisherFunc;
    onCancel: React.EventHandler<any>;
}

export const PocLicenseDialog = withStyles(styles)(
    class extends React.Component<PocLicenseDialogProps> {
        state = {
            loading: false,
        }
        render() {
            const { classes, dialogObject, onSave, onCancel } = this.props;
            
            // const validationSchema = yup.object().shape({
            //     companyName: yup.string().required("asd"),
            //     domainName: yup.string().required("zxc"),
            //     numberOfDays: yup.number().required(),
            //     accountType: yup.string().required()
            // });
            const showInsufficientDialog = dialogObject.pocCounter <= 0;
            const initialFormValues = {
                companyName: '',
                domainName: '',
                numberOfDays: '',
                accountType: ''
              };

            if(showInsufficientDialog){
                return (
                    <Formik
                    initialValues={initialFormValues}
                    //validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSave(values);
                        setSubmitting(false);
                    }}
                    render={({ submitForm }) => (
                        <Dialog
                            open={true}
                            classes={{ paper: classes.dialogPaper }}
                        >
                            <DialogTitle>
                                Insufficient Credit
                            </DialogTitle>
                            <DialogContent className={classes.content}>
                                Please contact Viscient to activate/extend any domain.
                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" onClick={submitForm} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                />
                )
            } else {
                return (
                    <Formik
                        initialValues={initialFormValues}
                        //validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            onSave(values);
                            setSubmitting(false);
                            this.setState({
                                loading: true
                              });
                        }}
                        render={({ submitForm }) => (
                            <Dialog
                                open={true}
                                classes={{ paper: classes.dialogPaper }}
                            >
                                <DialogTitle>
                                    { dialogObject.isActivation ? 'Remote POC Activation' : 'Extend POC License'}
                                </DialogTitle>
                                <DialogContent className={classes.content}>
                                <Form>
                                        <Field
                                            name="domainName"
                                            key="domainName"
                                            component={TextInput}
                                            label="Domain Name"
                                            fullWidth
                                        />
                                        { dialogObject.userObject.accountType === 'admin' ? [
                                        <Field
                                            name="companyName"
                                            key="companyName"
                                            component={TextInput}
                                            label="Company Name"
                                            fullWidth
                                        />,
                                        <Field
                                            name="numberOfDays"
                                            key="numberOfDays"
                                            component={TextInput}
                                            label="Number Of Days (default to 10)"
                                            fullWidth
                                        />
                                        ]: null }
                                    </Form>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="outlined" onClick={onCancel} className={classes.cancelButton}>
                                        CANCEL
                                    </Button>
                                    <Button variant="outlined" onClick={submitForm} color="primary" disabled={this.state.loading} >
                                        {dialogObject.isActivation ? 'ACTIVATE' : 'EXTEND'}
                                    </Button>
                                    {this.state.loading && <CircularProgress size={24} 
                                    className={dialogObject.userObject.accountType === 'admin' ? classes.buttonProgressAdmin : classes.buttonProgress} 
                                    />}
                                </DialogActions>
                            </Dialog>
                        )}
                    />
                );
            }
        }
    }
);
