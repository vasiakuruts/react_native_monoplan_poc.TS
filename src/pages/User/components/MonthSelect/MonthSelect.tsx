import * as React from 'react';
// import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { MONTHS } from './data';
import { useStore } from './useStore';
import { useStyles } from './styles';

const renderButtons = (classes: any, label: string, onClick: () => void): JSX.Element => {
  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export const MonthSelect: React.FC = () => {
  const classes = useStyles();
  const Store = useStore();
  const [modalOpen, setModalOpen] = React.useState(false);

  const getModalSetOpenClickHandler = React.useCallback((state: boolean) => () => {
    setModalOpen(state);
  }, [setModalOpen]);

  const getModalSetMonthClickHandler = React.useCallback((month: number) => () => {
    Store.onSetMonth(month);
  }, [Store]);

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4">{Store.monthLabel} 2020</Typography>
        <IconButton aria-label="delete" onClick={getModalSetOpenClickHandler(true)}>
          <EditIcon />
        </IconButton>
      </div>
      <Modal
        open={modalOpen}
        onClose={getModalSetOpenClickHandler(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <Paper className={classes.modalInner}>
            {Object.entries(MONTHS).map(([month, label]) => {
              const handler = getModalSetMonthClickHandler(parseInt(month));
              return renderButtons(classes, label, handler);
            })}
          </Paper>
        </div>
      </Modal>
    </>
  );
}