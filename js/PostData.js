//show Post 
let url = new URL(`https://6491791a2f2c7ee6c2c8472b.mockapi.io/student`)
async function showPost() {
    try {
  
      let user = {};
      user['name'] = document.getElementById('ip-name-create').value;
      user['class'] = document.getElementById('ip-class-create').value;
      user['age'] = document.getElementById('ip-age-create').value;
      user['phone'] = document.getElementById('ip-phone-create').value;
  
      console.log(user);
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
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
    document.getElementById('ip-name-create').value = "";
    document.getElementById('ip-class-create').value = "";
    document.getElementById('ip-age-create').value = "";
    document.getElementById('ip-phone-create').value = "";
  }
  
//window href
function backLocation(href_name) {
    window.location.href = href_name;
}
  