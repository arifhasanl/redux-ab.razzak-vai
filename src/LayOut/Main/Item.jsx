
import { Circles, RotatingLines } from 'react-loader-spinner'
import './main.css'
import { useDeleteUserMutation } from '../../Redux/api/baseApi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Item = ({ singleData, dataIsLoading }) => {
    const { first_name, last_name, user_type, id } = singleData;
    const [setSingleId, { isLoading, isSuccess }] = useDeleteUserMutation();


    if (isSuccess) {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Deleted Success Full',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const hanldeDelete = (id) => {

        setSingleId(id)

    }
    return (
        <>
            {
                isLoading ? <><h1 className='loading'><Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /></h1></> : <> <tr>
                    <td>{id}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{user_type}</td>
                    {/* <td><button className="Edit-btn" onClick={() => handleModal()}>Edit</button></td> */}
                    <td className='btn edit-btn'><Link to={`update/${id}`}><button className='Edit-btn'>Edit</button></Link></td>
                    <td className='btn'><Link to={`details/${id}`}><button className="detail-btn" >Details</button></Link></td>
                    <td className='btn delete'><button className="delete-btn" onClick={() => hanldeDelete(id)}> <span> Delete</span><span className="spin">
                        {
                            isLoading && <RotatingLines
                                strokeColor="orange"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                visible={true}
                            />
                        }
                    </span></button></td>

                </tr></>
            }


        </>
    );
};

export default Item;
