import Cookies from 'js-cookie';

const isLogin = () =>  {
    const userid = Cookies.get('x_auth')
    return userid
}
export default isLogin;