import { createContext, useReducer, useEffect, useState, useContext } from "react"

export const AuthContext = createContext()

const INITIALSTATE = {
    user: null
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state;
    }
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIALSTATE)
    console.log("AuthContext State:", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


