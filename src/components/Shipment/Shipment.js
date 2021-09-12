import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';


const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => {
        console.log('form submitted', data)
    };

  console.log(watch("example")); 

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    <input {...register("exampleRequired",  { required: true })} placeholder="Your Name" />
    {errors.name && <span className="error">Name is required</span>}
    
    <input {...register("exampleRequired", { required: true })} placeholder="Your Email" />
    {errors.email && <span className="error">email is required</span>}
    
    <input {...register("exampleRequired", { required: true })} placeholder="Your Address"/>
    {errors.address && <span className="error">address is required</span>}
    
    <input {...register("exampleRequired", { required: true })}placeholder="Your Phone"/>
    {errors.phone && <span className="error">phone is required</span>}
    
    <input type="submit" />
    </form>
  );
};

export default Shipment;