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
let reason=document.getElementById("reason");
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

        errorMessages[0].textContent="هذا الحقل مطلوب";
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

        errorMessages[1].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!studentNumber.value.match(/^[a-zA-z0-9]+$/)){
        errorMessages[1].textContent=" الرقم غير صحيح";
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

        errorMessages[2].textContent="هذا الحقل مطلوب";
        return false;
    }
    else{
        errorMessages[2].textContent="";

        return true;

    }
}
//check the validity of UnitStatus
checkeAcadimicYear=()=>{
    if(message.value==""){

        errorMessages[3].textContent="هذا الحقل مطلوب";
        return false;
    }
  
    else{
        errorMessages[3].textContent="";

        return true;

    }
}

checkUnitStatus=()=>{
    if(unitStatus.value==""){

        errorMessages[4].textContent="هذا الحقل مطلوب";
        return false;
    }
  
    else{
        errorMessages[4].textContent="";

        return true;

    }

}
wew=()=>{
    if(message.value==""){

        errorMessages[3].textContent="هذا الحقل مطلوب";
        return false;
    }
  
    else{
        errorMessages[3].textContent="";

        return true;

    }
}



submit_button.addEventListener("click",(e)=>{
    e.preventDefault();
    checkName();
    checkStudentNumber();
    checkCourseName();
    checkUnitStatus();

    if(checkName()&&checkStudentNumber()&&checkCourseName()){
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
                alertMessage.innerHTML=`<img src="assets/images/error.webp" loading="lazy" alt=""><span >عفوا , مسموح لك بارسال رسالة واحدة</span>`;
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
        emailjs.init("fpJZ-8MzxdLM1ChIu");
    })();
    let serviceID="service_aelso9e";//email service id
    let templateID="template_sode3gp";//email template id 
    let params={
        name:Person_name.value,
        email:email.value,
        phone:phone.value,
        CourseName:subject.value,
        message:message.value


    }
    emailjs.send(serviceID,templateID,params)
    .then(function() {
        alertDiv.classList.add("success","active");
        alertMessage.innerHTML=`<img src="assets/images/success.webp" loading="lazy" alt=""><span >تم إرسال رسالتك بنجاح"</span>`;
        submit_button.disabled = false;
        submit_button.innerHTML="إرسال";


        interval=setTimeout(()=>{
          
            alertDiv.classList.remove("active","success");



        },5000);
    }, function(error) {
        alertDiv.classList.add("error","active")
        alertMessage.innerHTML=`<img src="assets/images/error.webp" loading="lazy" alt=""><span >تعذر إرسال الرسالة"</span>`;
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
