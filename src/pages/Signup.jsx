import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; 
import Input from "../components/Input";
import { validateEmail } from '../util/validation';
import axiosConfig from "../util/axiosConfig"; 
import { API_ENDPOINTS } from "../util/apiEndPoints"; 
import { LoaderCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/UploadProfileImage";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        if(!fullName.trim()){
            setError("Please enter your fullname");
            setIsLoading(false);
            return;
        }
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

        //signup api call
        try{
            //upload the image
            if(profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email, 
                password,
                profileImageUrl
            })
            if(response.status === 201){
                toast.success("Account created! Check your email to activate your account, then log in.", { duration: 5000 });
                navigate("/login");
            }
        }catch(err){
            console.error('Something went wrong', err);
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
                toast.error(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
                toast.error("Something went wrong. Please try again.");
            }
        }finally{
            setIsLoading(false);
        }
    }

    const handleGoogleSignup = async (credentialResponse) => {
    setIsLoading(true);
    try {
        const response = await axiosConfig.post(API_ENDPOINTS.GOOGLE_LOGIN, {
            idToken: credentialResponse.credential
        });
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            toast.success("Logged in successfully!");
            navigate("/dashboard");
        }
        } catch (err) {
            console.error('Google signup failed', err);
            if(err.response && err.response.data && err.response.data.message){
                toast.error(err.response.data.message);
            } else {
                toast.error("Google signup failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    console.log("Client ID being used:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* {Background image with blur} */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-1">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-5">
                        Start tracking your spendings by joining with us.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-1">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                            <Input 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            label="Full Name"
                            placeholder="Enter full Name"
                            type="text" />

                            <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="name@example.com"
                            type="text" />

                            <div className="col-span-2">
                                <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="**********"
                                type="password" />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-purple-900 text-white rounded-lg shadow-lg hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                <LoaderCircle className="animate-spin w-5 h-5"/>
                                Signing Up...
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-sm text-gray-500">or</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        <div className="flex justify-center mb-1">
                            <GoogleLogin
                                className="w-full py-3"
                                onSuccess={handleGoogleSignup}
                                onError={() => setError("Google signup failed")}
                            />
                        </div>

                        <p className="text-sm text-slate-800 text-center mt-4">
                            Already have an account?
                            <Link to="/login" className="font-medium text-purple-600 underline hover:text-purple-800 transition-colors">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
