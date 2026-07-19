import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from '../util/validation';
import axiosConfig from "../util/axiosConfig"; 
import { Loader, LoaderCircle } from "lucide-react";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        setError("");

        //Login API call
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            }else{
                console.error('Something went wrong', error);
                setError(error.message);
            }  
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const activated = searchParams.get("activated");
        if (activated === "true") {
            toast.success("Account activated! Please log in.");
        } else if (activated === "false") {
            toast.error("Activation link invalid or already used.");
        }
    }, [searchParams]);

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* {Background image with blur} */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                        value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="name@example.com"
                            type="text" 
                        />

                        <Input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="**********"
                            type="password" 
                        />

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-purple-900 text-white rounded-lg shadow-lg hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging in...
                                </>
                            ) : (
                                "LOGIN"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?
                            <Link to="/signup" className="font-medium text-purple-600 underline hover:text-purple-800 transition-colors">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
