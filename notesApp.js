const addTitle = document.getElementById('add-title')
const addText = document.getElementById('add-text')
const addNoteBtn = document.getElementById('add-note')
const notesDiv = document.getElementById('notes')
const toggleMenu = document.getElementsByClassName('dropdown-menu')
const deletedNotesSection = document.querySelector('.deleted-note-section')
const notesSection = document.querySelector('.add-note-section')
const archivedNotesSection = document.querySelector('.archived-note-section')
const deletedDiv = document.getElementById('deleted-notes')
const archivedDiv = document.getElementById('archived-notes')
let active = 'notes'
// const deleteNote =document.getElementById('delete-note')

showNotes()
function deletedSection() {
    if (active == 'notes') {
        notesSection.classList.add('disabled')
    }
    else if (active == 'archive') {

        archivedNotesSection.classList.add('disabled')
    }
    else {
        return
    }
    deletedNotesSection.classList.remove('disabled')
    active = 'delete'
    showDeletedNotes()
}

function archivedSection() {
    if (active == 'notes') {
        notesSection.classList.add('disabled')
    }
    else if (active == 'delete') {

        deletedNotesSection.classList.add('disabled')
    }
    else {
        return
    }
    archivedNotesSection.classList.remove('disabled')
    active = 'archive'
    showArchiveNotes()
}
function NotesSection() {
    if (active == 'archive') {
        archivedNotesSection.classList.add('disabled')
    }
    else if (active == 'delete') {

        deletedNotesSection.classList.add('disabled')
    }
    else {
        return
    }
    notesSection.classList.remove('disabled')
    active = 'notes'
    showNotes()

}
function toggleBtn(index) {
    if (toggleMenu[index].style.display === '') {
        toggleMenu[index].style.display = 'block'
        console.log('on')

    }
    else {
        toggleMenu[index].style.display = ''
        console.log('off')

    }

}

// localStorage.setItem('deleted',[])
//implementation of local storage
//json : javscript object notation 


function addNotes() {

    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notes = []
    } else {
        notes = JSON.parse(notes)
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
    addTitle.value = ''
    addText.value = ''
    notes.push(notesObj)
    localStorage.setItem('notes', JSON.stringify(notes))

    showNotes()

}
//
function showNotes() {
    let notes = localStorage.getItem('notes')
    let notesHtml = ''
    if (notes === null) {
        return
    }
    else {
        notes = JSON.parse(notes)
    }
    for (i = 0; i < notes.length; i++) {
        notesHtml += `<div class="note-card">
        <div class='button-group'>
        <button class='ellipsis' onClick={toggleBtn(${i})}>&#10247;</button>
        <ul class='dropdown-menu'>
        <li class="delete-note" id=${i} onClick=deleteNote(${i},'notes')>Delete</li>
        <li>Update</li>
        <li class='archive-note' id=${i} onClick=archiveNote(${i},'notes')>Archive</li>
        </ul>
        </div>
                    <div class="title">${notes[i].title === '' ? 'Note' : notes[i].title}</div>
                    <div class="text">${notes[i].text}</div>
                </div>`

    }
    notesDiv.innerHTML = notesHtml
}
function showDeletedNotes() {
    notesDiv.innerHTML = ''

    let notes = localStorage.getItem('deleted')
    let notesHtml = ''
    if (notes === null) {
        return
    }
    else {
        notes = JSON.parse(notes)
    }
    for (i = 0; i < notes.length; i++) {
        notesHtml += `<div class="note-card">
        <div class='button-group'>
        <button class='ellipsis' onClick={toggleBtn(${i})}>&#10247;</button>
        <ul class='dropdown-menu'>
        <li class='restore-note' onClick=restoreNote(${i},'deleted')>Restore</li>
        <li class="delete-note" id=${i} onClick=permanentDelete(${i})>Delete</li>
        <li class='archive-note' id=${i}
        onClick=archiveNote(${i},'deleted')>Archive</li>
        </ul>
        </div>
                    <div class="title">${notes[i].title === '' ? 'Note' : notes[i].title}</div>
                    <div class="text">${notes[i].text}</div>
                </div>`

    }
    deletedDiv.innerHTML = notesHtml
}
function showArchiveNotes() {
    notesDiv.innerHTML = ''

    let notes = localStorage.getItem('archived')
    let notesHtml = ''
    if (notes === null) {
        return
    }
    else {
        notes = JSON.parse(notes)
    }
    for (i = 0; i < notes.length; i++) {
        notesHtml += `<div class="note-card">
        <div class='button-group'>
        <button class='ellipsis' onClick={toggleBtn(${i})}>&#10247;</button>
        <ul class='dropdown-menu'>
        <li class='restore-note' onClick={restoreNote(${i},'archived')}>Restore</li>
        <li class="delete-note" id=${i} onClick=deleteNote(${i},'archived')>Delete</li>
        
        </ul>
        </div>
                    <div class="title">${notes[i].title === '' ? 'Note' : notes[i].title}</div>
                    <div class="text">${notes[i].text}</div>
                </div>`

    }
    archivedDiv.innerHTML = notesHtml
}
function permanentDelete(index){
    
    let deletedNotes=localStorage.getItem('deleted')
    deletedNotes = JSON.parse(deletedNotes)
    deletedNotes.splice(index,1)
    localStorage.setItem('deleted', JSON.stringify(deletedNotes))
    showDeletedNotes()
}
function deleteNote(index, from) {
    let notes = localStorage.getItem(from)
    let deletedNotes = localStorage.getItem('deleted')
    if (deletedNotes !== null) {
        deletedNotes = JSON.parse(deletedNotes)
    }
    else {
        deletedNotes = []
    }

    if (notes === null) {
        return
    }
    else {
        notes = JSON.parse(notes)
    }
    deletedNotes.push(notes[index])
    notes.splice(index, 1) //this splice function will delete from index and delete 1 element
    localStorage.setItem(from, JSON.stringify(notes))
    localStorage.setItem('deleted', JSON.stringify(deletedNotes))
    if (from == 'notes')
        showNotes()
    else
        showArchiveNotes()


}
function restoreNote(index, from) {
   
    let keptnotes = localStorage.getItem(from)
    let Notes = localStorage.getItem('notes')
    if (Notes !== null) {
        Notes = JSON.parse(Notes)
    }
    else {
        Notes = []
    }

    if (keptnotes === null) {
        return
    }
    else {
        keptnotes = JSON.parse(keptnotes)
    }
    Notes.push(keptnotes[index])
    keptnotes.splice(index, 1) //this splice function will delete from index and delete 1 element
    localStorage.setItem(from, JSON.stringify(keptnotes))
    localStorage.setItem('notes', JSON.stringify(Notes))
    if (from == 'deleted')
        showDeletedNotes()
    else
        showArchiveNotes()


}
function archiveNote(index, from) {
    
    let notes = localStorage.getItem(from)
    let archivedNotes = localStorage.getItem('archived')
    if (archivedNotes !== null) {
        archivedNotes = JSON.parse(archivedNotes)
    }
    else {
        archivedNotes = []
    }

    if (notes === null) {
        return
    }
    else {
        notes = JSON.parse(notes)
    }
    archivedNotes.push(notes[index])
    notes.splice(index, 1) //this splice function will delete from index and delete 1 element
    localStorage.setItem(from, JSON.stringify(notes))
    localStorage.setItem('archived', JSON.stringify(archivedNotes))
    if (from == 'notes')
        showNotes()
    else
        showDeletedNotes()

}
addNoteBtn.addEventListener('click', addNotes)


//delete and archive section
//sorting and filtering: iterate through all the notes and check
//update 