import React from 'react';
import {Header} from "../components";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <main className="App">
                {children}
            </main>
        </>
    );
};

export default Layout;