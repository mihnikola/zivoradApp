import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../container/Wrapper';
import { LABEL_VALUES } from '../constants';
import ImageLogo from './ImageLogo';
import Capture from './Capture';
import InputItem from './InputItem';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState();
    const notify = (text) => toast(text);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Lozinke nisu iste');
            return;
        }
        try {
            await axios.post('http://localhost:5000/users', {
                name,
                email,
                password
            }).then((result) => {
                console.log("sadas", result)
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setError('');
                setName('');
                navigate('/'); 
            }).catch((error) => {
                notify('Email ili lozinka ime vec postoje',error);
            });


            // navigate('/login');
        } catch (error) {
            console.log("firstaaaa", error)
            setError('Error signing up');
        }

    };

    return (
        <Wrapper>
            <ImageLogo />
            <Capture title={LABEL_VALUES.REGISTER} />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <InputItem placeholder="Unesi ime i prezime" setUserName={setName} userName={name} />
                <InputItem type="email" placeholder="Unesi Email" setUserName={setEmail} userName={email} />
                <InputItem type="password" placeholder="Unesi lozinku" setUserName={setPassword} userName={password} />
                <InputItem type="password" placeholder="Potvrdi lozinku" setUserName={setConfirmPassword} userName={confirmPassword} />
                <button
                    type="submit"
                    className="w-full p-3 bg-gray-500 text-white rounded-md cursor-pointer"
                >
                    {LABEL_VALUES.REGISTER}
                </button>
            </form>
            <div className='flex md:flex-row flex-col justify-between mt-10 gap-10'>
                <div className='text-neutral-500 md:text-end text-center' >
                    Ukoliko već imate nalog možete se prijaviti <span className='text-white cursor-pointer' onClick={() => navigate('/')}>ovde.</span>
                </div>
            </div>
        </Wrapper>
    );
};

export default SignUp;
