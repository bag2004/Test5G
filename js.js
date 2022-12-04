let arrayNotes=[[],[],[],[],[],[],[],[],[],[],[],[]];
const buttonCreate = document.getElementById('createCalendar');
const monthSelect = document.getElementById('month');
let yearSelect = document.getElementById('year');
let tableTD;
let arrayMonthKl = [];
//let mon = monthSelect.options.selectedIndex;


function load() {
  var arrayNotes = localStorage.getItem('arrayNotes');
  return arrayNotes ? JSON.parse(arrayNotes) : [];
}

console.log(arrayNotes);

function createCalendar(elem){
    load();
    let mon = monthSelect.options.selectedIndex;
    let d = new Date(yearSelect.value, mon);
    let table = '<table class="tableTD"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    // пробелы для первого ряда
      // с понедельника до первого дня месяца
      // * * * 1  2  3  4
      for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
      }
      // <td> ячейки календаря с датами
      while (d.getMonth() == mon) {
        if(arrayNotes[mon][d.getDate()] != undefined){
          table += '<td class="red"><h3>' + d.getDate() + '</h3>'+ arrayNotes[mon][d.getDate()] +'</td>';
        } else {
        table += '<td><h3>' + d.getDate() + '</h3></td>';}
        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
          }
          d.setDate(d.getDate() + 1);
        }  
        if (getDay(d) != 0) {
            for (let i = getDay(d); i < 7; i++) {
              table += '<td></td>';
            }
          }
          // закрыть таблицу
          table += '</tr></table>';
    
          elem.innerHTML = table;
            tableTD = document.querySelectorAll('td');
            tableTD.forEach((element) => {
                element.addEventListener('click',function(){checkTD(element)},false)
            });

}


function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

function save(arrayNotes) {
  localStorage.setItem('arrayNotes', JSON.stringify(arrayNotes));
}



function checkTD(element){
    let i=0,j=0;
    j = element.innerText;
    i = monthSelect.options.selectedIndex;
    console.log('номер месяца:' +i);
    console.log('номер дня:' +j);
    if (element.className != 'red'){
    let txt = prompt('Напишите заметку:', 'Ваша заметка');
    if (txt != null & txt != ''){
        element.innerHTML += txt;
        element.className = 'red';
        arrayNotes[i][j] = txt;
    }}else {
        alert('Заметка уже введена!');
    }
    console.log(arrayNotes);
    save(arrayNotes);
}
monthSelect.addEventListener('change',function(){createCalendar(calendar);},false)
buttonCreate.addEventListener('click',function(){createCalendar(calendar)},false);
createCalendar(calendar);