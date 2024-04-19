import axios from "axios";
//base url
axios.defaults.baseURL = "https://evangadi-forum-1-w4l8.onrender.com/"

export async function loginUser(creds) {
  try {
    const res = await axios.post("/api/users/login", creds);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Login failed");
  }
}
export async function registerUser(creds) {
  try {
    const res = await axios.post("/api/users/register", creds);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Login failed");
  }
}

//create question api
export async function createQuestion(question, token) {
  try {
    const res = await axios.post("/api/questions/create", question, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Question creation failed");
  }
}
//get questions api
export async function getQuestions(token) {
  try {
    console.log('about to check questions')
    const res = await axios.get("/api/questions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    
    });
    console.log(res)
    return res.data;
    
  } catch (error) {
    throw new Error(error.response.data.msg || "Question creation failed");
  }
}
//create answer api
export async function createAnswer(answer, token, questionid) {
  try {
    const res = await axios.post(`/api/answers/${questionid}/create`, answer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Answer creation failed");
  }
}
//get answers api
export async function getAnswers(token, questionid) {
  try {
    const res = await axios.get(`/api/answers/${questionid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Answer creation failed");
  }
}
//user profile image upload api
export async function uploadImage(formData, token) {
  try {
    const res = await axios.post("/api/images/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Image upload failed");
  }
}
//get user profile image api

export async function getUserProfileImage(token) {
  try {
    const res = await axios.get("/api/images/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Image upload failed");
  }
}

//get all user images api
export async function getAllUserImages(token) {
  try {
    const res = await axios.get("/api/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Image upload failed");
  }
}
export async function createQuestionLike(token, questionid) {
  try {
    const res = await axios.post(
      `/api/likes/questions/${questionid}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Question like failed");
  }
}
