const studentList = document.querySelector('#ulStudentList');
const studentDBref = db.collection('student');
const form = document.querySelector('#form');



function displayStudents(student){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let unenroll = document.createElement('div');

    li.setAttribute('data-id',student.id);
    name.textContent =  student.data().name + "  ";
    unenroll.textContent = '-Unenroll';
    li.appendChild(name);
    li.appendChild(unenroll);
    // li.appendChild(classofStud);
    // li.appendChild(section);
    // li.appendChild(roll);

    studentList.appendChild(li);

    unenroll.addEventListener('click', (e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        studentDBref.doc(id).delete();
    })
}


// studentDBref 
//     .get()
//     .then((snapshot)=>{
//         snapshot.docs.forEach(student => {
//             displayStudents(student);
//         });
//     })

studentDBref
    .orderBy('class')
    .onSnapshot(snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(
            change =>{
                if(change.type == 'added'){
                    displayStudents(change.doc);
                }else if(change.type == 'removed'){
                    let li = studentList.querySelector('[data-id=' + change.doc.id + ']');
                    studentList.removeChild(li); 
                }
            }
        )
    })
  

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('student').add({
        name: form.myname.value,
        class: form.myclass.value 
    })
    form.myname.value = "";
    form.myclass.value = "";   
})    