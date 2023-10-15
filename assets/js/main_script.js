//show loader before page loading

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.display = "none";
            document.querySelector(
            "body").style.overflow = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
            document.querySelector(
            "body").style.overflow = "auto";
        document.querySelector(
            "body").style.display = "block";
    }
};



////make header sticky and change background color when user scroll
let main_header=document.querySelector(".main-header .navbar");
window.onscroll=function(){
    if(this.scrollY > 10){
        main_header.classList.add("sticky-nav")


    }
    else{
        main_header.classList.remove("sticky-nav")



    }

}