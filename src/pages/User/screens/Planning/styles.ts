import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  selectYear: {
    maxWidth: 300,
    width: '100%',
  },
  yearCell: {
    height: '100%',
    maxWidth: 300,
    width: '100%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  buttonCell: {
    paddingRight: 16,
    paddingLeft: 16,
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  }
}));
