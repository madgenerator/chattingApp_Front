//1. make unique ID -> ID : msg....
//2. Format - CSS - design
//3. using chatGPT or copilot
//4. auto Scroll - messageContainer.scrollTop = messageContainer.scrollHeight;
//5. add enter key Input
//6. add Profile Picture
//*** About div - ppt 추가
//7. message align : left/right
//8. 순서바꾸기

//9. nextLine : spanMessage.style.wordSpacing
//10. 말풍선 : 라운드 네모 설정
//11. 초기에 아이디 입력

//get userInput Message
const userInput = document.getElementById("userMessage");
//get userId
const userID = document.getElementById("userID");

//addEventListner to "userMessage"
userInput.addEventListener("keydown", messageEnter);

const socket = io();

function messageEnter(event){
  if(event.key == "Enter"){
    console.log("Enter button pressed.");
    sendMessage();
  }
}

//message send function
function sendMessage() {
  console.log("send button clicked");
  console.log(userInput.value);
  console.log(userID.value);

  //socket.io -> websocket -> send message!! (=emit)
  //Make Json format : {"name":"Jhon", "age":20}
  const userData = { ID: userID.value, Message: userInput.value };
  socket.emit("chatMessage", userData);

  //reset userMessage Text
  userInput.value="";
}

//message receive function
socket.on("chatMessage", function (data) {
  console.log("Received from Server : " + data);
  //data -> {"ID":**** , "Message":####}
  console.log(data.ID); //console.log(data["ID"]);
  console.log(data.Message); //console.log(data.["Message"]);

  //create li
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.flexDirection = "row"; // left to right 정렬
  li.style.alignItems = "center"; // center

  //create profile div
  const profileDiv = document.createElement("div");
  profileDiv.style.display = "flex";
  profileDiv.style.flexDirection = "column"; // top to bottom 정렬
  profileDiv.style.alignItems = "center"; // center

  //create user profile img
  const profileImg = document.createElement("img");
  profileImg.width = 50;
  profileImg.height = 50;

  //create user ID
  const spanID = document.createElement("span");
  spanID.textContent = data.ID;
  spanID.style.fontWeight = "bold";
  spanID.style.color = "blue";

  //create user Messaage
  const spanMessage = document.createElement("span");
  spanMessage.textContent = data.Message;
  //spanMessage.style.margin = "10px";
  //spanMessage.style.wordSpacing =  "normal"; /* 글자가 너무 길어지면 단어를 분리하여 다음 줄로 이동 */
  
  //Right : MyMessage
  //Left : Other message
  //received ID = data.ID
  //my ID = userID.value
  if(data.ID == userID.value){
    profileImg.src = "user_1.png";
    console.log("My message received.")
    li.style.textAlign = "right";
    li.style.justifyContent = "flex-end";
    profileDiv.appendChild(profileImg);
    profileDiv.appendChild(spanID);
    
    li.appendChild(spanMessage);
    li.appendChild(profileDiv);
  }
  else{
    profileImg.src = "user_2.png";
    console.log("Other message received.")
    li.style.textAlign = "left";
    li.style.justifyContent = "flex-start";
    profileDiv.appendChild(profileImg);
    profileDiv.appendChild(spanID);
    
    li.appendChild(profileDiv);
    li.appendChild(spanMessage);
  }
  
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.appendChild(li);

  //message scroll always top
  messageContainer.scrollTop = messageContainer.scrollHeight;
});
