import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TextInput } from '..';

const styles = () =>
    createStyles({
        dialogPaper: {
            width: 400
        },
        content: {
            display: 'flex',
            flexDirection: 'column'
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
        render() {
            const { classes, dialogObject, onSave, onCancel } = this.props;
            const validationSchema = yup.object().shape({
                name: yup.string().required()
            });
            return (
                
                <Formik
                    initialValues={dialogObject.isActivation}
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
                                {dialogObject.isActivation ? 'Remote POC Activation' : 'Extend POC License'}
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
                                <Button variant="outlined" onClick={onCancel} color="secondary">
                                    CANCEL
                                </Button>
                                <Button variant="outlined" onClick={submitForm} color="primary">
                                    {dialogObject.isActivation ? 'ACTIVATE' : 'EXTEND'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
                />
            );
        }
    }
);
