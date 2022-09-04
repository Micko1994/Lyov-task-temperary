import { toast } from 'react-toastify';

const drawerWidth = 220;

export const createStyleHelper = (theme: any): any => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  logo: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
  appBar: {
    backgroundColor: '#1554d5',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: 64,
  },
});

export const createParams = (params: { [key: string]: any }) =>
  params && Object.keys(params).length
    ? '?' +
      Object.keys(params)
        .map((key: string) => `${key}=${params[key]}`)
        .join('&')
    : '';

export const getCorrectedText = (value: string, count = 20): string => {
  if (!value) return '-';
  if (value.toString()?.length <= count) return value;

  return `${value?.toString()?.substring(0, count)}...`;
};

export const showError = (error: string | string[] | undefined) => {
  if (!error) return 'Something went wrong';
  function notifyError(err: string) {
    toast.error(err);
  }

  if (Array.isArray(error)) {
    error.map((item: string) => notifyError(item));
  } else {
    notifyError(error);
  }
};
