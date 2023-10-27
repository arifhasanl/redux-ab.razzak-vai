
import { useState } from 'react';
import { useGetUserQuery } from '../../Redux/api/baseApi';
import Item from './Item';
import './main.css'
import AdduserModal from '../../Modal/AdduserModal';
import UpdateModal from '../../UpdateModal/UpdateModal';
import { Circles } from 'react-loader-spinner';

const Main = () => {
    const [courrentPage, setCourentPage] = useState(1);
    const [type, setType] = useState('admin');
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleData, setSIngleData] = useState('');
    console.log(courrentPage);
    const itemPerpage = 5;
    const { data, isLoading } = useGetUserQuery({ page: courrentPage, type: type, limit: itemPerpage });

    const totalItem = 50;

    const totalPage = Math.ceil(totalItem / itemPerpage);
    // const pageNumbers=[...Array(totalPage).keys()];
    const pageNumbers = [];
    for (let i = 1; i < totalPage; i++) {
        pageNumbers.push(i)
    }

    const handleType = (type) => {
        setType(type);
    }
    const handleCourentPage = (number) => {
        setCourentPage(number);
        
    }
    const handleNextBtn=()=>{
        
        setCourentPage(courrentPage+1)
        
    }
    const handlePrevtBtn=()=>{
        setCourentPage(courrentPage-1)
        
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
              /></h1></> : <>
                    <div className='container'>
                        <div className="type-menu">
                            <div className='type-btn'>

                                <button className={type === 'admin' ? 'type-active' : 'type'} onClick={() => handleType('admin')}>Admin</button>


                                <button className={type === 'employee' ? 'type-active' : 'type'} onClick={() => handleType('employee')}>employee</button>


                            </div>
                            <div className='addUser'>
                                <button onClick={() => setIsOpen(!isOpen)}>Create New User</button>
                            </div>
                        </div>

                        <div className='type-title'>

                            {
                                type === 'admin' && <h3>Admin</h3>
                            }
                            {
                                type === 'employee' && <h3>Employee</h3>
                            }
                        </div>
                        <div className='ite'>
                           
                            <table>
                                <thead className='table-head'>
                                    <tr >
                                        <th>ID</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>TYPE</th>
                                        <th></th>
                                        <th>ACTION</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {data?.map(singleData => <Item dataIsLoading={isLoading} setSIngleData={setSIngleData} key={singleData.id} singleData={singleData} ></Item>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* pagination */}
                        <div className='pagination'>
                           {
                            courrentPage ===1?  <button disabled className={'pagi-arrow-btn' }>Prev</button>:<button onClick={()=>handlePrevtBtn()} className='pagination-btn'>Prev</button>
                           }
                            {
                                pageNumbers.map(number => <button className={courrentPage === number ? 'active-pagi' : 'pagination-btn'} onClick={() => handleCourentPage(number)} key={number}>{number}</button>)
                            }
                            {
                            courrentPage ===9?  <button disabled className={'pagi-arrow-btn' }>Prev</button>:<button onClick={()=>handleNextBtn()} className='pagination-btn'>Prev</button>
                           }
                        </div>
                        {
                            isOpen && <AdduserModal isOpen={isOpen} setIsOpen={setIsOpen}></AdduserModal>
                        }
                        {
                            isModalOpen && <UpdateModal singleData={singleData} setIsModalOpen={setIsModalOpen}></UpdateModal>
                        }

                    </div>
                </>
            }

        </>
    );
};

export default Main;