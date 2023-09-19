import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modal: {
    maxWidth: 500,
    width: '100%',
    height: 500,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-150px, -250px)',
    outline: 'none',
  },
  modalInner: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
  }
}));
