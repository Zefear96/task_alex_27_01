//!todo account logic
//! show modal logic
let registerUserModalBtn = document.querySelector("#registerUser-modal");
let loginUserModalBtn = document.querySelector("#loginUser-modal");
let registerUserModalBlock = document.querySelector("#registerUser-block");
let loginUserModalBlock = document.querySelector("#loginUser-block");
let registerUserBtn = document.querySelector("#registerUser-btn");
let loginUserBtn = document.querySelector("#loginUser-btn");
let logoutUserBtn = document.querySelector("#logoutUser-btn");
let closeRegisterModalBtn = document.querySelector(".btn-close");
//? modal sign up
registerUserModalBtn.addEventListener("click", () => {
  registerUserModalBlock.setAttribute("style", "display: flex !important;");
  registerUserBtn.setAttribute("style", "display: flex !important;");
  loginUserModalBlock.setAttribute("style", "display: none !important");
  loginUserBtn.setAttribute("style", "display: none !important");
});
//? modal login
loginUserModalBtn.addEventListener("click", () => {
  registerUserModalBlock.setAttribute("style", "display: none !important;");
  registerUserBtn.setAttribute("style", "display: none !important;");
  loginUserModalBlock.setAttribute("style", "display: flex !important");
  loginUserBtn.setAttribute("style", "display: flex !important");
});

//? request json serv "users"
const USERS_API = "http://localhost:8000/users";

//? register inputs group
let usernameInp = document.querySelector("#reg-username");
let passwordInp = document.querySelector("#reg-password");
let passwordConfirmInp = document.querySelector("#reg-passwordConfirm");
//! register inputs end

//* sign up logic
async function checkUniqueUsername(username) {
  let res = await fetch(USERS_API);
  let users = await res.json();
  return users.some((i) => i.username === username);
}

async function registerUser() {
  if (
    !usernameInp.value.trim() ||
    !passwordInp.value.trim() ||
    !passwordConfirmInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }
  let uniqueUsername = await checkUniqueUsername(usernameInp.value);
  if (uniqueUsername) {
    alert("User with this username already exists!");
    return;
  }
  if (passwordInp.value !== passwordConfirmInp.value) {
    alert("Passwords don't match");
    return;
  }
  let userObj = {
    username: usernameInp.value,
    password: passwordInp.value,
    favorites: [],
  };
  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  console.log(`${userObj.username} was registered`);
  usernameInp.value = "";
  passwordInp.value = "";
  passwordConfirmInp.value = "";
  closeRegisterModalBtn.click();
}

registerUserBtn.addEventListener("click", registerUser);
//* sign up logic end

//* login logic
let showUsername = document.querySelector("#showUsername");

function checkLoginLogoutStatus() {
  let user = localStorage.getItem("user");
  if (!user) {
    loginUserModalBtn.parentNode.style.display = "block";
    registerUserModalBtn.parentNode.style.display = "block";
    logoutUserBtn.parentNode.style.display = "none";

    showUsername.innerText = 'No user';
  } else {
    loginUserModalBtn.parentNode.style.display = "none";
    registerUserModalBtn.parentNode.style.display = "none";
    logoutUserBtn.parentNode.style.display = "block";
    showUsername.innerText = JSON.parse(user).username;
  }
}
checkLoginLogoutStatus();

let loginUsernameInp = document.querySelector("#login-username");
let loginPasswordInp = document.querySelector("#login-password");

function checkUserInUsers(username, users) {
  return users.some((i) => i.username === username);
}

function checkUserPassword(user, password) {
  return user.password === password;
}

function setUserToLocalStorage(username, id, favorites) {
       localStorage.setItem("user", JSON.stringify({ username, id, favorites, }));
};

function toLocaleStorage(obj) {
  localStorage.setItem("user", JSON.stringify(obj));
};

function getUserFromLocaleStorage() {
       let user = localStorage.getItem("user");
       let userObj = JSON.parse(user);
       return userObj;
};

     async function loginUser() {
       if (!loginUsernameInp.value.trim() || !loginPasswordInp.value.trim()) {
         alert("Some inputs are empty");
         return;
       }
       let res = await fetch(USERS_API);
       let users = await res.json();
       if (!checkUserInUsers(loginUsernameInp.value, users)) {
         alert("User not found");
         return;
       }
       let userObj = users.find((i) => i.username === loginUsernameInp.value);
       if (!checkUserPassword(userObj, loginPasswordInp.value)) {
         alert("Wrong password");
         return;
       }
       setUserToLocalStorage(userObj.username, userObj.id, userObj.favorites);
     
       console.log(`${userObj.username} was logged in`);
       loginUsernameInp.value = "";
       loginPasswordInp.value = "";
       checkLoginLogoutStatus();
       closeRegisterModalBtn.click();
       render()
};
     
     loginUserBtn.addEventListener("click", loginUser);
     
     logoutUserBtn.addEventListener("click", () => {
       localStorage.removeItem("user");
     });

     function checkUserForPostCreate() {
       let user = JSON.parse(localStorage.getItem("user"));
       if (user) return user.id;
       return false;
};
     
function showCreatePanel() {
       let createPanel = document.querySelector("#create-panel");
       if (!checkUserForPostCreate()) {
         createPanel.setAttribute("style", "display: none !important");
       } else {
         createPanel.setAttribute("style", "display: flex !important");
       }
};
//* create post
let postTitle = document.querySelector("#post-title");
let postContent = document.querySelector("#post-content");
let addPostBtn = document.querySelector(".add-post-btn");
     
const POSTS_API = "http://localhost:8000/posts";
     
async function createPost() {
       if (!postTitle.value.trim() || !postContent.value.trim()) {
         alert("Some inputs are empty");
         return;
       }
       let user = getUserFromLocaleStorage();
       let postObj = {
         title: postTitle.value,
         content: postContent.value,
         likes: 0,
         author: {
           id: user.id,
           name: user.username,
         },
       };
       await fetch(POSTS_API, {
         method: "POST",
         body: JSON.stringify(postObj),
         headers: {
           "Content-Type": "application/json;charset=utf-8",
         },
       });
       postTitle.value = "";
       postContent.value = "";
       render();
};
addPostBtn.addEventListener("click", createPost);
     //* create post logic end

//* render logic
async function render() {
            
       let postList = document.querySelector("#posts-list");
       let user = getUserFromLocaleStorage();
       postList.innerHTML = '';
       let res = await fetch(POSTS_API);
       let posts = await res.json();

       posts.forEach(item => {
         postList.innerHTML += `
         <div class="card m-5" style="width: 18rem;">
             <div class="card-body">
                 <h5 class="card-title">${item.title}</h5>
                 <hr/>
                 <p class="card-text">${item.content}</p>
                 <p class="card-text"><b>Author</b> :${item.author.name}</p>
                 <p class="card-text"><i class="bi bi-heart-fill" style = "color:red;"></i> ${item.likes}</p>
                 ${
                   checkUserForPostCreate() === item.author.id
                     ? `
      
                     <a href="#" class="btn btn-outline-dark btn-edit" id="edit-${item.id}
                      ">EDIT</a>
                     <a href="#" class="btn btn-outline-danger btn-delete" id="del-${item.id}">DELETE</a>`
                  :
                  ''
                 }
                 ${
                  checkUserForPostCreate()
                    ? `
                    <a href="#" class="btn btn-outline-danger btn-like" id="edit-${item.id}"><i class="bi bi-heart-fill"></i>  ${likeCount}</a>
                    `
                 :
                 ''
                }
             </div>
         </div>
         `;
       });
     
       if (posts.lenth === 0) return;
      addDeleteEvent();
      editPostEvent()
      addLikeEvent();
};
     render();

async function deletePost(e) {
       let postId = e.target.id.split("-")[1];
       await fetch(`${POSTS_API}/${postId}`, {
         method: "DELETE",
       });
       render();
};
     
function addDeleteEvent() {
       let deleteProductBtn = document.querySelectorAll(".btn-delete");
       deleteProductBtn.forEach((i) => i.addEventListener("click", deletePost));
};

// edit posts
let saveChangesBtn = document.querySelector('.save-changes-btn');

function checkCreateAndSaveBtn() {
       if (saveChangesBtn.id) {
              addPostBtn.setAttribute('style', 'display: none;');
              saveChangesBtn.setAttribute('style', 'display: block;');
       } else {
              addPostBtn.setAttribute('style', 'display: block;');
              saveChangesBtn.setAttribute('style', 'display: none;');
       };
};
checkCreateAndSaveBtn();

async function addPostDataToForm(e) {

      let postId = e.target.id.split('-')[1];
      console.log(postId);

      let res = await fetch(`${POSTS_API}/${postId}`); //retrive
      let postObj = await res.json();
      
      console.log(postObj);

      postTitle.value = postObj.title;
      postContent.value = postObj.content;

      saveChangesBtn.setAttribute('id', postId); // or productId bez raznizi
      checkCreateAndSaveBtn();

};

async function saveChanges(e) {
      let updatedPostObj = {
          title: postTitle.value,
          content: postContent.value
      };

      await fetch(`${POSTS_API}/${e.target.id}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedPostObj),
          headers: {
                'Content-Type': 'application/json;charset=utf-8'
          }
      });

      postTitle.value = '';
      postContent.value = '';
 
      saveChangesBtn.removeAttribute('id');

      render();
};

function editPostEvent() {
      let editPostBtns = document.querySelectorAll('.btn-edit');
      editPostBtns.forEach(item => item.addEventListener('click', addPostDataToForm))
};
  
saveChangesBtn.addEventListener('click', saveChanges);

let likeCount = '' //???????????????????
// like logic
async function likePost(e) {
  
  let postId = e.target.id.split("-")[1];
  let likeId = e.target.id.split("-")[1];
  // let likeBtn = document.querySelectorAll(".btn-like");

  let res = await fetch(POSTS_API);
  let posts = await res.json();
  let postObj = await posts.find((i) => i.id == postId);

  let user = getUserFromLocaleStorage();

  let likedUserPost = user.favorites.find((i) => i.id == postId);
  if (likedUserPost) {
    postObj.likes -= 1;
    if(postId == likeId) {
      likeCount = 'Like'
      // e.target.innerText = likeCount 
    }
    await fetch(`${POSTS_API}/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(postObj),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    let favorites = user.favorites.filter(i => i.id != postId)
    user.favorites = favorites
    toLocaleStorage(user)
    render();
    return;
  }
  if (postId == likeId) {
    likeCount = 'Like';
    // e.target.innerText = likeCount
  }

  postObj.likes += 1;
  user.favorites.push(postObj);
  toLocaleStorage(user);

  await fetch(`${POSTS_API}/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  render();
}


function addLikeEvent() {
  let likeBtn = document.querySelectorAll(".btn-like");
  likeBtn.forEach((i) => i.addEventListener("click", likePost));

}
//* like post logic end