import '../Contacts/contacts.css';
import back_image from '../../../../assets/back.svg';
import defaultPic from '../../../../assets/contact-icons/default.svg';
import myImage2 from '../../../../assets/contact-icons/me2.jpg';
import { useEffect, useState } from 'react';
import contactsObj from '../../../../assets/contact-icons/contactsObj';
import ContactEdit from "../Contacts/ContactEdit/ContactEdit";
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Contacts = (props) => {
   const [myself, setMyself] = useState(new Person('John', 'Xena', 8332255993, '516 S Anderson St, Los Angeles, CA 90033', 'BingChilling@gmail.com', myImage2));
   const [contacts, setContacts] = useState(contactsObj); // Contacts obj. keywords are the alphabet as strings. The value is an unsorted array of last names starting with the keyword. 
   const [hideList, setHideList] = useState(false);
   const hideListHandler = () => {
      setHideList(!hideList);
   }
   
   if(hideList) return (
   <ContactEdit 
      setHideList={setHideList} 
      hideList={hideList}/>
   );
   
   return (
      <div className="contacts-app-container">
         <button className='backButton' onClick={() => props.hideAllAppsHandler('no-open-apps')}>
            <img className='backButtonImage' alt=";back button" src={back_image} />
         </button>
         {/*----------------------------------MY ID SECTION--------------------------------------*/}
         <div id="me-box">
            <img id="myImage" src={myself.picture ??= defaultPic} alt="" />
            <div id="me-box-description">
               <h3 tabIndex={0}>{myself.firstname + ' ' + myself.lastname}</h3>
               <h5 tabIndex={0}>My ID</h5>
            </div>
         </div>
         {/*----------------------------------Contacts List--------------------------------------*/}
         <div id="contacts-box">
            <div id="contacts-box-left">
               {/* Loop through the alphabet. If there are contacts, Add the Character JSX.
                Also, add the contacts JSX */}
               {alphabet.map((char) => (
                  <div id={char} key={char} className="letter-group">
                     {contacts[char].length ? <div className='bottom-border' tabIndex={0}>{char}</div> : null}
                     {!contacts[char].length ? null : contacts[char].map((contact, ind) => (
                        <button key={"c" + ind} onClick={() => hideListHandler()} className='bottom-border'>
                           {`${contact.firstname} ${contact.lastname}`}
                        </button>)
                     )}
                  </div>
               ))}
            </div>
            {/*-----------------------------RIGHT ALPHABET BUTTONS---------------------------*/}
            <div id="alphabet-button-container">
               {alphabet.map(char => {
                  return (<button key={char + '-button'} onClick={() => document.location = ('#' + char)}>
                     {char}
                  </button>
                  )
               })}
            </div>
         </div>

      </div>)
}



class Person {
   #firstname = '';
   #lastname = '';
   #number = '';
   #address = '';
   #email = '';
   #picture = '';

   constructor(first, last, number, address, email, picture) {
      this.#firstname = first;
      this.#lastname = last;
      this.#number = number;
      this.#address = address;
      this.#email = email;
      this.#picture = picture;
   }

   set firstname(n) {
      this.#firstname = n;
   }
   set lastname(n) {
      this.#lastname = n;
   }
   set number(n) {
      this.#number = n;
   }
   set email(e) {
      this.#email = e;
   }
   set picture(p) {
      this.#picture = p;
   }
   set address(a){
      this.#address = a;
   }


   get firstname() {
      return this.#firstname;
   }
   get lastname() {
      return this.#lastname;
   }
   get number() {
      return this.#number;
   }
   get email() {
      return this.#email;
   }
   get picture() {
      return this.#picture;
   }
   get address(){
      return this.#address;
   }
}

export default Contacts;



