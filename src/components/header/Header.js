import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Header.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header() {
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
          width: "200px",
        },
      }));
      const classes = useStyles();

    return (
        <div className="navigationHeader">
            <a href="https://www.volvocars.com/static/shared/images/volvo-wordmark-black.svg">
                <img src="https://www.volvocars.com/static/shared/images/volvo-wordmark-black.svg" alt="" /> 
            </a>
                <Button
                    className={classes.button} onClick={(e) => handleLogout(e)} variant="contained" color="secondary" startIcon={<ExitToAppIcon />}
                >
                    LOG OUT
                </Button>
        </div>
    )
}

export default Header
