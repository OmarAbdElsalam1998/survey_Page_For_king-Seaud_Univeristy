
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
    else if(!studentNumber.value.match(/^[0-9]+$/)){
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
//check the validity of acadimicYear
checkeAcadimicYear=()=>{
    if(academicYear.value==""){

        errorMessages[3].textContent="هذا الحقل مطلوب";
        return false;
    }
  
    else{
        errorMessages[3].textContent="";

        return true;

    }
}
checkeUnitNum=()=>{
    if(unitNum.value==""){

        errorMessages[4].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!studentNumber.value.match(/^[0-9]+$/)){
        errorMessages[4].textContent=" الرقم غير صحيح";
        return false;
    }
    else{
        errorMessages[4].textContent="";

        return true;

    }
}

checkUnitStatus=()=>{
    if(unitStatus.value==""){

        errorMessages[5].textContent="هذا الحقل مطلوب";
        return false;
    }
  
    else{
        errorMessages[5].textContent="";

        return true;

    }

}
checkalternativeUnit=()=>{
    if(alternativeUnit.value==""){

        errorMessages[6].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!studentNumber.value.match(/^[0-9]+$/)){
        errorMessages[6].textContent=" الرقم غير صحيح";
        return false;
    }
  
    else{
        errorMessages[6].textContent="";

        return true;

    }
}
checkNotes=()=>{
    if(Notes.value==""){
        console.log( errorMessages[8])

        errorMessages[7].textContent="هذا الحقل مطلوب";
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

        let date=new Date().getTime();
        if(localStorage.getItem("lastTimeSendingMessage")){
             if(date-localStorage.getItem("lastTimeSendingMessage")>10000){
                
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
        emailjs.init("8Cp-QPqnch08NY8uI");
    })();
    let serviceID="service_u048nna";//email service id
    let templateID="template_p9033zc";//email template id 
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
        alertMessage.innerHTML=`<img src="assets/images/success.webp" loading="lazy" alt=""><span >تم إرسال رسالتك بنجاح</span>`;
        submit_button.disabled = false;
        submit_button.innerHTML="إرسال";


        interval=setTimeout(()=>{
          
            alertDiv.classList.remove("active","success");



        },5000);
    }, function(error) {
        alertDiv.classList.add("error","active")
        alertMessage.innerHTML=`<img src="assets/images/error.webp" loading="lazy" alt=""><span >تعذر إرسال الرسالة</span>`;
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
