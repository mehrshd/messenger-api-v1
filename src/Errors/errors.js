const ErrorValidations = ({ username, email, password_hash, full_name, phone }) => {
 const validationErrors = [];
 const userNameRegex = /^[a-zA-Z0-9_]{4,15}$/;
 const rules = [
  { field: "username", validate: () => typeof username === "string" && username.trim() !== "" && userNameRegex.test(username), message: " Enter your username! " },
  { field: "email", validate: () => typeof email === "string", message: " Enter your email! " },
  { field: "password_hash", validate: () => typeof password_hash === "string" && password_hash.trim() !== "", message: " Enter your password! " },
  { field: "full_name", validate: () => typeof full_name === "string" && full_name.trim() !== "", message: " Enter your fullname! " },
  { field: "phone", validate: () => typeof phone === 'string' && phone !== "", message: " Enter your phoneNumber! " },
 ];

 for(let rule of rules){
  if(!rule.validate()){
    validationErrors.push({ message: rule.message, success: false });
  }
 }

 return validationErrors
}

const DuplicateErrors = ({ username, email, phone, rows }) => {
 const existing = rows;
 const duplicateErrors = [];
 if(existing) {
  if(existing.username == username) duplicateErrors.push({ message: " This username is already taken ", success: false });
  else if(existing.email == email) duplicateErrors.push({ message: " An account has already been created with this email ", success: false });
  else if(existing.phone == phone) duplicateErrors.push({ message: " An account has already been created with this phonenumber ", success: false });
 }

 return duplicateErrors;
}

module.exports = { ErrorValidations, DuplicateErrors};