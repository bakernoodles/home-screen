import johnw from '../contact-icons/johnwick.jpg';
import cristiano from '../contact-icons/cristiano.jpg';
import lipa from '../contact-icons/lipa.jpg';
import reynolds from '../contact-icons/reynolds.jpg'
import defaultPic from '../contact-icons/default.svg'
const contactsObj = {
   'A': [{
      firstname: 'Larry',
      lastname: 'Ashy',
      number: '3239876446',
      address: '3477 skidrow, Los Angeles, Ca',
      email: 'ashyLarry@aol.com',
      picture: defaultPic
   }],
   'B': [{
      firstname: 'Tony',
      lastname: 'Banks',
      number: '5560033811',
      address: '43561 love st, Las Vegas, NV',
      email: 'tBanks@gmail.com',
      picture: defaultPic
   }],
   'C': [],
   'D': [],
   'E': [],
   'F': [{
      firstname: 'Lilly',
      lastname: 'Fae',
      number: '8783651784',
      address: '93262 grape ave, San Francisco, CA',
      email: 'LillyBomba@gmail.com',
      picture: defaultPic
   }],
   'G': [{
      firstname: 'Goosey',
      lastname: 'Grey',
      number: '8983761451',
      address: '89372 Alberta ave, LosAngeles, CA',
      email: 'NotAGoose88@yahoo.com',
      picture: defaultPic
   }, {
      firstname: 'Shawn',
      lastname: 'Gibbons',
      number: '9928736743',
      address: '111112 number st, Dallas, TX',
      email: 'GGibbons332@gmail.com',
      picture: defaultPic
   }, {
      firstname: 'Timmy',
      lastname: 'Grubs',
      number: '9127836725',
      address: '223343 Curry st, Westham, UK',
      email: 'Gtiimmy22@gmail.com',
      picture: defaultPic
   }],
   'H': [],
   'I': [],
   'J': [],
   'K': [],
   'L': [{
      firstname: 'Dua',
      lastname: 'Lipa',
      number: '9768565381',
      address: '3244 pear ave, Manchester, UK',
      email: 'dlipa@gmail.com',
      picture: lipa
   }],
   'M': [{
      firstname: 'Anthony',
      lastname: 'Martial',
      number: '9762786371',
      address: '5271 lumis ave, Manchester, UK',
      email: 'aMartial11@gmail.com',
      picture: defaultPic
   }, {
      firstname: 'Shawn',
      lastname: 'Martinez',
      number: '3898747112',
      address: '43892 Sunny ave, Liverpool, UK',
      email: 'MartinezDestroyer97@gmail.com',
      picture: defaultPic
   }, {
      firstname: 'Ron',
      lastname: 'Marks',
      number: '9027865353',
      address: '98767 Grey st, Southhampton, UK',
      email: 'RonnyRon22@gmail.com',
      picture: defaultPic
   }],
   'N': [],
   'O': [],
   'P': [],
   'Q': [],
   'R': [{
      firstname: 'Cristiano',
      lastname: 'Ronaldo',
      number: '2133671683',
      address: '5678 banana ave, Bahrain, Saudi Arabia',
      email: 'cronaldo@gmail.com',
      picture: cristiano
   }],
   'S': [{
      firstname: 'John',
      lastname: 'Smith',
      number: '6783678988',
      address: '1234 apple ave, los angeles, ca',
      email: 'johnsm99@gmail.com',
      picture: johnw
   },
   {
      firstname: 'Andrew',
      lastname: 'Reynolds',
      number: '9877865387',
      address: '4466 baker ave, los angeles, ca',
      email: 'areynolds@gmail.com',
      picture: reynolds
   }],
   'T': [],
   'U': [],
   'V': [],
   'W': [{
      firstname: 'Ronnie',
      lastname: 'Wheasly',
      number: '1337876356',
      address: '33453 South St, Los Angeles, CA',
      email: 'ZhaoZhao@hotmail.com',
      picture: defaultPic
   }],
   'X': [],
   'Y': [],
   'Z': [{
      firstname: 'Lee',
      lastname: 'Zhao',
      number: '9982272634',
      address: '77656 North St, Los Angeles, CA',
      email: 'ZhaoZhao@hotmail.com',
      picture: defaultPic
   }]
}
for (const char in contactsObj) {
   // if there are items in the array, sort them by last + first names
   if (contactsObj[char].length) {
      contactsObj[char].forEach((element, index) => {
         // add
         element.index = index;
         element.startingChar = char;
         contactsObj[char].sort((a, b) => {
            const result = a.lastname.localeCompare(b.lastname)
            return result !== 0 ? result : a.firstname.localeCompare(b.firstname);
         });
         
      });
      
   }


}

export default contactsObj;



