import "./Home.scss"
import React, {HTMLAttributes} from 'react';
import {useNavigate} from "react-router-dom";
import {FaBook, FaUserLarge} from "react-icons/fa6";

interface HomeProps extends HTMLAttributes<HTMLDivElement> {

}

function Home({...props}: HomeProps) {
    const navigate = useNavigate()

    return (
        <div {...props} className={'Home'}>
            <div className={'example-button'} onClick={() => navigate('/facts')}>
                <FaBook className={'icon'}/>
                <div>Beispiel: Fakten</div>
            </div>

            <div className={'example-button'} onClick={() => navigate('/names')}>
                <FaUserLarge className={'icon'}/>
                <div>Beispiel: Namen</div>
            </div>
        </div>
    )
}

export default Home;