const userNameRegex = /^[a-zA-Z0-9_]{4,15}$/;
const phoneNumberRegex = /^[0-9+-\s()]*$/;

function userValidation(username, email, password_hash, full_name, phone) {

 const errorValues = [];

 const rules = [
  { field: "username", validate: () => typeof username === "string" && username.trim() !== "", message: " Enter your username! " },
  { field: "email", validate: () => typeof email === "string" && email !== "", message: " Enter your email! " },
  { field: "password_hash", validate: () => typeof password_hash === "string" && password_hash.trim() !== "", message: " Enter your password! " },
  { field: "full_name", validate: () => typeof full_name === "string" && full_name.trim() !== "", message: " Enter your fullname! " },
  { field: "phone", validate: () => typeof phone === 'number' && phone !== "", message: " Enter your phoneNumber! " },
 ];

 for(let rule of rules){
  if(!rule.validate()){
   errorValues.push({ message: rule.message });
  }
 }

 return errorValues;

}

module.exports = { userValidation };