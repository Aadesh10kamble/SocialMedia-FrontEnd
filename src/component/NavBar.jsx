import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../actions/auth.actions';
import _ from 'underscore';
import { getProfilePicURL } from '../helper';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';

const typographyStyle = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

const ResponsiveAppBar = () => {
  const { notificationList, loginUser } = useSelector(state => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuIdentifier, setMenuIdentifier] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = () => {
    if (menuIdentifier === 'notificationMenu') {
      return (!notificationList.length ?
        <h3>No notifications</h3> :
        (<List sx={{ maxHeight: '300px' }}>
          {notificationList.map((notification, index) => (
            <ListItem key={index}>
              <Divider />
              <ListItemButton>
                <ListItemText primary={notification.content} />
              </ListItemButton>
            </ListItem>))}
        </List>))
    };
    if (menuIdentifier === 'userMenu') {
      return (<Typography textAlign="center"
        onClick={() => navigate('/my-profile')}>
        Account
      </Typography>);
    };
    return '';
  };

  const menuOnCloseHandler = () => setAnchorEl(null);
  const menuOpenHandler = (event) => {
    setAnchorEl(event.target);
    setMenuIdentifier(event.currentTarget.name);
  };

  return (<ThemeProvider theme={theme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={() => navigate('/')} />
          <Typography
            variant="h6"
            noWrap
            sx={typographyStyle}
          >
            LOGO
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!_.isEmpty(loginUser) &&
              <Button component={Link}
                to={{ pathname: `/tour/create` }}
                sx={{ my: 2, color: 'white', display: 'block' }}>Create Post</Button>
            }
          </Box>
          {!_.isEmpty(loginUser) ?
            (<Button
              onClick={() => {
                window.socket.emit('exit', { userId: loginUser._id || loginUser.id });
                dispatch(logOut());
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button>) :
            (<Button component={Link}
              to={`/tour/account/new`}
              sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>)}

          <Stack sx={{ flexGrow: 0 }} spacing={2} direction='row'>
            <IconButton color='white'
              name='notificationMenu'
              onClick={(event) => {
                notificationList.forEach(note => console.log(note.content));
                menuOpenHandler(event);
              }}>
              <IconButton color='inherit'>
                <Badge badgeContent={notificationList.length} color="secondary">
                  <NotificationsIcon color='inherit' />
                </Badge>
              </IconButton>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton
                onClick={menuOpenHandler}
                name='userMenu'
                sx={{ p: 0 }}>
                <Avatar alt={!_.isEmpty(loginUser) ? `${loginUser.firstName}` : "Default"}
                  src={!_.isEmpty(loginUser) ? getProfilePicURL(loginUser.profilePic) : ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={menuOnCloseHandler}
            >
              <MenuItem>
                {menuItems()}
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>
  );
}
export default ResponsiveAppBar;