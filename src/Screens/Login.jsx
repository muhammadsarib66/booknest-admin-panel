import { useState } from "react";
import { z } from "zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserApi } from "../features/slicer/LoginUserSlicer";
import BooksSvg from "../components/BooksSvg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.LoginUserSlicer);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      // Validate the form values
      schema.parse(formValues);
      setErrors({ email: "", password: "" });

      // If validation passes, proceed with login
       await dispatch(LoginUserApi(formValues)).unwrap().then((res)=>{
        console.log("api result ", res);
        if(res && res?.user?.isadmin == true){
          toast.success("Login Successful")
          localStorage.setItem("NBAdminToken", res.token);
          navigate("/")
          window.location.reload()
        }
        else{
          toast.error("You are not an admin")
        }
       }).catch((err)=>{
        console.log("api error ", err);
        // toast.error(err?.message)
       })
      
      

    } catch (error) {
      // Set errors if validation fails
      const fieldErrors = error.formErrors?.fieldErrors;
      if (fieldErrors) {
        setErrors({
          email: fieldErrors.email ? fieldErrors.email[0] : "",
          password: fieldErrors.password ? fieldErrors.password[0] : "",
        });
      }
    }
  };

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="flex font-Montserrat h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 hidden text-start md:flex flex-col justify-center items-center h-screen overflow-y-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          <BooksSvg className="w-4/5 max-w-md" />
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to BookNest</h2>
            <p className="text-lg text-white/80">Your Gateway to Digital Knowledge</p>
          </div>
        </div>
      </div>
      <div className="h-screen flex-1 flex flex-col justify-center px-2 bg-white">
        <div className="w-[75%] max-w-md mx-auto space-y-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="text-3xl text-gray-900 font-bold mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-600">Secure access to your dashboard</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Typography variant="h4" color="blue-gray" className="font-semibold">
                Sign In
              </Typography>
              <Typography className="text-gray-600 font-normal">
                Enter your credentials to access the admin portal
              </Typography>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email">
                  <Typography variant="small" className="mb-2 block font-medium text-gray-700">
                    Email Address
                  </Typography>
                </label>
                <Input
                  value={formValues.email}
                  onChange={handleInputChange}
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="admin@booknest.com"
                  className="w-full placeholder:opacity-60 focus:border-purple-500 border-gray-300 rounded-lg"
                  labelProps={{
                    className: "hidden",
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="password">
                  <Typography
                    placeholder={""}
                    variant="small"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Password
                  </Typography>
                </label>
                <Input
                  onPointerEnterCapture={''}
                  onPointerLeaveCapture={''}
                  placeholder="Enter your password"
                  name="password"
                  crossOrigin=""
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="w-full placeholder:opacity-60 focus:border-purple-500 border-gray-300 rounded-lg"
                  type={passwordShown ? "text" : "password"}
                  icon={
                    <i onClick={togglePasswordVisiblity} className="cursor-pointer text-gray-500 hover:text-gray-700">
                      {passwordShown ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </i>
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>
              
              <Button
                loading={isLoading}
                onClick={handleLogin}
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                fullWidth
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In to Admin Portal
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
