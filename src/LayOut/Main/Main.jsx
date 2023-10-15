
import { useState } from 'react';
import { useGetUserQuery } from '../../Redux/api/baseApi';
import Item from './Item';
import './main.css'
import AdduserModal from '../../Modal/AdduserModal';
import UpdateModal from '../../UpdateModal/UpdateModal';

const Main = () => {
    const [courrentPage,setCourentPage]=useState(0);
    const [type,setType]=useState('admin');
    const [isOpen,setIsOpen]=useState(false);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [singleData,setSIngleData]=useState('');
  
    const itemPerpage=5;
    const {data,isLoading}=useGetUserQuery({page:courrentPage,type:type,limit:itemPerpage});
    
    
    const totalItem=50;
    
    const totalPage=Math.ceil(totalItem/itemPerpage);
    const pageNumbers=[...Array(totalPage).keys()];
    const handleType=(type)=>{
        setType(type);
    }
    const handleCourentPage=(number)=>{
        setCourentPage(number);
    }
    return (
        <div className='container'>
            <div className="type-menu">
                <div className='type-btn'>
                    {
                        type==='admin'?<button className='type-active'  onClick={()=>handleType('admin')}>Admin</button>:<button  className='type' onClick={()=>handleType('admin')}>Admin</button>
                    }
                    {
                        type==='employee'?<button className='type-active' onClick={()=>handleType('employee')}>Employee</button>:<button className='type'  onClick={()=>handleType('employee')}>Employee</button>
                    }
                </div>
                <div className='addUser'>
                    <button onClick={()=>setIsOpen(!isOpen)}>Create New User</button>
                </div>
            </div>
            <div className='type-title'>
               
                {
                        type==='admin'&& <h3>Admin</h3>
                    }
                    {
                        type==='employee'&& <h3>Employee</h3>
                    }
            </div>
            <div className='ite'>
                <table>
                    <thead  >
                        <tr className='table-head'>
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
                        {
                            data?.map(singleData=><Item isLoading={isLoading} isModalOpen={isModalOpen}setIsModalOpen={setIsModalOpen} setSIngleData={setSIngleData} key={singleData.id}singleData={singleData} ></Item>)
                        }
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className='pagination'>
                <button className='pagi-arrow-btn'>Prev</button>
                {
                    pageNumbers.map(number=><button className={courrentPage===number?'active-pagi':'pagination-btn'} onClick={()=>handleCourentPage(number)} key={number}>{number}</button>)
                }
                <button className='pagi-arrow-btn'>Next</button>
            </div>
            {
                isOpen&&<AdduserModal isOpen={isOpen} setIsOpen={setIsOpen}></AdduserModal>
            }
            {
                isModalOpen&&<UpdateModal singleData={singleData}setIsModalOpen={setIsModalOpen}></UpdateModal>
            }
            
        </div>
    );
};

export default Main;