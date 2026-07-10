import { createContext, useEffect, useState } from "react";
import api from "../services/api.js";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkAuth();

    }, []);

    const checkAuth = async () => {

        try {

            const res = await api.get("/auth/me");

            setUser(res.data.data);

        }

        catch {

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                setUser,

                loading,

                checkAuth

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}