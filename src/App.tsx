import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyleHelper } from 'utils/helpers';
import LoadingBar from 'react-top-loading-bar';
import { useStore } from 'store';

const useStyles = makeStyles(createStyleHelper);

const App = () => {
  const classes: any = useStyles();
  const {
    state: { isFetching },
  } = useStore();

  const loaderRef: any = useRef(null);

  useEffect(() => {
    if (isFetching) {
      loaderRef?.current?.continuousStart();
    } else {
      loaderRef?.current?.complete();
    }
  }, [isFetching, loaderRef]);

  return (
    <div className={classes.root}>
      <LoadingBar color="#07bc0c" height={4} ref={loaderRef} />
      Hello
    </div>
  );
};

export default App;
