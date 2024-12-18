export const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression pattern
    return regex.test(email);
}

export const setLocalData = (data) => {
    localStorage.setItem("accessToken", data)
}