import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [loggerInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {

        console.log(data)
    };

    console.log(watch("example"));
    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggerInUser.name} ref={register({ required: true })} placeholder="name"/>
            { errors.name && <span className="error"> Name is required</span>}

            < input name="email" defaultValue={loggerInUser.email} ref={register({ required: true })} placeholder="email" />
            { errors.email && <span className="error"> email is required</span>}

            < input name="address" ref={register({ required: true })} placeholder="address"/>
            { errors.address && <span className="error"> address is required</span>}

            < input name="phone" ref={register({ required: true })} placeholder="phone no"/>
            { errors.phone && <span className="error"> phone is required</span>}

            <input type="submit" />
        </form >
    );
};

export default Shipment;