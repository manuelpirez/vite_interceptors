import {useRef, useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';

import useAuth from '../hooks/useAuthContext';
import useApiPublic from "../hooks/interceptors/useApiPublic.jsx";
import { LOGIN } from '../assets/endpoints.jsx';

const Login = () => {
    const {setAuth, persist, setPersist} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const api = useApiPublic()

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const togglePersist = () => {
        setPersist(prev => !prev);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(LOGIN)
            console.log(JSON.stringify(response));
            
            const access = response?.data?.tokens?.access;
            const roles = response?.data?.info?.role?.name;

            setAuth({user, pwd, roles, access});
            setUser('');
            setPwd('');
            navigate(from, {replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
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
                <button>Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br/>
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
                <br/><br/>
                <span className="line">
                    <Link to="/feedback">Feedback</Link>
                </span>
            </p>
        </section>

    )
}

export default Login
