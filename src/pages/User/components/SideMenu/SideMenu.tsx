import * as React from 'react';
import * as Router from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ClassIcon from '@material-ui/icons/Class';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CategoryIcon from '@material-ui/icons/Category';

import { useStyles } from './styles';

const getUserAvatarSymbols = (name: string): string => {
  const n = name.split(' ');
  return n.reduce((acc, value) => acc += value.substring(0, 1).toUpperCase(), '');
}

const renderItems = (getNavigateClickHandler: (path: string) => () => void): JSX.Element => (
  <>
    <ListItem button onClick={getNavigateClickHandler('/dashboard')}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={getNavigateClickHandler('/planning')}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Planning" />
    </ListItem>
    <ListItem button onClick={getNavigateClickHandler('/categories')}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>
    <ListItem button onClick={getNavigateClickHandler('/statements')}>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Statements" />
    </ListItem>
    <ListItem button onClick={getNavigateClickHandler('/banks')}>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Banks" />
    </ListItem>
  </>
);

interface Props {
  drawerOpen: boolean;
  userName: string;
  onDrawerToggleClick: () => void;
}

export const SideMenu: React.FC<Props> = ({
  drawerOpen,
  userName,
  onDrawerToggleClick,
}) => {
  const classes = useStyles();
  const history = Router.useHistory();

  const drawerClasses = {
    paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
  };
  const userNameClasses = clsx(classes.userName, !drawerOpen && classes.userNameHidden);

  const getNavigateClickHandler = React.useCallback((path: string) => () => {
    history.push(path);
  }, [history]);

  return (
    <Drawer
      variant="permanent"
      classes={drawerClasses}
      open={drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onDrawerToggleClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.userContainer}>
        <Avatar>{getUserAvatarSymbols(userName)}</Avatar>
        <div className={userNameClasses}>
          <Typography variant="h6">{userName}</Typography>
        </div>
      </div>
      <Divider />
      <List>
        {renderItems(getNavigateClickHandler)}
      </List>
    </Drawer>
  );
}