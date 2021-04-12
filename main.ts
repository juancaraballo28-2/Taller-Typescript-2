import { Course } from './course.js';

import { dataCourses } from './dataCourse.js';

import { Student } from './Student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}


renderPersonalInformationInTable(new Student('201923741', '1111111', '21', 'calle 1 # 1', '31111111'));

function renderPersonalInformationInTable(estudiante: Student): void {
  console.log('Creando estudiante');
  document.getElementById('codigo')!.innerHTML = estudiante.codigo;
  document.getElementById('cedula')!.innerHTML = estudiante.cedula;
  document.getElementById('edad')!.innerHTML = estudiante.edad;
  document.getElementById('direccion')!.innerHTML = estudiante.direccion;
  document.getElementById('telefono')!.innerHTML = estudiante.telefono;

}

const inputMinBox: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoMinimo")!;
const inputMaxBox: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoMaximo")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;
btnfilterByCreditos.onclick = () => applyFilterByCreditos();



function applyFilterByCreditos() {
  let min = parseInt(inputMinBox.value);
  let max = parseInt(inputMaxBox.value);
  clearCoursesInTable();
  let cursosBuscados: Course[] = searchCourseByCreditos(min, max, dataCourses);
  renderCoursesInTable(cursosBuscados);
  totalCreditElm.innerHTML = `${getTotalCredits(cursosBuscados)}`
}

function searchCourseByCreditos(min: number, max: number, cursos: Course[]): Course[] {

  var array = new Array();
  for (let i = 0; i < cursos.length; i++) {
    if (cursos[i].credits >= min && cursos[i].credits <= max) {
      array.push(cursos[i]);
    }
  }
  return array;
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}