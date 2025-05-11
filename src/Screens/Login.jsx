/* eslint-disable @typescript-eslint/no-explicit */
import { useState } from "react";
import { z } from "zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserApi } from "../features/slicer/LoginUserSlicer";
import Logo from "../images/BookImg.jpg"
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
    <section className="flex font-Montserrat h-screen">
      <div className="flex-1 hidden text-start md:flex flex-col justify-between h-screen overflow-y-hidden">
        <div className="border-r">
          <img src={Logo} alt="logo" className="w-full h-screen object-cover" />
        </div>
      </div>
      <div className="h-screen flex-1 flex flex-col justify-center px-2">
        <div className="w-[65%] mx-auto space-y-8">
          <h1 className="text-4xl text-black font-bold">
            BookNest Admin Portal
          </h1>
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Sign In
            </Typography>
            <Typography className="text-gray-600 font-normal text-[18px]">
              Enter your email and password to sign in
            </Typography>
          </div>

          <div className="w-full">
            <div className="mb-6">
              <label htmlFor="email">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Your Email
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
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  placeholder={""}
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
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
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <Button
              loading={isLoading}
              onClick={handleLogin}
              size="lg"
              className="flex items-center justify-center mt-6 bg-primary"
              fullWidth
            >
              sign in
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
