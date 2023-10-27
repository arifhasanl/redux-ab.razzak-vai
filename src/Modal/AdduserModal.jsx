

import { FaTimes } from 'react-icons/fa';
import './modal.css'
import { useState } from 'react';
import { usePostUserMutation } from '../Redux/api/baseApi';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import { RotatingLines } from 'react-loader-spinner';
const AdduserModal = ({ isOpen, setIsOpen }) => {
    const [selectedDivision, setSelectedDiVision] = useState([]);
    const [setData, { isSuccess,isLoading,data }] = usePostUserMutation();
console.log(isLoading,isSuccess,'data:',data);
    if (isSuccess) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Added Success Full',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const [type, setType] = useState('');
    const divisionsByDistrict = {
        Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj'],
        Chittagong: ['Chittagong', 'Coxs Bazar', 'Rangamati'],
        Rangpur: ['Rangpur', 'Gaibandha', 'Kurigram', 'Nilphamari', 'Lalmonirhat', 'Dinajpur', 'Thakurgaon', 'Panchagarh',],
        Sylhet: ['Sylhet ', 'Habiganj ', 'Maulvibazar ', 'Sunamganj '],
        Rajshahi: ['Natore', 'Rajshahi', 'Sirajganj', 'Pabna', 'Bogura', 'Chapainawabganj', 'Naogaon', 'Joypurhat'],
        Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
        Khulna: ['Bagerhat', 'Chuadanga', '	Jashore', 'Jhenaidah', 'Khulna', '	Kushtia', '	Magura', 'Meherpur', 'Narail', 'Satkhira'],
        Barisal: ['Barisal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur']

    };


    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='modal-close-btn'> <button onClick={() => setIsOpen(!isOpen)}><FaTimes className='close'></FaTimes></button></div>
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        user_type: '',
                        division: '',
                        district: ''
                    }}
                    validate={values => {
                        setType(values.user_type)
                        setSelectedDiVision(values.division)
                        const errors = {};
                        if (!values.first_name) {
                            errors.first_name = 'Required';
                        } else if (values.first_name.length > 15) {
                            errors.first_name = 'Must be 15 characters or less';
                        }

                        if (!values.last_name) {
                            errors.last_name = 'Required';
                        } else if (values.last_name.length > 20) {
                            errors.last_name = 'Must be 20 characters or less';
                        }
                        if (!values.user_type) {
                            errors.user_type = 'Must be selecte type';
                        }


                        if (values.user_type === 'employee' & !values.division) {
                            errors.division = 'Must be selecte division';
                        }

                        if (values.user_type === 'employee' & !values.district) {
                            errors.district = 'Must be selecte district';
                        }



                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                            setData({ data: values });
                            setIsOpen(false)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        /* and other goodies */
                    }) => (

                        <form onSubmit={handleSubmit} className='from'>
                            <div className='input'>
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                />
                                {errors.first_name && touched.first_name && errors.first_name ? <div className='error'>{errors.first_name && touched.first_name && errors.first_name}</div> : null}
                            </div>

                            <div className='input'>
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                />
                                {errors.last_name && touched.last_name && errors.last_name ? <div className='error'>{errors.last_name && touched.last_name && errors.last_name}</div> : null}
                            </div>
                            <div className='select'>
                                <label htmlFor="last_name">Select Type</label>
                                <select id='select' name='user_type' onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_type}>
                                    <option value="">select type</option>
                                    <option value="admin">admin</option>
                                    <option value="employee">employee</option>
                                </select>
                                {errors.user_type && touched.user_type && errors.user_type ? <div className='error'>{errors.user_type && touched.user_type && errors.user_type}</div> : null}
                            </div>
                            {
                                type === 'employee' && <>
                                    <div className='select'>
                                        <label htmlFor="last_name">Select division</label>
                                        <select id='select' name='division' onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.division}>
                                            <option value="">Select division</option>
                                            <option value="Rangpur">Rangpur</option>
                                            <option value="Rajshahi">Rajshahi</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Barisal">Barisal</option>
                                            <option value="Chittagong">Chittagong</option>
                                        </select>
                                        {errors.division && touched.division && errors.division ? <div className='error'>{errors.division && touched.division && errors.division}</div> : null}
                                    </div>

                                    <div className='select'>
                                        <label htmlFor="last_name">Select district</label>
                                        <select id='select' name='district' onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.district}>
                                            <option value="">Select district</option>
                                            {divisionsByDistrict[selectedDivision]?.map((division) => (
                                                <option key={division} value={division}>
                                                    {division}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.district && touched.district && errors.district ? <div className='error'>{errors.district && touched.district && errors.district}</div> : null}
                                    </div>
                                </>
                            }

                            <div className='submit-btn'>
                                <button type="submit" >
                                    Submit{

                                        isLoading && <RotatingLines
                                            strokeColor="grey"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="20"
                                            visible={true}
                                        />
                                    }
                                </button></div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdduserModal;






