const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".check-state-modal");
const modalCloseButtons = document.querySelectorAll(".check-state-modal__close");
const checkStateButton = document.querySelector(".check-state-modal__search-button");

modalTriggerButtons.forEach((elem) => {
  elem.addEventListener("click", (event) => toggleModal(event.currentTarget.getAttribute("data-modal-target")));
});

modalCloseButtons.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    toggleModal(event.currentTarget.closest(".check-state-modal").id);
  });
});

modals.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      //toggleModal(event.currentTarget.id);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.querySelector(".check-state-modal.modal-show")) {
    toggleModal(document.querySelector(".check-state-modal.modal-show").id);
  }
});

function toggleModal(modalId) {
  const modal = document.getElementById(modalId);

  if (getComputedStyle(modal).display === "flex") {
    modal.classList.add("modal-hide");
    setTimeout(() => {
      document.body.style.overflow = "initial";
      modal.classList.remove("modal-show", "modal-hide");
      modal.style.display = "none";
    }, 200);
  } else {
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
    const searchInputText = document.querySelector("#check-state-modal__search-input");
    const tableBody = document.querySelector("#data-table tbody");
    searchInputText.value = "";
    tableBody.innerHTML = "";
  }
}

checkStateButton.addEventListener("click", (_) => {
  const searchInputText = document.querySelector("#check-state-modal__search-input").value;
  fetch("https://devicedoctors.ru/api/ExternalAccess/" + searchInputText, {
    headers: {
      signature: "DeviceDoctors",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const tableBody = document.querySelector("#data-table tbody");
      tableBody.innerHTML = "";

      if (json.Status === "ExternalRequestFailed") {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${json.UserMessage}</td>`;
        tableBody.appendChild(row);
      } else {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${json.data.id}</td>
            <td>${json.data.deviceFullName}</td>
            <td>${json.data.status}</td>
            <td>${json.data.state}</td>
        `;

        tableBody.appendChild(row);
      }
    })
    .catch((err) => console.log(err));
});
