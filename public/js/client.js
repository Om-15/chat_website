const socket = io();

const form = document.getElementById("sendingsystem");
const messageInput = document.getElementById("message_box");
const send_button = document.getElementById("send_button");
const messageContainer = document.getElementById("container");
var audio = new Audio("../ting.mp3")

const append1 = (clint , message , position)=>{
  
  const create_join = document.createElement('div')
  create_join.innerHTML = `<p class="sender join_person">${clint} joined the chat</p>`
  // create_join.innerHTML = `<p class="text-msg" > ${message}</p>`
  // create_join.innerHTML = `<p class="sender join_person">${clint} joined the chat</p><p class="text-msg" >${message}</p>`
  create_join.className = `msg ${position}`
  
  document.getElementById("container").append(create_join)
}
const append1_ = (clint , message , position)=>{
  
  const create_join = document.createElement('div')
  create_join.innerHTML = `<p class="sender join_person">${clint} leave the chat</p>`
  create_join.className = `msg ${position}`
  
  document.getElementById("container").append(create_join)
}
const append2 = (clint , message , position)=>{
  
  const create_join = document.createElement('div')
  create_join.innerHTML = `<p class="text-msg" > ${message}</p>`
  create_join.className = `msg ${position}`
  document.getElementById("container").append(create_join)
}
const append3 = (clint , message , position)=>{
  const create_join = document.createElement('div')
  create_join.innerHTML = `<p class="sender join_person">${clint}</p><p class="text-msg" >${message}</p>`
  document.getElementById("container").append(create_join)
  create_join.className = `msg ${position}`
}

send_button.onclick = (e)=>{
  e.preventDefault();
  const message = messageInput.value
  append2( "none" ,message,"right")
  socket.emit("send",message);
  messageInput.value  =  ''

}
let names = '' ;

do {
    names = prompt("enter your name to join");
} while ( names == "" || undefined || null );




socket.emit("new-user-joined", names);

socket.on('urer-joined' , data =>{
    append1( data , "none" , "left")
    audio.play()
  })
  socket.on('receive' , data =>{
    append3( data.name , data.massage , "left") 
    audio.play()
  })
  socket.on('left' , data =>{
    append1_( data.name , "none" , "left") 
    // console.log("ompawa")
    audio.play()
  })
