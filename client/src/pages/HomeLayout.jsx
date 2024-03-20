import React from 'react'
import {Outlet} from 'react-router-dom';
/* The following line can be included in a src/App.scss */
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default HomeLayout
