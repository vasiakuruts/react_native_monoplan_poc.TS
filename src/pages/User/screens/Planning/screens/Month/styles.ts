import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 16,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  tableWrapper: {
    marginTop: 24,
  },
  categoryCell: {
    height: '100%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  balanceCard: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
  }
}));
