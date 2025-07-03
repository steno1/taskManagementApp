import { Alert, FormRow } from '../../components';

import Wrapper from '../../assets/wrappers/DashboardFormPage.js';
import { useAppContext } from '../../context/appContext';
import { useState } from 'react';

const Profile = () => {
  const {user, showAlert, displayAlert, userUpdate, isLoading}=useAppContext()
  const [name, setName]=useState(user?.name)
  const [email, setEmail]=useState(user?.email)
  const [lastName, setLastName]=useState(user?.lastName)

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !lastName){
      displayAlert();
      return;
    }
    userUpdate({
      name,
      email,
      lastName
    })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
<h3>Profile</h3>
{showAlert && <Alert/>}
<div className='form-center'>
  <FormRow type='text' name='name' value={name}
   handleChange={(e)=>setName(e.target.value)}/>

<FormRow type='text' labelText='Last Name' value={lastName}
   handleChange={(e)=>setLastName(e.target.value)}/>

<FormRow type='text' name='email' value={email}
   handleChange={(e)=>setEmail(e.target.value)}/>

   <button className='btn btn-block' type="submit" disabled={isLoading}>
{isLoading?"Please wait":"Save changes"}
   </button>

</div>
      </form>
    </Wrapper>
  )
}

export default Profile
