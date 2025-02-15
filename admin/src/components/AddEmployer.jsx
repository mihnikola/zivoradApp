import { createRef, useState } from "react";
import InputItem from "./InputItem";
import axios from "axios";
import Wrapper from "../container/Wrapper";
import { LABEL_VALUES } from "../constants";
import ImageLogo from "./ImageLogo";
import Capture from "./Capture";
import { toast, ToastContainer } from "react-toastify";
const AddEmployer = () => {
    const [employerName, setEmployerName] = useState("");
    const [position, setPosition] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = createRef();
    const token = localStorage.getItem('token');
    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: employerName,
            position,
            image
        };
        submitEmployerHandler(newUser);
    };

     const notify = (text) => {
        toast(text);
      }
    
    const submitEmployerHandler = async (data) => {
        try {
            await axios.post('http://localhost:5000/employees', {
                params: {
                    name: data.name,
                    position: data.position,
                    image: data.image
                },
                headers: { Authorization: `${token}` },


            }).then((res) => {
                if(res.request?.status === 201){
                    notify('Uspešno poslati podaci za radnika')

                  }
            })

        } catch (error) {
            console.log(error);
        }

        setEmployerName('');
        setImage(null);
        setPosition('');
        fileInputRef.current = null;
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
            alert("Prevelika slika.");
            e.target.value = ""; // Clear the file input
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
            };
        }
    };
    return (
        <Wrapper>
            <ImageLogo />
            <Capture title={LABEL_VALUES.FORM_EMPLOYEE} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputItem setUserName={setEmployerName} userName={employerName} placeholder="Unesi ime radnika" />
                <InputItem setUserName={setPosition} userName={position} placeholder="Unesi naziv pozicije" />
                <div className="flex flex-col justify-center items-center mb-20">
                    {image ? <img src={image} alt="Image Preview" className="text-white" /> : null}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}  // Hide the input
                        ref={fileInputRef}  // Link to the ref
                    />
                    <button onClick={handleButtonClick} className="bg-gray-200 w-full p-5">
                        <span className="font-semibold">{LABEL_VALUES.CHOOSE_IMG}</span> {/* This can be replaced with an icon */}
                    </button>
                </div>
                <button type="submit" className="mb-20 w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600">
                    {LABEL_VALUES.ADD_EMPLOYEE}
                </button>
            </form>
            <ToastContainer theme="dark" />
        </Wrapper>
    )
}
export default AddEmployer