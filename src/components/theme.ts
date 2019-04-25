import red from '@material-ui/core/colors/red';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Overrides } from '@material-ui/core/styles/overrides';

export function getTheme(): Theme {
    const palette: PaletteOptions = {
        primary: {
            main: '#15b2ad',
            //dark: '#15b2ad',
            //light: 'linear-gradient(to right, #6befb8, #1CD8D2)'
        },
        secondary: {
            main: '#15b2ad',
            light: 'white'
        },
        error: {
            main: red.A400
        },

        
    };

    const typography: TypographyOptions = {
        useNextVariants: true
    };

    const overrides: Overrides = {
        MuiButton: {
            root: {
                fontSize: 11,
                minWidth: 60,
                minHeight: 21,
                padding: '3px 8px'
            }
        },
        MuiTableCell: {
            head: {
                fontWeight: 500,
                color: 'black',
                background: 'lightgrey'
            }
        }
    };

    return createMuiTheme({ palette, typography, overrides });
}


// const CustomTableCell = withStyles(theme => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);
