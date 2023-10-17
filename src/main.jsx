import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './LayOut/Main/Main.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Details from './Details/Details'


import UpdatePage from './UpdatePage/UpdatePage'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>
  },
  {
    path:'/details/:id',
    element:<Details></Details>
  },
  {
    path:'/update/:id',
    element:<UpdatePage></UpdatePage>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}>

   </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
