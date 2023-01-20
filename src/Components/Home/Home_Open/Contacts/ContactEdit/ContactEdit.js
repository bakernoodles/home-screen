import '../ContactEdit/contact-edit.css';
import back_image from '../../../../../assets/back.svg'
const ContactEdit = (props) => {
   return (<div id="contact-edit-container">
      <button className='backButton' onClick={() => props.setHideList()}>
         <img className='backButtonImage' alt=";back button" src={back_image} />
      </button>
      <div id="nameSection">
         <h1>test</h1>
      </div>
   </div>)
}
export default ContactEdit;