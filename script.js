"use strict";

// lấy ra các DOM Element cần sử dụng

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthy = document.getElementById("healthy-btn");
const BMI = document.getElementById("bmi-btn");

const petArr = [];

// Lấy được dữ liệu từ các Input Form

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    date: new Date(),
    type: typeInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data); //thêm thú cưng vào list

    renderTable(petArr); // hiển thị list thú cưng
    clearInput(); // xóa các giá trị đã nhập
  }
});

// Validate dữ liệu hợp lệ
function validateData(data) {
  //thông báo cho người dùng
  let isValidate = true;

  if (data.id.trim() === "") {
    alert("Vui lòng điền trường ID");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("Vui lòng điền trường Name");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Vui lòng điền trường Age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Vui lòng điền trường Weight");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Vui lòng điền trường Length");
    isValidate = false;
  }
  //kiểm tra ID duy nhất hay không
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("Trùng ID");
      isValidate = false;
      break;
    }
  }
  if (data.age < 1 || data.age > 15) {
    alert("Độ tuổi phải từ 1 đến 15");
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Cân nặng phải từ 1 đến 15");
    isValidate = false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("Chiều cao phải từ 1 đến 100");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Vui lòng chọn Type");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Vui lòng chọn Breed");
    isValidate = false;
  }

  return isValidate;
}

// hiển thị list thú cưng
function renderTable(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                <th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight} kg</td>
                <td>${petArr[i].length} cm</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${
                    petArr[i].color
                  }"></i>
                </td>
                <td><i class="bi ${
                  petArr[i].vaccinated
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].dewormed
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].sterilized
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td>${petArr[i].bmi}</td>
                <td>${petArr[i].date.getDate()}/${
      petArr[i].date.getMonth() + 1
    }/${petArr[i].date.getFullYear()}</td>
    <td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

// Xóa các dữ liệu vừa nhập trên Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  typeInput.value = "Select Type";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// xóa thú cưng
function deletePet(petId) {
  const isDelete = confirm("Bạn có thực sự muốn xóa");
  if (isDelete) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTable(petArr);
      }
    }
  }
}

//hiện thú cưng khỏe mạnh
let healthyCheck = true;
healthy.addEventListener("click", function () {
  if (healthyCheck === true) {
    // hiển thị thú cưng khỏe mạnh
    const healthyPetArr = [];
    //lọc thú cưng khỏe mạnh
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTable(healthyPetArr);
    healthy.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    //hiển thị toàn bộ thú cưng
    renderTable(petArr);
    healthy.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// hiện giá trị bmi
BMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }
  renderTable(petArr);
});
