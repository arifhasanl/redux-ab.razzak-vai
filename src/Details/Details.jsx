
import { Link, useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from '../Redux/api/baseApi';
import './details.css';
import {  FaArrowLeft,  } from "react-icons/fa";
const Details = () => {
    const {id}=useParams();
    console.log(id);
    const {data,isLoading}=useGetSingleUserQuery(id);
    console.log(data);
    return (
        <>
        {
        isLoading?<><h1 className='loading'>Loading...</h1></>:<>
        <div className="detals-container">
            <div className='arrow-btn'>
               <Link to={'/'}> <button><FaArrowLeft></FaArrowLeft></button></Link>
            </div>
            <div className="">
                <h1>First Name:{data?.first_name}</h1>
                <h1>Last Name:{data?.last_name}</h1>
                <p>Type:{data?.user_type}</p>
                <p>Division:{data?.division}</p>
                <p>Division:{data?.district}</p>
            </div>
        </div>
        </>
        }
        </>
    );
};

export default Details;
