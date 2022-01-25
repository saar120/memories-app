export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //login user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    //sign up user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
