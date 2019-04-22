import * as React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
    PaidLicenseContainer,
    HistoryContainer,
    FullHeightVerticalContainer,
    Header,
    PocLicenseContainer
} from '../components';

const styles = (theme: Theme) =>
    createStyles({
        topPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row'
        },
        leftPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2
        },
        rightPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2
        },
        bottomPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing.unit * 2
        }
    });

export interface HomePageProps extends WithStyles<typeof styles> {}

export const HomePage = withStyles(styles)(({ classes }: HomePageProps) => {
    return (
        <FullHeightVerticalContainer>
            <Header />
            <div className={classes.topPanel}>
                <div className={classes.leftPanel}>
                    <PaidLicenseContainer />
                </div>
                <div className={classes.rightPanel}>
                    <HistoryContainer />
                    <PocLicenseContainer />
                </div>
            </div>
            {/* <div className={classes.bottomPanel}>
                <div className={classes.leftPanel}>
                    <PublishersContainer />
                </div>
            </div> */}
        </FullHeightVerticalContainer>
    );
});
