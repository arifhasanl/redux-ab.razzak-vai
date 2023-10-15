
import { useState } from 'react';
import './main.css'
import { useDeleteUserMutation } from '../../Redux/api/baseApi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Item = ({ singleData, isModalOpen, setIsModalOpen, setSIngleData,isLoading }) => {
    const { first_name, last_name, user_type, id } = singleData;
    const [setSingleId, { data, error, isSuccess }] = useDeleteUserMutation();
  
    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
        setSIngleData(singleData)
    }
    const hanldeDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setSingleId(id)
                if (isSuccess) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            }
        })
        
        console.log(id);
    }
    return (
        <>
        {
            isLoading&&<h1 className='loading'>loading...</h1>
        }
            <tr>
                <td>{id}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{user_type}</td>
                <td><button className="Edit-btn" onClick={() => handleModal()}>Edit</button></td>
                <td><Link to={`details/${id}`}><button className="detail-btn" >Details</button></Link></td>
                <td><button className="delete-btn" onClick={() => hanldeDelete(id)}>Delete</button></td>

            </tr>

        </>
    );
};

export default Item;