import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginSignupModal from "../Login/login";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
export default function ButtonAppBar() {

    const token = sessionStorage.getItem('token');
    const handleToken =() =>{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        window.location.reload();
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#0d2a69"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <img alt="Seez" src="https://seez.co/wp-content/uploads/2021/04/seez-logo-white.svg" /> 
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} >
          </Typography>
          { !token ? <Login /> : <Button variant="contained" style={{backgroundColor: 'white', color: '#0d2a69'}} size="large" onClick={handleToken}>
          <LogoutIcon sx={{ mr: 1 }} />
              <b>Logout</b>
            </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Login = () => {
    return <LoginSignupModal />;
  };