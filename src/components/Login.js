import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import { setUserSession } from '../Utils/Common';
const LOGIN_URL = 'http://localhost:8080/api/authenticate';

const Login = (props) => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // const handleLoginSuccess = (userName) => {
    //     // Call this function upon successful login
    //     setAuth({ user: userName }); // Set the user in your authentication context
    //     navigate(from, { state: { user: userName } }); // Navigate to the homepage with user name in state
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser('');
        setPwd('');
        // navigate(from, { replace: true });
        // setSuccess(true);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({username:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            console.log(response.data.id_token);
            const idToken = response.data.id_token;
            //Session Storage
            setUserSession(idToken, user);
            // Save the id_token to local storage
            localStorage.setItem('id_token', idToken);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');

            // handleLoginSuccess(user);
            // state management, this will transfer the user 
            // navigate(from, { replace: true, state: { user } });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        // <>
        //     {success ? (
        //         <section>
        //             <h1>You are logged in!</h1>
        //             <br />
        //             <p>
        //                 <Link to="/home">Go to Home</Link>
        //                 {/* <a href="#">Go to Home</a> */}
        //             </p>
        //         </section>
        //     ) : (

        <div id='loginCredentials'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className='signHeader'> 
            <h1>Sign In</h1>
            <div className='underline'></div>
            </div>
            
            
            <form className='logincss' onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    // placeholder='Username'
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <button className='btn-sign'>Sign In</button>
            </form>
            <div className="regMsg">
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
            </div>
        </div>

        // )}
        // </>

    )
}

export default Login
