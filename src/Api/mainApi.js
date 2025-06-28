import { useEffect, useState } from "react"
import { axiosPublic } from "../lib/axious"

export const getAllClient = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        const fetchGetAllClient = async () => {
           const response = await axiosPublic.get("/clients/get-all-clients")
           setData(response.data?.data)
        }
        fetchGetAllClient()
    },[])
    return data
}