// Send a single email to person
let send = document.getElementById("send"); // calling the function
send.addEventListener("click", ()=>{        // targetting the clicked button
    let to = document.getElementById("nameList");     
    let subject = document.getElementById("subject");
    let content =  document.getElementById("body");    // getting a mailid, sub, body
    domo.get(`/domo/users/v1?includeDetails=true&limit=137`).then(function(data){  // it will give all the data's from domo
        let id = []; // temp variable
        let resp = document.getElementById("response") //
        for(let iterator of data){                       //
            if(to.value === iterator.detail.email){             // user entered mailid with domo's mail id
                id.push(iterator.id);                   // domo user id stroing in temp variable
                resp.innerHTML = `Mail sent to ${iterator.displayName}`   // 
            }
        }
        const startWorkflow = (alias, body) => {
        domo.post(`/domo/workflow/v1/models/${alias}/start`, body)  // mail sending api
        }
        startWorkflow("sendEmail", { to: id[0], subject: subject.value, body: content.value});   // function call
    let count = 0;
        setInterval(() => {
            if(count==2){
                let resp = document.getElementById("response")
                resp.style.display = "block";
                resp.style.transition = "all 1s ease-in";
            }
            count++
        }, 1000);
        setTimeout(()=>{
            let resp =  document.getElementById("response");
            resp.style.display = "none";
            resp.style.transition = "all 1s ease-out"
        },8000);
    to.value = ""; subject.value = ""; content.value = "";
    });
})
// To get to know who logged in the card
    let currentUser = domo.env.userId;
    domo.get(`/domo/users/v1/${currentUser}?includeDetails=true`)
    .then(function(data){
        let pic = document.getElementById("pic");
        let pTag = document.createElement("p");
        pTag.innerHTML = `Welcome ${data.displayName} !!!`;
        pic.appendChild(pTag);
        let img = document.createElement('img')
        img.src = data.avatarKey; img.alt = "User Image"
        pic.appendChild(img);
    })
// To show the email in the input tag
    domo.get(`/domo/users/v1?includeDetails=true&limit=137`).then(function(data){
    data.forEach(element => {
        const dataList = document.getElementById('names');
        const option = document.createElement('option');
        option.value = element.detail.email;
        dataList.appendChild(option);
    });
})
// To show the user, to input their details
    document.querySelector("a").addEventListener("click", ()=>{
        document.getElementById("text").classList.toggle("active")
    })