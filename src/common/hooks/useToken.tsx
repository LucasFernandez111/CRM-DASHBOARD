import { useEffect, useState } from 'react';

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const getToken = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get('token');
  };

  useEffect(() => {
    const tokenGetting = getToken();

    if (!tokenGetting) return;
    setToken(tokenGetting);
  }, []);

  return { token };
};
