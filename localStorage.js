
// let liste = JSON.parse.apply(localStorage.getItem('LISTE')) ? JSON.parse.apply(localStorage.getItem('LISTE')) : []

let liste = JSON.parse(localStorage.getItem('LISTE')) || []


let total = 0;
let completed = 0;

const addButton = document.querySelector("#todo-button");
const listUl = document.querySelector("#todo-ul");
const todoInput = document.querySelector("#todo-input");
const totalSpan = document.querySelector("#toplam");
const completeSpan = document.querySelector("#tamamlanan");


//! add butonuna tıklandığında
addButton.onclick = () => {
  if (!todoInput.value) {
    alert(`lütfen bir not giriniz`);

  } else if (liste.includes(todoInput.value)) {
    return;
  } else {
    liste.push(todoInput.value);

    //! listeye eleman eklenince localStorage daki listeyi güncelle
    localStorage.setItem('LISTE', JSON.stringify(liste));

    //! ekranda listeyi göster
    showList();

      todoInput.value='';
    }
  };

 const showList =()=>{


    //*liste kayıtlı yerden gelip UI a bastırılacak, UI da varolan tekrar basılmış olmasın diye, önce ekranı temizledik
    listUl.textContent=''
    
    liste.forEach((todo) =>{

    

     listUl.innerHTML =
      `
      <li class='ayse'>
      <i class="fa fa-check fa-lg"></i>
      <p>${todo}</p>
      <i class="fa fa-trash fa-lg"></i>
      </li>` + listUl.innerHTML; 
    });
    
    
    createDeleteButton();
    createCheckButton();
    
    
    total = liste.length;
    totalSpan.textContent = total;
    
    
    todoInput.value = ""; //input alanı boşalsın
      todoInput.focus(); // mause inputa fokuslansın
  }


todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addButton.onclick();
  }
});

const createDeleteButton = () => {
  document.querySelectorAll(".fa-trash").forEach((a) => {
    a.onclick = () => {
      liste = liste.filter(
        (todo) => todo != a.closest("li").querySelector("p").textContent);

      a.closest("li").remove();

      localStorage.setItem('LISTE', JSON.stringify(liste))

      total--;
      totalSpan.textContent = total;
      if (a.parentElement.classList.contains("checked")) {
        completed--;
        completeSpan.textContent = completed;
      }
    };
  });
};

const createCheckButton = () => {
  document.querySelectorAll(".fa-check").forEach((a) => {
    a.onclick = () => {
      if (a.parentElement.classList.contains("checked")) {
        a.parentElement.classList.remove("checked"); // check edilmiş varsa ekleme, sil
        completed -= 1;
      } else {
        a.parentElement.classList.add("checked"); // yoksa ekle
        completed += 1;
      }
      completeSpan.textContent = completed;
    };
  });
};

showList();
