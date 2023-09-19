import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    top: '8px',
    left: '8px',
    right: '8px',
    bottom: '8px',
    zIndex: 299,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'relative',
    zIndex: 300,
  }
}));
