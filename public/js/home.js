document.querySelector("#searchByKeywordForm").addEventListener("submit", lengthCheck);

function lengthCheck(){
    let keyword = document.querySelector("#keyword").value;
    if(keyword.length < 3){
        document.querySelector("#errorCode").textContent ="Keyword must be longer than 2 characters";
        event.preventDefault();
    }
}