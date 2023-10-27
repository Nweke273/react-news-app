import AuthCard from "../components/authCard.jsx";
import Label from "../components/label.jsx";
import Input from "../components/input.jsx";
import Button from "../components/button.jsx";
import Logo from "../components/logo.jsx";
import {useCustomForm} from "../hooks/useCustomForm.js";
import axios from "axios";
import Error from "../components/error.jsx";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/slice/userSlice.js";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        state,
        errors,
        isSubmitting,
        isDisabled,
        handleChange,
        handleSubmit
    } = useCustomForm({
        email: "",
        password: "",
    }, async (formData) => {
        let formURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`;

        const res = await axios.post(formURL, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status === 201) {
            await dispatch(setUser({name: res.data.user.name, email: res.data.user.email, accessToken: res.data.access_token, isAuthenticated: true}));
            navigate("/");
        }
    });
    return (
        <AuthCard logo={<Logo/>}>
            <form onSubmit={handleSubmit}>
                <div className={"mb-2"}>
                    <Label htmlFor="email" value="Email" />
                    <Input
                        id="email"
                        className="block mt-1 w-full"
                        type="email"
                        name="email"
                        required
                        value={state.email}
                        onChange={handleChange}
                    />
                    <Error field={"email"} errors={errors}/>
                </div>
                <div className={"mb-2"}>
                    <Label htmlFor="password" value="Password" />
                    <Input
                        id="password"
                        className="block mt-1 w-full"
                        type="password"
                        name="password"
                        required
                        value={state.password}
                        onChange={handleChange}
                    />
                    <Error field={"password"} errors={errors}/>
                </div>
                <Button disabled={isDisabled} isLoading={isSubmitting}>
                    Login
                </Button>
            </form>
        </AuthCard>
    )
}

export default Login
