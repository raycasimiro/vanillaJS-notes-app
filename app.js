class Note {
  constructor(
    title = "Untitled",
    text = "Note",
    date = null,
    isPinned = false
  ) {
    this.title = title;
    this.text = text;
    this.date = date;
    this.isPinned = isPinned;
  }
}

class Notes {
  constructor() {
    this.notes = [];
  }

  addNote(note) {
    this.notes.unshift(note);
  }

  removeNote(date) {
    this.notes = this.notes.filter((x) => x.date !== date);
  }
}

const notes = new Notes();
//create dummy Notes

notes.addNote(
  new Note(
    "Hello, world!",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "1/10/2024, 9:06:00 PM",
    false
  )
);

notes.addNote(
  new Note(
    "Crispy Baked Tofu Ingredients",
    "1 block (12 to 15 ounces) organic extra-firm tofu -1 tablespoon extra-virgin olive oil -1 tablespoon tamari* or soy sauce -1 tablespoon cornstarch or arrowroot starch.",
    "1/11/2024, 2:22:00 PM",
    false
  )
);

notes.addNote(
  new Note(
    "This note has a very long title and has multiple lines",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "1/13/2024, 7:33:00 AM",
    false
  )
);

const getFormInput = () => {
  let title = document.getElementById("form-note-title").value;
  let text = document.getElementById("form-note-text").value;
  let date = new Date().toLocaleString();
  return new Note(title, text, date, false);
};

const addCard = () => {
  const newNote = getFormInput();
  formDialog.close();
  notes.addNote(newNote);
  resetNotesContainer();
};

const removeCard = (e) => {
  const date =
    e.target.parentNode.querySelector(".note-date-created").innerHTML;
  notes.removeNote(date);
  resetNotesContainer();
};

const resetNotesContainer = () => {
  notesContainer.innerHTML = "";
  for (let note of notes.notes) {
    createNoteCard(note);
  }
};

const form = document.getElementById("form-create-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard();
  form.reset();
});

const notesContainer = document.getElementById("notes-container");

const btnCreateNote = document.getElementById("btn-open-dialog");
const formDialog = document.querySelector("dialog");
const btnCloseFormDialog = document.getElementById("dialog-btn-close-dialog");

btnCreateNote.addEventListener("click", () => {
  formDialog.showModal();
});

btnCloseFormDialog.addEventListener("click", () => {
  formDialog.close();
});

formDialog.addEventListener("click", (event) => {
  if (event.target.tagName === "DIALOG") formDialog.close();
});

const createNoteCard = (note) => {
  //create element
  const noteCard = document.createElement("div");
  const noteTitle = document.createElement("h2");
  const noteText = document.createElement("p");
  const noteDateCreated = document.createElement("small");
  const btnRemoveNote = document.createElement("button");

  //add class
  noteCard.classList.add("note-card");
  noteTitle.classList.add("note-title");
  noteDateCreated.classList.add("note-date-created");
  noteText.classList.add("note-text");
  btnRemoveNote.classList.add("btn-remove-note");

  //add content
  noteTitle.textContent = `${note.title}`;
  noteDateCreated.textContent = `${note.date}`;
  noteText.textContent = `${note.text}`;
  btnRemoveNote.innerHTML = ' <ion-icon name="trash-outline"></ion-icon>';
  btnRemoveNote.onclick = removeCard;

  //setup everything
  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteDateCreated);
  noteCard.appendChild(noteText);
  noteCard.appendChild(btnRemoveNote);
  notesContainer.appendChild(noteCard);
};

window.onload = resetNotesContainer();
