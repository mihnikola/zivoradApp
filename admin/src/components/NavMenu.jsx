import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { LABEL_VALUES } from '../constants';
import SignIn from './SignIn';

const NavMenu = () => {
    const [active, setActive] = useState(null);
    const [token, setToken] = useState(false);
    useEffect(() => {
    
        const tokenValue = localStorage.getItem("token");
        if (tokenValue) {
            setToken(true)
        } else {
            setToken(false)
        }
    }, [])

    const logout = () =>{
        localStorage.removeItem("token");
        setToken(false);
        window.location.href='/';

    }
    if (token) {
        return (
            <nav>
                <ul className='bg-gray-800 cursor-pointer md:flex text-white sm:justify-around w-full sm:gap-5 text-lg  text-center items-center'>
                    <li className={active === 0 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/reservations" onClick={() => setActive(0)}>{LABEL_VALUES.GET_RESERVATION}</Link></li>
                    <li className={active === 1 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/addReservation" onClick={() => setActive(1)}>{LABEL_VALUES.ADD_RESERVATION}</Link></li>
                    <li className={active === 2 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/addEmployer" onClick={() => setActive(2)}>{LABEL_VALUES.ADD_EMPLOYEE}</Link></li>
                    <li className={active === 3 ? 'p-3 bg-black text-xl rounded-2xl' : 'p-10 '}><Link to="/addService" onClick={() => setActive(3)}>{LABEL_VALUES.ADD_SERVICE}</Link></li>
                    <li className='p-2'><Link to="/addService" onClick={logout}>{LABEL_VALUES.LOGOUT}</Link></li>
                </ul>
            </nav>
        )
    }
    if (!token) {
        <SignIn />
    }
}

export default NavMenu