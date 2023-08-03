import Cookies from 'js-cookie';

const isConnected = () =>  {

    const connection = Cookies.get('isConnected');
    return connection
}
export default isConnected;