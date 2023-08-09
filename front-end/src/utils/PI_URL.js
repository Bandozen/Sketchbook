import Cookies from 'js-cookie';

const PI_URL = () =>  {

    const pi_url = Cookies.get('PI_URL');
    return pi_url
}
export default PI_URL;