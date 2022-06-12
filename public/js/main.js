const deleteText = document.querySelectorAll(".fa-times");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteRapper);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addLike);
});

document.querySelectorAll(".oneTask").forEach((x) =>
  x.addEventListener("click", () => {
    x.parentElement.classList.toggle("cross");
  })
);

//variables/function needed to prevent submitting task without writing a task or date
// let date = document.querySelector("#date");
// let task = document.querySelector("#task");
// document.querySelector("#button").addEventListener("click", (e) => {
//   if (!task.value) {
//     e.preventDefault();
//     if (!date.value) {
//       alert("Please Type a Task and Select a Date Before Pressing Submit");
//     } else {
//       alert("Please Type a Task Before Pressing Submit");
//     }
//   } else if (!date.value) {
//     e.preventDefault();
//     alert("Please Select a Date Before Pressing Submit");
//   } else {
//     return;
//   }
// });

async function deleteRapper() {
  const task = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText;
  const date = this.parentNode.parentNode.childNodes[1].childNodes[3].innerText;
  try {
    const response = await fetch("deleteRapper", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskS: task,
        dateS: date,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const task = this.parentNode.childNodes[1].innerText;
  const date = this.parentNode.childNodes[3].innerText;
  const tLikes = this.parentNode.childNodes[5].innerText;
  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskS: task,
        dateS: date,
        likesS: tLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
