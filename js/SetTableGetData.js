// Variable
let url = new URL(`https://6491791a2f2c7ee6c2c8472b.mockapi.io/student`)
let crTable = document.getElementById("table-mApi");
let mainPagination = document.getElementById('js_pagination');
let resultLength = 0;
let data = [];
let idPage = null;
let idDelete = null;
//Function
async function getData() {
  try {
    const url = new URL(`https://6491791a2f2c7ee6c2c8472b.mockapi.io/student`);
    let response = await fetch(url, { method: 'GET', headers: { 'content-type': 'application/json' } })
    if (response.ok) {
      data = await response.json();
      data.sort((a, b) => a.name.localeCompare(b.name));
      resultLength = data.length;
    }

    return data;
  }
  catch (erro) {
    console.error('Error fetching data:', erro.name);
  }
}

async function createTable(data_new, id_p) {
  try {
    let temp = [];
    for (let k = 0; k < data_new.length; k += 10) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const dataIndex = k + j;
        if (dataIndex < data_new.length) {
          row.push(data_new[dataIndex]);
        }
      }
      temp.push(row);
    }
    for (let i = 0; i < temp[id_p].length; i++) {
      let row = document.createElement('tr');

      let id_number = document.createElement('td')
      id_number.textContent = id_p * 10 + i + 1;
      id_number.style.width = '30px';
      row.appendChild(id_number);

      let name = document.createElement('td')
      name.textContent = temp[id_p][i].name;
      row.appendChild(name);

      let class_name = document.createElement('td')
      class_name.textContent = temp[id_p][i].class;
      row.appendChild(class_name);


      let age = document.createElement('td')
      age.textContent = temp[id_p][i].age;
      age.style.minWidth = '30px';
      row.appendChild(age);


      let phone = document.createElement('td')
      phone.textContent = temp[id_p][i].phone;
      row.appendChild(phone);

      let buttonEvent = document.createElement('td')
      //button Delete
      let creatButtonDelete = document.createElement('button');
      creatButtonDelete.textContent = 'Delete';
      creatButtonDelete.style.margin = '8px';
      creatButtonDelete.style.color = 'white';
      creatButtonDelete.style.backgroundColor = 'red';
      creatButtonDelete.style.border = 'red';
      creatButtonDelete.style.padding = '2px 20px 2px 20px';
      creatButtonDelete.style.cursor = 'pointer';
      creatButtonDelete.style.borderRadius = '8px';
      creatButtonDelete.setAttribute('class', 'js-node-dlt');
      creatButtonDelete.addEventListener('click', () => deleteData(temp[id_p][i].id));
      buttonEvent.appendChild(creatButtonDelete)
      //button Change
      let creatButtonChange = document.createElement('button');
      creatButtonChange.textContent = 'Change';
      creatButtonChange.style.margin = '8px';
      creatButtonChange.style.color = 'white';
      creatButtonChange.style.backgroundColor = 'red';
      creatButtonChange.style.border = 'red';
      creatButtonChange.style.padding = '2px 20px 2px 20px';
      creatButtonChange.style.cursor = 'pointer';
      creatButtonChange.style.borderRadius = '8px';
      creatButtonChange.setAttribute('onclick', `window.location.href = 'PageChange.html?id=${temp[id_p][i].id}&name=${temp[id_p][i].name}&class=${temp[id_p][i].class}&age=${temp[id_p][i].age}&phone=${temp[id_p][i].phone}'`)
      buttonEvent.appendChild(creatButtonChange)

      buttonEvent.style.width = '300px';
      row.appendChild(buttonEvent)

      row.setAttribute('id', `info_user_${temp[id_p][i].id}`)
      crTable.querySelector('tbody').appendChild(row)

    }
  } catch (err) {
    console.error('CreateTable error', err);
  }
}
// create Pagination
let count_pagination = 0;  
function createPagination(data_new) {
  let temp = [];
  for (let k = 0; k < data_new.length; k += 10) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const dataIndex = k + j;
      if (dataIndex < resultLength) {
        row.push(data_new[dataIndex]);
      }
    }
    temp.push(row);
  }

  let li = document.createElement('li');

  li = document.createElement('li');
  let buttonBack = document.createElement('button')
  buttonBack.textContent = '< Back';
  buttonBack.setAttribute('class', 'li_pagination')
  buttonBack.setAttribute('id', 'back_pagination');
  li.setAttribute('class', 'icon')
  li.addEventListener('click', () => {
    if (count_pagination > 0) {
      updateTable(data_new, count_pagination - 1);
      --count_pagination;
      console.log('1', count_pagination);
    } else if (count_pagination < 0){
      alert('Limit min table');
      console.log('2',count_pagination);
      count_pagination = 0;
      console.log('3', count_pagination);
    }
  })
  li.appendChild(buttonBack)
  mainPagination.querySelector('#js_pagination_ul').appendChild(li);

  for (let i = 0; i < temp.length; i++) {
    li = document.createElement('li');
    let button = document.createElement('button')
    button.textContent = i + 1;
    button.setAttribute('class', 'li_pagination')
    li.appendChild(button)
    li.addEventListener('click', () => { updateTable(data_new, i); count_pagination = i })
    console.log('4', count_pagination);
    mainPagination.querySelector('#js_pagination_ul').appendChild(li);
  }
  li = document.createElement('li');
  let buttonNext = document.createElement('button')
  buttonNext.textContent = 'Next >';
  buttonNext.setAttribute('class', 'li_pagination')
  buttonBack.setAttribute('id', 'next_pagination');
  li.setAttribute('class', 'icon')

  li.addEventListener('click', () => {
    if (count_pagination < temp.length-1) {
      updateTable(data_new, count_pagination + 1); ++count_pagination 
    } else {
      alert('Limit max table')
    }
  })
  li.appendChild(buttonNext)
  mainPagination.querySelector('#js_pagination_ul').appendChild(li);
}
//Start
async function start() {
  data = await getData();
  createTable(data, 0);
  createPagination(data);
}
start()

//update Table
function updateTable(data, id) {
  let tbody = crTable.querySelector('tbody');
  // Xóa toàn bộ nội dung trong tbody
  while (tbody.firstChild) {
    document.getElementById("loader").style.display = "block";
    tbody.removeChild(tbody.firstChild);
  }
  if (!tbody.firstChild) {
    idPage = id;
    createTable(data, id);
    document.getElementById("loader").style.display = "none";
  }
}

//update Pagination
function updatePagination(data_new) {
  let ul = mainPagination.querySelector('#js_pagination_ul');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  if (!ul.firstChild) {
    createPagination(data_new);
  }
}
async function showGetData() {
  await getData();
  let filterClass = [];
  let valueClass = document.getElementById('rd-class').value;
  if (valueClass === "") {
    filterClass = data;
    updateTable(filterClass, 0);
    count_pagination = 0;
    updatePagination(filterClass)
  } else {
    filterClass = data.filter((obj) => {
      return obj.class === valueClass;
    })
    data = filterClass;
    updateTable(filterClass, 0);
    count_pagination = 0;
    updatePagination(filterClass)
  }
  if (filterClass.length === 0) {
    document.getElementById('tbl_length').innerHTML = '--------- No Data --------';
  } else {
    document.getElementById('tbl_length').innerHTML = '';
  }
}

//Delete Data
async function handle_Dlt(id) {
  try {
    const urlClear = url + `/${id}`;
    let response = await fetch(urlClear, {
      method: 'DELETE'
    })
    if (response.ok) {
      const result = await response.json()
    }
  } catch (error) {
    alert("Delete Unsuccessful", error.name);
  }
}
function confirm() {
  const element = document.getElementById(`info_user_${idDelete}`);

  element.remove();
  const indexdata = data.findIndex(item => item.id === idDelete)
  data.splice(indexdata, 1)
  handle_Dlt(idDelete)
  updatePagination(data)
  updateTable(data, idPage)
  document.querySelector('.modal_dlt').classList.remove('open');
  idDelete = null;
}
async function deleteData(index) {
  try {
    document.querySelector('.modal_dlt').classList.add('open');
    let close_node = document.getElementById('close_dlt');

    idDelete = index;

    close_node.addEventListener('click', () => {
      document.querySelector('.modal_dlt').classList.remove('open');
    })
  } catch (error) {
    alert("Delete Unsuccessful", error.name);
  }
}
