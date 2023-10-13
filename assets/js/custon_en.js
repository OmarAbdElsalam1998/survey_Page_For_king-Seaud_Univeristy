//make header sticky and change background color when user scroll
let main_header=document.querySelector(".main-header .navbar");
window.onscroll=function(){
    if(this.scrollY > 10){
        main_header.classList.add("sticky-nav")


    }
    else{
        main_header.classList.remove("sticky-nav")



    }

}



//handilg sendin email
let studentName=document.getElementById("studentName");
let studentNumber=document.getElementById("studentNum");
let CourseName=document.getElementById("CourseName");
let academicYear=document.getElementById("academicYear");
let unitNum=document.getElementById("unitNum");
let alternativeUnit=document.getElementById("alternativeUnit");
let Notes=document.getElementById("Notes");
let unitStatus=document.getElementById("unitStatus");
let errorMessages=document.querySelectorAll(".error-message");
let surveyForm=document.getElementById("survey-form");
let alertDiv=document.querySelector(".pop-up-alert-message");
let alertMessage=document.querySelector(".pop-up-alert-message .message");
let closeAlertMessageButton=document.querySelector(".pop-up-alert-message .close-alert");
let interval;
let submit_button=document.getElementById("submit_form");


//check the validity of customer name
checkName=()=>{
    if(studentName.value==""){

        errorMessages[0].textContent="this Field Is Required";
        return false;
    }
    else{
        errorMessages[0].textContent="";
        return true;
    }
}


//check the validity of email
checkStudentNumber=()=>{
    if(studentNumber.value==""){

        errorMessages[1].textContent="this Field Is Required";
        return false;
    }
    else if(!studentNumber.value.match(/^[0-9]+$/)){
        errorMessages[1].textContent="Number Not Valid";
        return false;
    }
    else{
        errorMessages[1].textContent="";

        return true;

    }
}
//check the validity of email
checkCourseName=()=>{
    if(CourseName.value==""){

        errorMessages[2].textContent="this Field Is Required";
        return false;
    }
    else{
        errorMessages[2].textContent="";

        return true;

    }
}
//check the validity of acadimicYear
checkeAcadimicYear=()=>{
    if(academicYear.value==""){

        errorMessages[3].textContent="this Field Is Required";
        return false;
    }
  
    else{
        errorMessages[3].textContent="";

        return true;

    }
}
checkeUnitNum=()=>{
    if(unitNum.value==""){

        errorMessages[4].textContent="this Field Is Required";
        return false;
    }
    else if(!studentNumber.value.match(/^[0-9]+$/)){
        errorMessages[4].textContent="Number Not Valid";
        return false;
    }
    else{
        errorMessages[4].textContent="";

        return true;

    }
}

checkUnitStatus=()=>{
    if(unitStatus.value==""){

        errorMessages[5].textContent="this Field Is Required";
        return false;
    }
  
    else{
        errorMessages[5].textContent="";

        return true;

    }

}
checkalternativeUnit=()=>{
    if(alternativeUnit.value==""){

        errorMessages[6].textContent="this Field Is Required";
        return false;
    }
    else if(!studentNumber.value.match(/^[0-9]+$/)){
        errorMessages[6].textContent="Number Not Valid";
        return false;
    }
  
    else{
        errorMessages[6].textContent="";

        return true;

    }
}
checkNotes=()=>{
    if(Notes.value==""){

        errorMessages[7].textContent="this Field Is Required";
        return false;
    }
  
    else{
        errorMessages[7].textContent="";

        return true;

    }
}



submit_button.addEventListener("click",(e)=>{
    e.preventDefault();
    
    checkName();
    checkStudentNumber();
    checkCourseName();
    checkeAcadimicYear();
    checkeUnitNum();
    checkUnitStatus();
    checkalternativeUnit();
    checkNotes();


    if(checkName()&&checkStudentNumber()&&checkCourseName() &&checkeAcadimicYear()&&checkeUnitNum()&&checkUnitStatus()&&checkalternativeUnit()&&checkNotes()){
        submit_button.disabled = true;
        submit_button.innerHTML=`<div class="animation"><span></span><span></span><span></span></div>`;

        let date=new Date(Date.now()).getDate();
        if(localStorage.getItem("lastTimeSendingMessage")){
             if(date!=localStorage.getItem("lastTimeSendingMessage")){
                
                sendEmail();
                localStorage.setItem("lastTimeSendingMessage",date);

                


             }
             else{
                alertDiv.classList.add("error","active")
                alertMessage.innerHTML=`<img src="assets/images/error.webp" loading="lazy" alt=""><span >Sorry ,one Message is Allowed To send</span>`;
                submit_button.innerHTML="إرسال";
                submit_button.disabled = false;


               interval= setTimeout(()=>{
                    alertDiv.classList.remove("active","error");


                },5000);
             }
            
        }
        else{
          
            sendEmail();
          
            localStorage.setItem("lastTimeSendingMessage",date);

            
        }
    }
   

   
    
});    

//sending mails using emailjs

function sendEmail(){
    (function(){
        emailjs.init("sKV7QyH9TsieomS2K");
    })();
    let serviceID="service_ssu5aus";//email service id
    let templateID="template_077uiv7";//email template id 
    let params={
        studentName:studentName.value,
        studentNumber:studentNumber.value,
        CourseName:CourseName.value,
        academicYear:academicYear.value,
        unitNum:unitNum.value,
        unitStatus:unitStatus.options[unitStatus.selectedIndex].text,
        alternativeUnit:alternativeUnit.value,
        Notes:Notes.value,


    }

    emailjs.send(serviceID,templateID,params)
    .then(function() {
        alertDiv.classList.add("success","active");
        alertMessage.innerHTML=`<img src="assets/images/success.webp" loading="lazy" alt=""><span >Your message  sent successfully</span>`;
        submit_button.disabled = false;
        submit_button.innerHTML="Send";


        interval=setTimeout(()=>{
          
            alertDiv.classList.remove("active","success");



        },5000);
    }, function(error) {
        alertDiv.classList.add("error","active")
        alertMessage.innerHTML=`<img src="assets/images/error.webp" loading="lazy" alt=""><span >Sorry we can not send your Message</span>`;
        sendEmail();
       interval= setTimeout(()=>{
        alertDiv.classList.remove("active","error");



        },5000);
    });


}

//close alert message when click on close btn
closeAlertMessageButton.addEventListener("click",function(){
    alertDiv.classList.remove("active")
    clearInterval(interval);

});
