import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { id: token } = useParams();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const verification = async () => {
        await axios
            .get(`http://localhost:5000/users/verify`, {
                params: {
                    token
                }
            })
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error("error++++++", error)

            });
    }
    useEffect(() => {
        verification();

    }, []);
    return (
        <div className="flex items-center justify-center" >
            <div className="bg-white p-10 rounded-lg shadow-md">
                {message && <h2 className="text-2xl font-bold mb-4">{message}</h2>}
            </div>
        </div>
    )
}

export default VerifyEmail