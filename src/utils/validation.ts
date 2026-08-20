export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return "";
};

export const validateUsername = (username: string): string => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (username.trim().length < 3) {
    return "Username must be at least 3 characters";
  }

  return "";
};

export const validateRequired = (
  value: string,
  fieldName: string,
): string => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  return "";
};