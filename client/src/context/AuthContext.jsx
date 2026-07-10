import {

createContext,

useContext,

useEffect,

useState,

} from "react";

import { getCurrentUser } from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {

        try {

            const res = await getCurrentUser();

            setUser(res.data.data);

        } catch {

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        checkAuth();

    }, []);

    return (

        <AuthContext.Provider

            value={{

                user,

                setUser,

                loading,

                checkAuth,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuthContext = () => useContext(AuthContext);