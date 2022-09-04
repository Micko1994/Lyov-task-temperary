import { useEffect } from 'react';

// eslint-disable-next-line
export const useMount = (onMount = () => {}) => useEffect(onMount, []);
