import { Outlet, redirect, useLoaderData } from 'react-router-dom';

import Navbar from "../Components/Navbar";
import { customFetch } from "../Utills/customFetch";
import Cookies  from "js-cookie";
import axios from 'axios';
// import { createContext } from 'react';



// export const loader = async () => {
//   try {
//     const { data } = await customFetch('/users/admin/app-stats');
//     return data;
//   } catch (error) {
//     return redirect('/error');
//   }
// };
// const DasboardContext = createContext();


const ManageChildren = () => {


  return (
   
    <div>
      <Navbar />
      <Outlet /> {/* 🔹 Renders child routes (HomePage, EditPage) */}
    </div>
   
  );
};


export default ManageChildren;
