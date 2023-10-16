
import { useState } from 'react';
import './updateModal.css'

import { useFormik } from 'formik';
import { useUpDateUserMutation } from '../Redux/api/baseApi';
import Swal from 'sweetalert2';
const UpdateModal = ({singleData,setIsModalOpen}) => {
    const { first_name, last_name, user_type,id  } = singleData;
    const [setUpdatedata,{error,isSuccess}]=useUpDateUserMutation()
    if (isSuccess) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        setIsModalOpen(false)
    } else if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    }
    const handleModal=()=>{
        setIsModalOpen(false);
    }

    const validate = values => {
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
        return errors;
    };
    const formik = useFormik({
      
        initialValues: {
            first_name: first_name,
            last_name: last_name,
            user_type:last_name
        },
        validate,
        onSubmit: values => {
            setUpdatedata({data:values,id})
        },
    });

    return (
        <div className='modal-container'>
            <div className='modal'>
            <div className='modal-close-btn'> <button onClick={() => handleModal()}>Close</button></div>
                <div className='form'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='input'>
                            <label htmlFor="first_name">First Name</label>
                            <input
                            defaultValue={first_name}
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                            />
                            {formik.errors.first_name ? <div className='error'>{formik.errors.first_name}</div> : null}
                        </div>

                        <div className='input'>
                            <label htmlFor="last_name">Last Name</label>
                            <input
                              defaultValue={last_name}
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                            />
                            {formik.errors.last_name ? <div className='error'>{formik.errors.last_name}</div> : null}
                        </div>
                        <div className='select'>
                            <label htmlFor="last_name">Select Type</label>
                            <select id='select' value={formik.values.user_type} name='user_type' onChange={formik.handleChange}
                                >
                                <option value="">select type</option>
                                <option value="admin">admin</option>
                                <option value="employee">emplyee</option>
                            </select>
                            {formik.errors.user_type ? <div className='error'>{formik.errors.user_type}</div> : null}
                        </div>
                       

                        <div className='submit-btn'>
                            <button type="submit">Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;