
import { detectLanguage ,translateText } from "../controllers/translate.controller.js";

let mechanicSocket = null;
let userSocket = null;
export let recivedMechData ;
let userLang = null;   
let mechanicLang = null; 

console.log(JSON.stringify(recivedMechData, null, 2));



export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(" New socket connected:", socket.id);

    socket.on("register", (role) => {
      if (role === "user") userSocket = socket;
      if (role === "mechanic") mechanicSocket = socket;
    });

    socket.on("user-request", ({ latitude, longitude }) => {
      console.log(" User location received:", latitude, longitude);

      if (mechanicSocket) {
        mechanicSocket.emit("notify-mechanic", {
          message: "you have a new request",
          userdata: { latitude, longitude },
        });
      }
    });

    socket.on("mechanic-response", (response) => {
      console.log("checking data at "+response.location.mechanicContact);
      recivedMechData = response.location;
      if (userSocket) {
        userSocket.emit("notify-user", response);
      }
    });
       
     
    socket.on("user-message", async (msg) => {
    
      if (!userLang) {
        userLang = await detectLanguage(msg);
        console.log(" User language set to:", userLang);
      }
    
      const finalMsg = mechanicLang ? await translateText(msg, mechanicLang) : msg;


    
      if (mechanicSocket) {
        mechanicSocket.emit("chat-message", {
          from: "user",
          translated: finalMsg
        });
      }
    });


    
    socket.on("mechanic-message", async (msg) => {
     
      if (!mechanicLang) {
        mechanicLang = await detectLanguage(msg);
        console.log("🛠️ Mechanic language set to:", mechanicLang);
      }

     
      const finalMsg = userLang ? await translateText(msg, userLang) : msg;

      
      if (userSocket) {
        userSocket.emit("chat-message", {
          from: "mechanic",
        
          translated: finalMsg
        });
      }
    });
     
  });
};
