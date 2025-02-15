import { createRef, useState } from "react";
import InputItem from "./InputItem";
import axios from "axios";
import Wrapper from "../container/Wrapper";
import { LABEL_VALUES } from "../constants";
import ImageLogo from "./ImageLogo";
import Capture from "./Capture";
import { ToastContainer, toast } from "react-toastify";

const AddService = () => {
    const [serviceName, setServiceName] = useState("");
    const [serviceDuration, setServiceDuration] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = createRef();  // Ref to the file input
 const notify = (text) => {
    toast(text);
  }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: serviceName,
            price: servicePrice,
            duration: serviceDuration,
            image: image
        };
        submitServiceHandler(newUser);

    };
    const submitServiceHandler = async (data) => {
    const token = localStorage.getItem('token');

    try {
            await axios.post('http://localhost:5000/services', {
                params: {
                    name: data.name,
                    price: data.price,
                    duration: data.duration,
                    image: data.image
                },
                headers: { Authorization: `${token}` },

            }).then((res) => {
                if(res.request?.status === 201){
                    notify('Uspešno poslati podaci za servis')
                }
            })
        } catch (error) {
            console.log(error);
        }
        setServiceDuration('');
        setServiceName('');
        setServicePrice('');
        setImage(null);
    }
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
    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };
    return (
        <Wrapper>
            <ImageLogo />
            <Capture title={LABEL_VALUES.FORM_SERVICE} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputItem setUserName={setServiceName} userName={serviceName} placeholder="Unesi naziv servisa" />
                <InputItem setUserName={setServicePrice} userName={servicePrice} placeholder="Unesi cenu servisa" />
                <InputItem setUserName={setServiceDuration} userName={serviceDuration} placeholder="Unesi trajanje servisa u minutima" />
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
                    {LABEL_VALUES.ADD_SERVICE}
                </button>
            </form>
            <ToastContainer theme="dark" />
        </Wrapper>
    )
}
export default AddService