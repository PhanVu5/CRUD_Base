// Author : Vũ Vais
let url = new URL(`https://6491791a2f2c7ee6c2c8472b.mockapi.io/student`)
async function updateData(id) {

    let user = {};
    let urlPut = url + `/${id}`;
    try {
  
      user['name'] = document.getElementById('ip-name-change').value;
      user['class'] = document.getElementById('ip-class-change').value;
      user['age'] = document.getElementById('ip-age-change').value;
      user['phone'] = document.getElementById('ip-phone-change').value;
  
      let response = await fetch(urlPut, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
  
      if (response.ok) {
  
        let result = await response.json();
        backLocation('index.html');
      }
    } catch (erro) {
      console.error("Post Unsuccessful", erro);
    }
    //Return input = ""
    document.getElementById('ip-name-change').value = "";
    document.getElementById('ip-class-change').value = "";
    document.getElementById('ip-age-change').value = "";
    document.getElementById('ip-phone-change').value = "";
}
  //window href
function backLocation(href_name) {
    window.location.href = href_name;
}
  