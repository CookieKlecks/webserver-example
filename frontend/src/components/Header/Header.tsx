import "./Header.scss"
import React, {HTMLAttributes} from 'react';
import {Link, NavLink} from "react-router-dom";

interface HeaderProps extends HTMLAttributes<HTMLDivElement>{
}

function Header({...props}: HeaderProps) {

    return <div {...props} className={`Header ${props.className ?? ''}`}>
        <Link to={'/'} className={'Logo'}>
            &lt;/§&gt; &ndash; HTTP Example
        </Link>
        <div className={'vertical-separator'} aria-hidden={true} role={'presentation'}/>
        <div className={'Navbar'}>
            <NavLink to={'/'}>Start</NavLink>
            <NavLink to={'/facts'}>Beispiel: Fakten</NavLink>
            <NavLink to={'/names'}>Beispiel: Namen</NavLink>
        </div>
    </div>
}

export default Header;