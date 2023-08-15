import Cookies from 'js-cookie';

const getUserEmail = () =>  {
    const email = Cookies.get('email');
    return email
}

export default getUserEmail;