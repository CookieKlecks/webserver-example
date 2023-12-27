import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import {Outlet} from "react-router-dom";

/**
 * This is the main entrypoint to the app.
 * @constructor
 */
function App() {

    return (
        <div className="App">
            <Header className={'Header'}/>
            <div className={'Main'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
