const socket = io();
console.log("Script");

let message = document.getElementById("message");
let username = document.getElementById("username");
let thisUser = document.getElementById("username");
let sendBtn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

sendBtn.addEventListener("click", () => {
    socket.emit("chat:message", {
        username: username.value,
        message: message.value,
        userId: socket.id
    });
});

message.addEventListener("keypress", (key) => {
        if(key.keyCode==13){
            sendBtn.click();
        }
    });

message.addEventListener("keypress", () => {
    socket.emit("chat:typing", username.value);
});


socket.on("chat:message", (data) => {
    actions.innerHTML = "";
    let cssClass = (socket.id == data.userId) ? "teal accent-1" : "cyan lighten-4";
    output.innerHTML = `
        <div class="col s12 m8 offset-m2 l6 offset-l3">
            <div class="card-panel hoverable ${cssClass} z-depth-1">
                <div class="row valign-wrapper">
                    <div class="col s2">
                        <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle responsive-img">
                    </div>
                    <div class="col s10">
                        <div class="row">
                            <strong>${data.username}</strong>:
                            <div>
                            <small>${data.message}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ` + output.innerHTML;
});


socket.on("chat:typing", (data) => {
    actions.innerHTML = `
    <p>
        <em><strong>${data} </strong>Is tipyng</em>:
    </p>
    `;
});

document.on("ready", () => {

})