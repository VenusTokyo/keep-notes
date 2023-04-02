const addTitle = document.getElementById('add-title')
const addText = document.getElementById('add-text')
const addNoteBtn = document.getElementById('add-note')
const notesDiv = document.getElementById('notes')
// const deleteNote =document.getElementById('delete-note')
showNotes()

// let notes = []

//implementation of local storage
//json : javscript object notation 


function addNotes() {

    let notes = localStorage.getItem('notes')
    if(notes==null){
        notes=[]
    }else{
        notes=JSON.parse(notes)
    }
    if (addText.value == '') {
        alert('Notes can\'t be empty')
        return
    }
    //local storage stored value in key value format and those key value pair should be strings

   
    const notesObj = {
        title: addTitle.value,
        text: addText.value
    }
    notes.push(notesObj)
    localStorage.setItem('notes',JSON.stringify(notes))

    showNotes()

}
function showNotes() {
    let notes = localStorage.getItem('notes')
    let notesHtml = ''
    if(notes===null){
        return
    }
    else{
        notes=JSON.parse(notes)
    }
    for (i = 0; i < notes.length; i++) {
        notesHtml += `<div class="note-card">
                    <button class="delete-note" id=${i} onClick=deleteNote(${i})>x</button>
                    <div class="title">${notes[i].title===''?'Note':notes[i].title}</div>
                    <div class="text">${notes[i].text}</div>
                </div>`

    }
    notesDiv.innerHTML=notesHtml
}
function deleteNote(index){
    let notes = localStorage.getItem('notes')
    
    if(notes===null){
        return
    }
    else{
        notes=JSON.parse(notes)
    }
    notes.splice(index,1) //this splice function will delete from index and delete 1 element
    localStorage.setItem('notes',JSON.stringify(notes))
    showNotes()


}
addNoteBtn.addEventListener('click', addNotes)
