import Link from 'next/link'
import { server } from '../src/server'
import Router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { logoutQuery } from '../src/queries/UserQueries'

const guestLinks = <Fragment>
    <li>
        <Link href='/login'>
            <a>
                Login
        </a>
        </Link>
    </li>
    <li>
        <Link href='/register'>
            <a>
                Register
         </a>
        </Link>
    </li>
</Fragment>


const Navbar = () => {

    const [isAuth, setAuth] = useState(false);

    const [logout, { loading, error, data }] = useMutation(logoutQuery);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            setAuth(true);
        }
        else {
            setAuth(false);
        }
    }, []);

    const onLogout = e => {
        logout().then(() => {
            localStorage.setItem('isAuthenticated', false);
            setAuth(false);
            M.toast({ html: 'Logged out!' });
            Router.push('/');
        }).catch(err => {
            console.error(err)
        })
    }

    if (error) {
        M.toast({ html: error.message });
    }

    const authLinks = <Fragment>
        <li>
            <Link href='/add-story'>
                <a>
                    Add Story
                </a>
            </Link>
        </li>
        <li>
            <Link href='#!'>
                <a onClick={onLogout}>
                    Logout
                </a>
            </Link>
        </li>
    </Fragment>

    return (
        <nav className='red'>
            <div className="nav-wrapper">
                <div className="container">
                    <Link href='/'>
                        <a className="brand-logo">
                            Next.js | Auth
                        </a>
                    </Link>
                    <ul className="right">
                        {isAuth ? authLinks : guestLinks}
                        <li className='hide-on-med-and-down'>
                            <Link href='/about'>
                                <a>
                                    About
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;