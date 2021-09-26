import React, { useState } from 'react';

const useMyFirstCustomHook = () => {
  const [count, setCount] = useState(0);
  // do some stuff
  return { count, setCount };
};

export default useMyFirstCustomHook;