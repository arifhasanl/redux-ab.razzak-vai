import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleUserQuery, useUpDateUserMutation } from "../Redux/api/baseApi";
import { Circles, RotatingLines } from "react-loader-spinner";
import { Formik } from "formik";
import './updatePage.css'
import Swal from "sweetalert2";

const UpdatePage = () => {
    const { id } = useParams();
    const { data,isLoading:loading } = useGetSingleUserQuery(id);
    const navigate=useNavigate()
    const [setUpdateData, { isLoading, isSuccess }] = useUpDateUserMutation()
    // const { first_name, last_name, user_type } = data;
    
    if (isSuccess) {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Success Full',
            showConfirmButton: false,
            timer: 1500
        })
        navigate('/')

    }
    return (
        <div className="updatePage-container">
            {loading ? <><h1 className='loading'><Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /></h1></>:<div>
                <Formik
                    initialValues={{
                        first_name: data?.first_name,
                        last_name: data?.last_name,
                        user_type: data?.user_type,
                    }}
                    validate={values => {
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
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        setUpdateData({ id, data: values })
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


                            <div className='edit-btn'>
                                <button className="submit-btn" type="submit" >
                                   <span> Update User</span><span className="spin">
                                        {

                                            isLoading && <RotatingLines
                                                strokeColor="orange"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="30"
                                                visible={true}
                                            />
                                        }
                                    </span>
                                </button>
                                <Link className="cencel-btn" to={'/'}> Cencel</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            }
        </div>
    );
};

export default UpdatePage;