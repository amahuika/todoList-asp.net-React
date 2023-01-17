export function emailValidation(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export function passwordValidation(password) {
  if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$/.test(password)) {
    return true;
  }
  return false;
}

export function usernameValidation(name) {
  if (/^[A-Za-z0-9_]{3,15}$/.test(name)) {
    return true;
  }

  return false;
}

export function registerValidation(data) {
  if (data.Email === "" || data.UserName === "" || data.Password === "") {
    return "*Username, Email and Password are required";
  }
  if (!usernameValidation(data.UserName)) {
    return "*Usernames may include lowercase letters, Uppercase letters, numbers, underscores and be between 3 to 15 characters long";
  }
  if (!emailValidation(data.Email)) {
    return "*Invalid email address";
  }
  if (!passwordValidation(data.Password)) {
    return "*Password must include at least 1 lowercase letter, 1 uppercase letter, 1 number and be at least 4 characters long  ";
  }

  return true;
}
