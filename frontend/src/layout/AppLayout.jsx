import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../components/index'

const AppLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default AppLayout