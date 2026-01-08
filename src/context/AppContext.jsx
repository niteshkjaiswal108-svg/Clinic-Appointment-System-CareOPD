import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

const loadUserProfileData = async () => {
  try {
    if (!token) {
      setUserData(false)
      return
    }

    const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (data.success) {
      setUserData(data.userData || {}) // ensure it's always an object
    } else {
      setUserData(false)
    }
  } catch (err) {
    console.log(err)
    setUserData(false)
  } finally {
    setLoading(false)
  }
}


     const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData,
        loading
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
  if (token) {
    setLoading(true)
    loadUserProfileData()
  } else {
    setUserData(false)
    setLoading(false)
  }
}, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;