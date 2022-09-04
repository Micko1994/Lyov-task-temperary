import { useState, useCallback } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  CAR_URL,
  USER_URL,
  TASKS_URL,
  EVENTS_URL,
  CAR_PART_URL,
  MAINTENANCE_URL,
  ORGANIZATION_URL,
  DICTIONARY_VALUE_URL,
  TASKS_TEMPLATE_URL,
} from 'store/api';
import { toast } from 'react-toastify';

import { Api } from 'utils/Api';
import { showError } from 'utils/helpers';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 24,
      width: 310,
      margin: '0 auto',
      minHeight: 250,
      marginTop: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      color: '#757b8c',
      fontSize: 14,
      textAlign: 'center',
    },
    titleText: {
      color: '#404040',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonsBlock: {
      display: 'flex',
      justifyContent: 'center',
    },
    deleteButton: {
      marginRight: 15,
    },
  })
);

const routesUrlHasMap: { [key: string]: string } = {
  organizations: ORGANIZATION_URL,
  tasks: TASKS_URL,
  cars: CAR_URL,
  'car-parts': CAR_PART_URL,
  users: USER_URL,
  dictionaries: DICTIONARY_VALUE_URL,
  events: EVENTS_URL,
  maintenance: MAINTENANCE_URL,
  'task-templates': TASKS_TEMPLATE_URL,
};

export const useDeleteModal = (): any => {
  const classes = useStyles() as Record<string, string>;
  const { goBack } = useHistory();
  const { id }: any = useParams();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
    setIsBusy(false);
  }, []);

  const onDelete = useCallback(async () => {
    const route = pathname?.split('/')?.[1];
    const url = routesUrlHasMap?.[route];
    setIsBusy(true);
    try {
      await Api.delete(`${url}/${id}`);
      setIsBusy(false);
      setIsOpen(false);
      toast.success('Successfully deleted');
      goBack();
    } catch (e: any) {
      setIsBusy(false);
      showError(e?.response?.data?.message);
    }
  }, [id, pathname, goBack]);

  const renderModal = useCallback(() => {
    return (
      <Modal
        open={isOpen}
        onClose={() => handleModalClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.root}>
          <Typography className={classes.titleText} component="h6">
            Delete ?
          </Typography>
          <Typography className={classes.text} component="p">
            This action can’t be undone. When you delete this car, it will be erased from the
            system. All linked car parts will remain in the system.
          </Typography>
          <Paper elevation={0} className={classes.buttonsBlock}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isBusy}
              onClick={() => onDelete()}
              className={classes.deleteButton}
              startIcon={isBusy ? <CircularProgress size={20} /> : <DeleteIcon />}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={() => handleModalClose()}>
              Cancel
            </Button>
          </Paper>
        </Paper>
      </Modal>
    );
  }, [isOpen, classes, isBusy, handleModalClose, onDelete]);

  return {
    isOpen,
    handleModalOpen: setIsOpen,
    Modal: renderModal,
  };
};
