'use client';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState, useContext } from 'react';
import { API } from '../api';
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    console.log(message)
    console.log(error)

    const queryClient = useQueryClient()

    const { user, dispatch } = useContext(AuthContext)

    const body = { email, name, password }

    const formSubmit = async () => {
        try {
            const response = axios.post(`${API.localAPI}/api/user/signup`, body)
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            setMessage(response.data)
            dispatch({type: "LOGIN", payload: response.data})
            return response.data

        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    }

    const mutation = useMutation(formSubmit, {
        onSuccess: () => {
            queryClient.invalidateQueries('sign up')
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()

    }

    return (
        <div className="signp w-[30rem] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pb-5 px-[10px]">
            <div className="section p-10 mx-16 ">
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleFormSubmit}>
                    <h1 className="flex justify-center font-bold text-[30px]">
                        Sign up
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
                                htmlFor="name"
                                value="Your full name"
                            />
                        </div>
                        <TextInput
                            id="name"
                            placeholder="John Doe"
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
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
                        Sign up
                    </button>
                    <p>
                        Already have an account?
                        <Link to="/login">
                            <u>Log in</u>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;