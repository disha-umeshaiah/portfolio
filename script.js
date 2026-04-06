const first="Disha";
const last="Umeshaiah";

let i=0,j=0;

function typeFirst(){
 if(i<first.length){
  document.getElementById("first-name").innerHTML+=first[i++];
  setTimeout(typeFirst,100);
 } else setTimeout(typeLast,200);
}

function typeLast(){
 if(j<last.length){
  document.getElementById("last-name").innerHTML+=last[j++];
  setTimeout(typeLast,100);
 }
}

typeFirst();

// LOGO CHANGE
window.addEventListener("scroll",()=>{
 const logo=document.getElementById("logo");

 if(window.scrollY>100){
  logo.innerHTML="Zain Mughal";
 } else {
  logo.innerHTML='ZM<span class="cursor">|</span>';
 }
});

// PROJECTS
const grid=document.getElementById("projectsGrid");

for(let i=1;i<=15;i++){
 let div=document.createElement("div");
 div.className="card";
 div.innerHTML=`<h3>Project ${i}</h3><p>Description</p>`;
 grid.appendChild(div);
}


function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_m03s22f", "template_1fd4di9", {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    alert("Message sent!");
  })
  .catch((error) => {
    console.error(error);
    alert("Failed to send");
  });
}