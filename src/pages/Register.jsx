import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

    const navigate =useNavigate()
    const dispatch = useDispatch()
    
    const {user,isLoading,isError,isSuccess,message}= useSelector((state)=>state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    },[user,isError,isSuccess,message,navigate,dispatch])
    
    
    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Passwords do not match')
        }else{
            const userData={
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner/>
    }
    return (
        <>
            <section className='Heading'>
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input onChange={onChange}
                            type="text"
                            placeholder='Enter your name'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name} />
                    </div>
                    <div className="form-group">
                        <input onChange={onChange}
                            type="text"
                            placeholder='Enter your Email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email} />
                    </div>
                    <div className="form-group">
                        <input onChange={onChange}
                            type="password"
                            placeholder='Enter your Password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password} />
                    </div>
                    <div className="form-group">
                        <input onChange={onChange}
                            type="password"
                            placeholder='Confirm Password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register