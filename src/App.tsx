import { Ref, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useStore } from 'store';

import { createStyleHelper } from 'utils/helpers';

const useStyles = makeStyles(createStyleHelper);

const App = () => {
  const classes = useStyles() as Record<string, string>;
  const {
    state: { isFetching },
  } = useStore();
  const loaderRef: Ref<LoadingBarRef> = useRef(null);

  useEffect(() => {
    if (isFetching) {
      loaderRef?.current?.continuousStart();
    } else {
      loaderRef?.current?.complete();
    }
  }, [isFetching, loaderRef]);

  return (
    <div className={classes.root} data-testid={'app-root'}>
      <LoadingBar color="#07bc0c" height={4} ref={loaderRef} />
      Hello
    </div>
  );
};

export default App;
