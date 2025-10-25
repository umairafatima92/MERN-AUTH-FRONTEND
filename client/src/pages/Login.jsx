const onSubmitHandler = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    axios.defaults.withCredentials = true;
    if (state === 'signup') {
      const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
      if (data.success) {
        setIsLoggedIn(true);
        
        setTimeout(() => {
          getUserData();
        }, 100);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
      if (data.success) {
        setIsLoggedIn(true);
        
        setTimeout(() => {
          getUserData();
        }, 100);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
  }
};
