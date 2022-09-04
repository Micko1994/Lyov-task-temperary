import { useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelpIcon from '@material-ui/icons/Help';

import { ISignInFormValues } from 'types/sing-in';
import { getSignInFormValidation } from 'utils/validations';
import { useStore } from 'store';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formContent: {
    position: 'relative',
  },
  visibleIcon: {
    position: 'absolute',
    top: 31,
    right: 20,
    cursor: 'pointer',
  },
  help: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpText: {
    marginRight: 10,
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const {
    state: { isFetching },
    actions: { login },
  } = useStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const formik = useFormik<ISignInFormValues>({
    validationSchema: getSignInFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      password: JSON.parse(localStorage.getItem('rememberMe') || '{}')?.password || '',
      username: JSON.parse(localStorage.getItem('rememberMe') || '{}')?.username || '',
      rememberMe: true,
    },
    validate: () => {
      const errors: FormikErrors<ISignInFormValues> = {};

      return errors;
    },
    onSubmit: (values) => {
      login(values);
    },
  });

  const { setFieldValue, handleSubmit, values, errors } = formik;

  const onToggle = () => setIsVisible(!isVisible);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={({ target }) => setFieldValue('username', target.value)}
            value={values.username}
            error={!!errors.username}
            helperText={errors.username}
          />
          <div className={classes.formContent}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={!isVisible ? 'password' : 'text'}
              id="password"
              autoComplete="current-password"
              onChange={({ target }) => setFieldValue('password', target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            {isVisible ? (
              <VisibilityIcon className={classes.visibleIcon} onClick={onToggle} />
            ) : (
              <VisibilityOffIcon className={classes.visibleIcon} onClick={onToggle} />
            )}
          </div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={values.rememberMe}
            onChange={(e: any) => setFieldValue('rememberMe', e.target.checked)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={isFetching}
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            {isFetching ? <CircularProgress size={20} /> : 'Login'}
          </Button>
          <a href="mailto:mail@htmlacademy.ru" className={classes.help}>
            <span className={classes.helpText}>Help</span>
            <HelpIcon color="primary"  />
          </a>
        </form>
      </div>
    </Container>
  );
};
