dqs("#closeModal").addEventListener("click",()=> {dqs("#authorModal").close()})
document.querySelectorAll(".authors").forEach(element => element.addEventListener("click", getAuthorInfo))
function dqs(selector){
    return document.querySelector(selector)
}
async function getAuthorInfo() {
    let authorId = this.getAttribute("authorId");
    let url = "api/authors/"+authorId;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    dqs("#authorName").textContent = data[0].firstName + data[0].lastName;
    dqs("#authorImg").src = data[0].portrait;
    dqs("#dob").textContent = data[0].dob;
    dqs("#dod").textContent = data[0].dod;
    dqs("#bp").textContent = data[0].country;
    dqs("#prof").textContent = data[0].profession;
    dqs("#gender").textContent = data[0].sex;
    dqs("#bio").textContent = data[0].biography;
    dqs("#authorModal").showModal();
}