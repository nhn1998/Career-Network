import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import { FaGithubSquare, FaGoogle } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router';
import login from '../../../src/others/images/login.png'
import useToken from '../../others/Hooks/useToken';
import { Link } from 'react-router-dom';

const Login = () => {
    const { logIn, googleSignIn, setUser, githubSignIn } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loginError, setLoginError] = useState('');
    const [tEmail, setEmail] = useState('');
    const [token] = useToken(tEmail);

    const location = useLocation();
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()


    const from = location.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        setEmail(data.email);
        console.log(tEmail)
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user?.uid) {
                    navigate('/')
                }
            })
            .catch(error => console.log(error))
    }
    console.log(tEmail)

    const handlegoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user
                setEmail(user.email);
                setUser(user);
            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message);
            })
    }
    console.log(tEmail)

    const handleGithub = () => {
        githubSignIn(githubProvider)
            .then(result => {
                const user = result.user
            })
            .catch(error => console.log(error))
    }



    return (
        <div className="hero min-h-screen shadow-2xl p-10">
            <div className="hero-content flex-row-reverse">
                <div className='h-[600px] flex justify-center'>
                    <div className='w-full p-7'>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <h2 className="text-3xl font-bold text-center">Login</h2>
                            <div className="form-control w-full">
                                <label className=" label "> <span className="label-text dark:text-white">Email</span></label>
                                <input type="email" {...register("email", {
                                    required: true
                                })} className="input input-bordered w-full " />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-full">
                                <label className=" label dark:t"> <span className="label-text dark:text-white">Password</span></label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })} className="input input-bordered w-full" />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>
                            <p>Don't have any account?<Link to='/signup'><span className='text-blue-600'>Register</span></Link></p>
                            <input className='btn  w-full mt-4' value="Login" type="submit" />
                        </form>
                        <div className=''>
                            <button onClick={handlegoogle} className='btn btn-outline w-full my-7 dark:text-white'><FaGoogle className='text-2xl mx-4 text-blue-500'></FaGoogle> CONTINUE WITH GOOGLE</button>
                            <button onClick={handleGithub} className='btn bg-black w-full'><FaGithubSquare className='text-2xl mx-4'></FaGithubSquare> CONTINUE WITH Github</button>
                        </div>
                    </div>
                </div>
                <div className="lg:block hidden">
                    <img className=' h-[550px]' src={login} alt="" />
                </div>
            </div>
        </div>

    );
};

export default Login;