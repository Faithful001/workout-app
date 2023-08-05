'use client';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { API } from '../api';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const { user, dispatch } = useContext(AuthContext)
    const history = useHistory()

    const queryClient = useQueryClient()

    const body = { email, password }
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${API.localAPI}api/user/login`, body)
            localStorage.setItem("user", JSON.stringify(response?.data))
            dispatch({ type: "LOGIN", payload: response?.data })
            setMessage(response.data?.message);
            setError("");
            history.push("/")
            console.log(response?.data)
            return response?.data

        } catch (error) {
            console.log(error)
            // setError(error.response?.data?.error)
            setMessage("")
        }
    }

    const mutation = useMutation(handleSubmit, {
        onSuccess: () => {
            queryClient.invalidateQueries("login")
        },
        onError: (error) => {
            console.log(error.message)
        }
    },
    )

    const handleFormSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }


    return (
        <div className="login w-[30rem] h-screen pb-5 px-[10px]">
            <div className="section p-10 mx-16 ">
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleFormSubmit}>
                    <h1 className="flex justify-center font-bold text-[30px]">
                        Log in
                    </h1>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email"
                            placeholder="example@email.com"
                            required
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password"
                            required
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-sky-700 w-full 5 p-2 rounded-md text-white"
                        type="submit"
                    >
                        Log in
                    </button>
                    <p>
                        Don't have an account?
                        <Link to="/signup">
                            <u>Sign up</u>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;