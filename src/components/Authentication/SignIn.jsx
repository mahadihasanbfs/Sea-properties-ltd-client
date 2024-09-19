import { useState } from "react";
import Logo from "../../assets/Logo_light.png";
import { FaEye, FaFacebook } from "react-icons/fa";
import { TbEyeOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
// import BrightAlert from "bright-alert";
import { AiFillGoogleCircle } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import useSendData from "../../hooks/usePostData";
import { DB_URL } from "../../const";
import Swal from "sweetalert2";
import { FaCediSign } from "react-icons/fa6";
import ForgotPasswordModal from "./ForgetPasswordMOdal";

const SignIn = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [openModal, setOpenModal] = useState(false);
      const { googleSignIn, facebookSignIn, signIn, loading, setloading } = useAuth();
      const navigate = useNavigate();

      const {
            sendData,
            loading: dataLoading,
            error,
            success,
            response,
      } = useSendData();


      // const { setUser, setCookie } = useContext(AuthContext)

      const handleGoogleSignIn = () => {
            googleSignIn().then(async (result) => {


                  const googleUserData = {
                        name: result?.user?.reloadUserInfo?.displayName,
                        email: result?.user?.reloadUserInfo?.email,
                  };



                  await sendData(`${DB_URL}/users/sign-up`, "POST", googleUserData);

                  localStorage.setItem("role", "user");
                  // Swal.success("successfully signup", "success");
                  navigate("/user");
                  //   if (success) {
                  //     localStorage.setItem("role", "user");
                  //     Swal.success("successfully signup", "success");
                  //     navigate("/user");
                  //   }
                  //   navigate("/");
            });
      };
      const handleFacebookSignIn = () => {
            facebookSignIn().then(async (result) => {
                  await sendData(`${DB_URL}/users/sign-up`, "POST", {
                        name: result?.displayName,
                        email: result?.email,
                  });
                  localStorage.setItem("role", "user");
                  Swal.success("successfully signup", "success");
                  navigate("/user");
                  //   if (success) {
                  //     localStorage.setItem("role", "user");
                  //     Swal.success("successfully signup", "success");
                  //     navigate("/");
                  //   }
            });
      };

      const SubmitData = (e) => {
            setloading(true);
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            const data = {
                  email,
                  password,
            };


            signIn(email, password).then(async () => {
                  setloading(false);
                  await sendData(`${DB_URL}/users/sign-up`, "POST", data);
                  if (email === "admin@admin.com" && password == "admin@admin.com") {
           
                        localStorage.setItem("role", "admin");
                        navigate("/admin");
                  } else {
                        localStorage.setItem("role", "user");
                        navigate("/user");
                  }
            });

      };

      return (
            <div>
                  <Helmet>
                        <title>Sign In | SEA Properties Ltd.</title>
                  </Helmet>
                  <main className="w-full h-fit my-28 flex  flex-col items-center justify-center px-4">
                        <div className="lg:max-w-xl rounded-xl lg:p-14  w-full text-gray-600 bg-light shadow-xl  ">
                              <div className="text-center">
                                    <img
                                          src={Logo}
                                          width={300}
                                          className="w-[116px] object-cover mx-auto"
                                    />
                              </div>
                              <form
                                    onSubmit={SubmitData}
                                    onChange={(e) => e.target.value}
                                    className="mt-8 space-y-5"
                              >
                                    <div>
                                          <p className="mb-2 font-semibold text-black ">Email</p>
                                          <input
                                                placeholder="Type your email"
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full font-mono rounded-lg border  bg-gray-200 px-6 py-4 text-body-color outline-none duration-300 placeholder:text-gray-500 focus:border-[#0B64B4] text-gray-900 focus-visible:shadow-none border-white border-opacity-10 focus:border-white/50"
                                          />
                                    </div>
                                    <div>
                                          <p className="mb-2 font-semibold text-black">Password</p>
                                          <div className="relative">
                                                <input
                                                      type={showPassword ? "text" : "password"}
                                                      required
                                                      name="password"
                                                      placeholder="Type your password"
                                                      className="w-full rounded-lg border bg-gray-200 px-6 py-4 text-body-color font-mono outline-none duration-300 placeholder:text-gray-500 focus:border-[#0B64B4] text-gray-900 focus-visible:shadow-none border-white border-opacity-10 focus:border-white/50"
                                                />
                                                <button
                                                      type="button"
                                                      className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                                >
                                                      {showPassword ? (
                                                            <TbEyeOff
                                                                  onClick={() => setShowPassword(!showPassword)}
                                                                  className="h-4 w-4 text-black"
                                                            />
                                                      ) : (
                                                            <FaEye
                                                                  onClick={() => setShowPassword(!showPassword)}
                                                                  className="h-4 w-4 text-black"
                                                            />
                                                      )}
                                                </button>
                                          </div>
                                    </div>

                                    <div className="flex md:text-sm text-xs items-center justify-between">
                                          <p className="">
                                                Don't have an account?
                                                <Link
                                                      to={"/sign-up"}
                                                      className="mb-2 ml-2 font-semibold  text-[#0B64B4] hover:text-[#0B64B4]"
                                                >
                                                      Sign Up
                                                </Link>
                                          </p>


                                          <button
                                                type="button"
                                                onClick={() => setOpenModal(true)}
                                                className="text-[blue] text-nowrap">
                                                Forgot Password
                                          </button>
                                    </div>

                                    <ForgotPasswordModal openModal={openModal} setOpenModal={setOpenModal} />

                                    <button
                                          disabled={loading}
                                          className="w-full disabled:bg-[#a20e27ae] disabled:cursor-not-allowed cursor-pointer items-center justify-center rounded-lg bg-[#A20E27] px-8 py-4 text-lg font-semibold text-white duration-300 text-light hover:bg-[#a20e27ca]"
                                    >
                                          {!loading ? "Sign In" : "loading.."}
                                    </button>
                              </form>

                              <div className="justify-center gap-4 mt-4">
                                    {/* <div
              onClick={handleFacebookSignIn}
              className="w-[220px] h-[50px] rounded-lg text-white bg-[#A20E27] flex justify-center items-center gap-3 hover:cursor-pointer"
            >
              <FaFacebook className="w-6 text-light h-6" />
              <p className="text-lg text-light">Facebook</p>
            </div> */}

                                    <div
                                          onClick={handleGoogleSignIn}
                                          className="w-full py-4 text-lg font-semibold rounded-lg text-white bg-[#A20E27] flex justify-center items-center gap-3  hover:cursor-pointer"
                                    >
                                          <AiFillGoogleCircle className="w-6 text-light h-6" />
                                          <p className="text-lg text-light">Google</p>
                                    </div>
                              </div>
                        </div>
                  </main>
            </div>
      );
};

export default SignIn;
