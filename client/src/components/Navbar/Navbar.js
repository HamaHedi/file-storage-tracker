import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import Box from '@material-ui/core/Box';
import logo from '../../images/logo.svg';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { uploadFile } from '../../redux/actions/uploadsAction';
import { connect } from 'react-redux';
import Notification from '../Notification';

function ResponsiveDrawer(props) {
  const classes = useStyles();
  let history = useHistory();
  const { window, main, pageName, files } = props;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const itemsList = [
    {
      text: 'Home',
      icon: <HomeOutlinedIcon color='primary' />,
      onClick: () => {
        history.push('/');
      },
    },
    {
      text: 'All files',
      icon: <FileCopyOutlinedIcon color='primary' />,
      onClick: () => {
        history.push('/allFiles');
      },
    },
    {
      text: 'Starred',
      icon: <StarBorderRoundedIcon color='primary' />,
      onClick: () => {
        history.push('/starred');
      },
    },
    {
      text: 'Archived',
      icon: <ArchiveRoundedIcon color='primary' />,
      onClick: () => {
        history.push('/archived');
      },
    },
  ];

  const [file, setFile] = useState({});

  // const [addedFile, setAddedFile] = useState({ name: '', size: '', type: '' });
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const fileOnchange = (event) => {
    setFile(event.target.files[0]);

    let formData = new FormData();

    formData.append('file', file);

    fetch('http://localhost:5000/single', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.text())
      .then((resBody) => {});
    props.addFile({
      name: event.target.files[0].name,
      size: event.target.files[0].size,
      type: event.target.files[0].type,
    });
    // props.addFile(addedFile);
    setNotify({
      isOpen: true,
      message: 'File added successfully',
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ width: '15%' }}>
            <Typography variant='h6' noWrap>
              {pageName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
          <TextField
            className={classes.search}
            id='search-bar'
            // onInput={(e) => {
            //   setSearchQuery(e.target.value);
            // }}

            variant='outlined'
            placeholder='Search...'
            size='small'
          />
          <IconButton type='submit' aria-label='search'>
            <SearchIcon />
          </IconButton>
          <div style={{ width: '70%' }}>
            <Box display='flex' justifyContent='flex-end'>
              <IconButton
                aria-label='show 11 new notifications'
                color='inherit'
              >
                <Badge badgeContent={11} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label='account of current user'
                aria-controls='primary-search-account-menu'
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          ></Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            <div>
              <Box
                alignItems='center'
                display='flex'
                p={1}
                bgcolor='background.paper'
              >
                <img
                  className={classes.image}
                  src={logo}
                  alt='icon'
                  height='60px'
                />
              </Box>

              <Box
                alignItems='center'
                display='flex'
                justifyContent='center'
                m={1}
                p={1}
                bgcolor='background.paper'
              >
                <div>
                  <input
                    // accept='video/*'
                    className={classes.input}
                    id='contained-button-file'
                    type='file'
                    onChange={fileOnchange}
                  />
                  <label htmlFor='contained-button-file'>
                    <Button
                      component='span'
                      variant='contained'
                      color='secondary'
                      className={classes.button}
                      startIcon={<BackupRoundedIcon />}
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </Box>
              <List>
                {itemsList.map((item, index) => {
                  const { text, icon, onClick } = item;
                  return (
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>

              <div className={classes.toolbar} />
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {main}
      </main>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};
const mapStateToProps = (state) => {
  const uploadsReduces = 'file';

  return {
    files: state[uploadsReduces].files,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addFile: (file) => dispatch(uploadFile(file)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResponsiveDrawer));
