let liste = [];

//! boş liste hem database işini kolaylaştırır, hem ul ye eklenen verinin aynısı tekrar eklenmesin demek için ,bütün p leri çağır içeriğinde input.value deki değer varsa ekleme, demeli ama p oluşmadan bunu diyemeyiz, bu şekilde liste dizisine eklenen veri globalde olduğu için içeriğine (includes) her yerden bakılabilir

let total = 0;
let completed = 0;

const addButton = document.querySelector("#todo-button");
const listUl = document.querySelector("#todo-ul");
const todoInput = document.querySelector("#todo-input");
const totalSpan = document.querySelector("#toplam");
const completeSpan = document.querySelector("#tamamlanan");

addButton.onclick = () => {
  if (!todoInput.value) {
    // input boş iken, value'si yokken - hiçlikken
    alert(`lütfen bir not giriniz`);

  } else if (liste.includes(todoInput.value)) {
    // daha önce listeye eklenen not tekrar eklenmesin .. //! liste'yi tanımlamış olmasaydık listUl.textContent.includes(todoInput.value) ile arama yapmak durumunda kalacaktık
    return; // return=if in içindeki şart true ise (aynı text listede varsa) hiçbirşey yapma, koda alt satırdan devam et demek

  } else {
    liste.push(todoInput.value);

    //* ekranda listeyi göster
    listUl.innerHTML =
      `
    <li class='ayse'>
    <i class="fa fa-check fa-lg"></i>
    <p>${liste[liste.length - 1]}</p>
    <i class="fa fa-trash fa-lg"></i>
    </li>` + listUl.innerHTML; //! normalde += yapmıştık üstte. ama yeni eklenen başa gelsin istiyoruz. Bu nedenle denklemin başındaki listUl.innerHTML'i +'dan sonraya aldık

    //*   üstteki liste.lengt-1 ile ${todoInput.value} aynı şeyi bulur. Liste'deki son eleman

    total += 1;
    totalSpan.textContent = total; //içerik eklenince sağ üstteki totali arttırdı

    todoInput.value = ""; //input alanı boşalsın
    todoInput.focus(); // mause inputa fokuslansın
  }

  //*silme metodu, ekrana basıldığı süslüde (add butonuna basılma süslüsünde) olmalı, dışarıda fa-trash lara tıklayınca, remove mantıklı değil, ortada fa-trash daha oluşmadan (add butonuna basılmadan) js ye çağırmak gibi oluyor
  //! trash (çöp) ikonuna tıklanınca:
  createDeleteButton();

  //! check ikonuna tıklanınca
  createCheckButton();
};

//&  enter'a basılınca giriş
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addButton.onclick();
  }
});

const createDeleteButton = () => {
  document.querySelectorAll(".fa-trash").forEach((a) => {
    a.onclick = () => {
      //!listeden silme
      liste = liste.filter(
        (todo) => todo != a.closest("li").querySelector("p").textContent
      );
      //& çöp kovasının üst sülalesine çık, p'yi çağır, onun içeriğini sil

      //!ekrandan (browser dan silme)
      //a.parentElement.remove()
      a.closest("li").remove(); //  -> burada sadece ekrandan sildi,listede duruyordu. üstteki kodla listeden de sildik.!

      total--;
      totalSpan.textContent = total;


      //* eğer silinen işin classname inde checked varsa (bitirilmiş yapılmış bir işse) completed sayısından da bir eksiltme yap

      if(a.parentElement.classList.contains('checked')){
        completed--;
        completeSpan.textContent=completed;
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
  