// Envent input enter keypress

let input = document.getElementById("ip-name");
let text_n = document.getElementById("ip-cmt");
text_n.addEventListener("keypress",function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById("click-cmt").click();

    }
})

text_n.addEventListener("keydown",function(event){
    if (event.key === "Enter" && event.shiftKey){
        event.preventDefault();
        text_n.value += "\n";   
    }
})

// Event Comment
let getComment = document.getElementById("name")
// let getRepost = document.getElementsByClassName("repost")
function showInput(){
    if (input.value !== ""){
    var comment = "";
    var name = "";
    name = document.getElementById('ip-name').value;
    comment = document.getElementById('ip-cmt').value;

    var crtName = document.createElement('h3');
    var crtCmt = document.createElement('p');
    crtName.append(name);
    crtCmt.append(comment);
    getComment.append(crtName);
    getComment.append(crtCmt);
    // Gán lại input = ""
    document.getElementById("ip-name").value ="";
    document.getElementById("ip-cmt").value ="";
    }else{
        alert("Bạn chưa nhập tên comment");
    }

}




