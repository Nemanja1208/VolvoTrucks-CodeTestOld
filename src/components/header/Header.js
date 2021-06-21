import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Header.css';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function Header() {

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
          width: "200px",
        },
      }));
      const classes = useStyles();

    return (
        <div className="navigationHeader">
            <a href="#">
                <img src="https://www.volvocars.com/static/shared/images/volvo-wordmark-black.svg" alt="" /> 
            </a>
                <Button
                    className={classes.button} variant="contained" color="secondary" startIcon={<VpnKeyIcon />}
                >
                    LOG IN
                </Button>
        </div>
    )
}

export default Header
