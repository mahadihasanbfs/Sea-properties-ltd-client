import { useState } from "react";
import Logo from "../../assets/logo.png";
import { FaEye, FaFacebook } from "react-icons/fa";
import { TbEyeOff } from "react-icons/tb";
// import BrightAlert from "bright-alert";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import useSendData from "../../hooks/usePostData";
import { DB_URL } from "../../const";
import Swal from 'sweetalert2'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { createUser, updateUser, googleSignIn, facebookSignIn } = useAuth();

  const {
    sendData,
    loading: dataLoading,
    error,
    success,
    response,
  } = useSendData();
  const navigate = useNavigate();

  console.log(error, dataLoading);

  const handleGoogleSignIn = () => {
    googleSignIn().then(async (result) => {
      console.log("result", result);
      console.log(result?.user?.reloadUserInfo);

      const googleUserData = {
        name: result?.user?.reloadUserInfo?.displayName,
        email: result?.user?.reloadUserInfo?.email,
      };

      console.log(googleUserData);

      await sendData(`${DB_URL}/users/sign-up`, "POST", googleUserData);

      localStorage.setItem("role", "user");
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
      if (success) {
        localStorage.setItem("role", "user");
        Swal.success("successfully signup", "success");
        navigate("/user");
      }
    });
  };

  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    // Calculate the total strength based on criteria
    let strength = 0;

    if (password.length >= minLength) {
      strength += 1;
    }

    if (hasUppercase) {
      strength += 1;
    }

    if (hasLowercase) {
      strength += 1;
    }

    if (hasDigit) {
      strength += 1;
    }

    if (hasSpecialChar) {
      strength += 1;
    }

    if (strength === 5) {
      return "Strong";
    } else if (strength >= 3) {
      return "Moderate";
    } else {
      return "Weak";
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const passwordStrength = checkPasswordStrength(password);
  const SubmitData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const data = {
      name,
      email,
      password,
    };
    await createUser(email, password).then(() => {
      updateUser(name).then(async () => {
        setLoading(false);
        await sendData(`${DB_URL}/users/sign-up`, "POST", data);
        console.log(response);

        if (email === "admin@admin.com") {
          localStorage.setItem("role", "admin");
          navigate("/admin");
        } else {
          localStorage.setItem("role", "user");
          navigate("/user");
        }
      });
    });

  };

  return (
    <div>
      <Helmet>
        <title>Sign Up | Sea Properties ltd</title>
      </Helmet>
      <main className="w-full h-fit my-28 flex  flex-col items-center justify-center lg:px-4">
        <div className="max-w-xl rounded-xl md:p-14 p-0  px-4  py-4 w-full text-gray-600  shadow-xl  ">
          <div className="text-center">
            <img
              src={Logo}
              width={300}
              className="w-[116px] h-[40px] mx-auto"
            />
          </div>
          <form
            onSubmit={SubmitData}
            onChange={(e) => e.target.value}
            className="mt-8 space-y-5"
          >
            <div>
              <p className="mb-2 font-semibold text-black">Name</p>
              <input
                type="text"
                placeholder="Type your name"
                name="name"
                required
                className="w-full rounded-lg border  bg-gray-200 px-6 py-4 text-body-color outline-none duration-300 placeholder:text-gray-500 focus:border-[#0B64B4] text-gray-900 focus-visible:shadow-none border-white border-opacity-10 font-mono focus:border-white/50"
              />
            </div>
            <div>
              <p className="mb-2 font-semibold text-black ">email</p>
              <input
                placeholder="Type your email"
                type="text"
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
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
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

            <div className="flex gap-4">
              <p
                className={`h-2 rounded-xl w-full ${passwordStrength === "Weak" ||
                  passwordStrength === "Moderate" ||
                  passwordStrength === "Strong"
                  ? "bg-[#A20E27]"
                  : "bg-gray-300"
                  }`}
              ></p>
              <div
                className={`h-2 rounded-xl w-full ${passwordStrength === "Moderate" ||
                  passwordStrength === "Strong"
                  ? "bg-[#A20E27]"
                  : "bg-gray-300"
                  }`}
              ></div>
              <div
                className={`h-2 rounded-xl w-full ${passwordStrength === "Strong" ? "bg-[#A20E27]" : "bg-gray-300"
                  }`}
              ></div>
            </div>
            <p className="">
              Already have an account?{" "}
              <Link
                to={"/sign-in"}
                className="mb-2 font-semibold  text-[#0B64B4] hover:text-[#0B64B4]"
              >
                Sign in
              </Link>
            </p>

            <button
              disabled={loading}
              className="w-full disabled:bg-[#a20e27ae] disabled:cursor-not-allowed cursor-pointer items-center justify-center rounded-lg bg-[#A20E27] px-8 py-4 text-lg font-semibold text-white duration-300 text-light hover:bg-[#a20e27ca]"
            >
              {!loading ? "Sign Up" : "loading.."}
            </button>
          </form>

          <div className="flex  justify-center text-light gap-4 mt-4">
            <div
              onClick={handleFacebookSignIn}
              className="w-[220px] h-[50px] rounded-lg text-white bg-[#A20E27] flex justify-center items-center gap-3 hover:cursor-pointer"
            >
              <FaFacebook className="w-6 text-light h-6" />
              <p className="text-lg">Facebook</p>
            </div>

            <div
              onClick={handleGoogleSignIn}
              className="w-[220px] h-[50px] rounded-lg text-white bg-[#A20E27] flex justify-center items-center gap-3 hover:cursor-pointer"
            >
              <AiFillGoogleCircle className="w-6 h-6" />
              <p className="text-lg">Google</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
