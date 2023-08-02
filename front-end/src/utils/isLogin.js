import Cookies from 'js-cookie';

const isLogin = () =>  !!Cookies.get('x_auth')
export default isLogin;