import '../ContactEdit/contact-edit.css';
import back_image from '../../../../../assets/back.svg'
import { useState } from 'react';
const ContactEdit = (props) => {
   const [editingOn, setEditingOn] = useState(false);
   const contact = props.currentContact;
   const [name, setName] = useState(contact.firstname + ' ' + contact.lastname);
   const handleInputChange = (e) => {
      setName(e.target.value)
   }
   const handleEditName = () => {
      
   };
   return (<div id="contact-edit-container">
      <div className={props.isScrolled ? 'editContainer edit_container_onScroll' : 'editContainer'}>
         <button className='backButton ' onClick={() => props.setHideList()}>
            <img className='backButtonImage' alt=";back button" src={back_image} />
         </button>
         <button onClick={() => setEditingOn(!editingOn)} className='edit-button'>Edit</button>
      </div>
      
      <div className="nameSection">
         <img />
         <img className='contactImage' src={contact.picture} />
         {editingOn
            ? <input 
               value={name}
               className="name-section_name-input"
               onChange={(e)=> handleInputChange(e)}
               />
            : <h2>{contact.firstname} {contact.lastname}</h2>
         }

      </div>
   </div>)
}
export default ContactEdit;