// import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/common/Home";

import Login from "./components/common/Login";
import Register from "./components/common/Register";
import VerifyOtp from "./components/common/verifyOtp";
import DashboardLayout from "./components/owner/DashboardLayout";
import DashboardHome from "./components/owner/DashboardHome";
import CreateTurfForm from "./components/owner/CreateTurf";
import MyTurfsPage from "./components/owner/MyturfsPage";
import BrowseTurfsPage from "./components/user/BrowseTurfPage";
// import { Book } from "lucide-react";
// import BookTurf from "./components/user/BookTurf";
import TurfDetailsPage from "./components/user/TurfDeatilsPage";
import MyBookingsPage from "./components/user/MyBookingsPage ";
import OwnerBookingsPage from "./components/owner/OwnerBookings";
import VerifyTicketPage from "./components/owner/VerifyTicketPage";
import ProtectedUser from "./components/ProtectedRoutes/ProtectedUser";
import ProtectedOwner from "./components/ProtectedRoutes/ProtectedOwner";
import Authenticated from "./components/ProtectedRoutes/Authenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Authenticated><Register /></Authenticated>
  },
  {
    path: "/browse-turfs",
    element: <BrowseTurfsPage />,
  },
  {
    path: "/turf/:id",
    element:<TurfDetailsPage/>
  },
  {
    path: "/my-booking",
    element:<ProtectedUser><MyBookingsPage/></ProtectedUser>
  },
  {
    path: "/login",
    element: <Authenticated><Login /></Authenticated>
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/dashboard",
    element: <ProtectedOwner><DashboardLayout /></ProtectedOwner>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "turf/create",
        element: <CreateTurfForm />,
      },
      {
        path :"turf",
        element:<MyTurfsPage/>
      },
      {
        path:"bookings",
        element:<OwnerBookingsPage/>
      },
      {
        path: "verify",
        element:<VerifyTicketPage/>
      }
    ],
  },
]);


function App() {
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
    
  )
}

export default App
