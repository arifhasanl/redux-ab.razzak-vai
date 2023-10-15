
import { useFormik } from 'formik';
import './modal.css'
import { useState } from 'react';
import { usePostUserMutation } from '../Redux/api/baseApi';
import Swal from 'sweetalert2';
const AdduserModal = ({ isOpen, setIsOpen }) => {
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [setData,{data,error,isSuccess}]=usePostUserMutation();
   console.log(data);
    if (isSuccess) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        setIsOpen(false)
    } else if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
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






    const validate = values => {
        setSelectedDistrict(values.division);
        setType(values.user_type)
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


        if (!values.division) {
            errors.division = 'Must be selecte division';
        }

        if (!values.district) {
            errors.district = 'Must be selecte district';
        }



        return errors;
    };
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            user_type:''
        },
        validate,
        onSubmit: values => {
            setData({data:values})
        },
    });
    return (
        <div className="modal-container">
            <div className="modal">
                <div className='modal-close-btn'> <button onClick={() => setIsOpen(!isOpen)}>Close</button></div>
                <div className='form'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='input'>
                            <label htmlFor="first_name">First Name</label>
                            <input
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
                            <select id='select' name='user_type' onChange={formik.handleChange}
                                value={formik.values.user_type}>
                                <option value="">select type</option>
                                <option value="admin">admin</option>
                                <option value="emplyee">emplyee</option>
                            </select>
                            {formik.errors.user_type ? <div className='error'>{formik.errors.user_type}</div> : null}
                        </div>
                        {
                            type && <>
                                <div className='select'>
                                    <label htmlFor="last_name">Select division</label>
                                    <select id='select' name='division' onChange={formik.handleChange}
                                        value={formik.values.division}>
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
                                    {formik.errors.division ? <div className='error'>{formik.errors.division}</div> : null}
                                </div>

                                <div className='select'>
                                    <label htmlFor="last_name">Select district</label>
                                    <select id='select' name='district' onChange={formik.handleChange}
                                        value={formik.values.district}>
                                        <option value="">Select district</option>
                                        {divisionsByDistrict[selectedDistrict]?.map((division) => (
                                            <option key={division} value={division}>
                                                {division}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.errors.district ? <div className='error'>{formik.errors.district}</div> : null}
                                </div>
                            </>
                        }

                        <div className='submit-btn'>
                            <button type="submit">Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdduserModal;