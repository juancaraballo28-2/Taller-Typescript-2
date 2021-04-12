import { dataCourses } from './dataCourse.js';
import { Student } from './Student.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
renderPersonalInformationInTable(new Student('201923741', '1111111', '21', 'calle 1 # 1', '31111111'));
function renderPersonalInformationInTable(estudiante) {
    console.log('Creando estudiante');
    document.getElementById('codigo').innerHTML = estudiante.codigo;
    document.getElementById('cedula').innerHTML = estudiante.cedula;
    document.getElementById('edad').innerHTML = estudiante.edad;
    document.getElementById('direccion').innerHTML = estudiante.direccion;
    document.getElementById('telefono').innerHTML = estudiante.telefono;
}
var inputMinBox = document.getElementById("rangoMinimo");
var inputMaxBox = document.getElementById("rangoMaximo");
var btnfilterByCreditos = document.getElementById("button-filterByCreditos");
btnfilterByCreditos.onclick = function () { return applyFilterByCreditos(); };
function applyFilterByCreditos() {
    var min = parseInt(inputMinBox.value);
    var max = parseInt(inputMaxBox.value);
    clearCoursesInTable();
    var cursosBuscados = searchCourseByCreditos(min, max, dataCourses);
    renderCoursesInTable(cursosBuscados);
    totalCreditElm.innerHTML = "" + getTotalCredits(cursosBuscados);
}
function searchCourseByCreditos(min, max, cursos) {
    var array = new Array();
    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].credits >= min && cursos[i].credits <= max) {
            array.push(cursos[i]);
        }
    }
    return array;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
