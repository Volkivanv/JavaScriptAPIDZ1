const divContainer = document.querySelector(".container");

const tableHeader = document.createElement("div");
tableHeader.classList.add("row");
tableHeader.classList.add("row-cols-6");
tableHeader.classList.add("table-header");
tableHeader.innerHTML = `
    <div class="col"><p>Название</p></div>
    <div class="col"><p>Время начала</p></div>
    <div class="col max-count"><p>Макс. кол.</p></div>
    <div class="col count"><p>Тек. кол.</p></div>
    <div class="col"><p>Добавить</p></div>
    <div class="col"><p>Удалить</p></div>
    `;

divContainer.appendChild(tableHeader);

fetch("shedule.JSON")
    .then((response) => response.json())
    .then((jsonData) => {
        let number = 0;
        jsonData.forEach((el) => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("row");
            newDiv.classList.add("row-cols-6");
            let count = el.count;
            let maxCount = el.maxCount;
            newDiv.innerHTML = `
        <div class="col"><p>${el.title}</p></div>
        <div class="col"><p>${el.time}</p></div>
        <div class="col max-count" data-id=${number}><p>${el.maxCount}</p></div>
        <div class="col count" data-id=${number}><p>${el.count}</p></div>
        <div class="col"><button class="add-button" id="${number}">Добавить</button></div>
        <div class="col"><button class="delete-button" id="${number}">Удалить</button></div>
        `;
            const addButton = newDiv.querySelector(".add-button");
            const deleteButton = newDiv.querySelector(".delete-button");

            if(number%2 === 0){
                newDiv.classList.add('even');
            }

            if (jsonData[number].count === jsonData[number].maxCount) {
                addButton.classList.add("disabled");
            }

            if (jsonData[number].count === 0) {
                deleteButton.classList.add("disabled");
            }

            divContainer.appendChild(newDiv);

            number++;
        });

        // console.log(divContainer);
        divContainer.addEventListener("click", function (e) {
            if (e.target.classList.contains("add-button")) {
                const nearestDiv = e.target.closest(".row");
                const nearestDeleteButton = nearestDiv.querySelector(".delete-button");
                if (jsonData[Number(e.target.id)].count < jsonData[Number(e.target.id)].maxCount) {
                    jsonData[Number(e.target.id)].count++;
                    if (nearestDeleteButton.classList.contains("disabled")) {
                        nearestDeleteButton.classList.remove("disabled");
                    }
                }
                console.log(e.target.id);
                const countP = nearestDiv.querySelector(".count p");
                countP.textContent = jsonData[Number(e.target.id)].count;
                if (jsonData[Number(e.target.id)].count === jsonData[Number(e.target.id)].maxCount) {
                    e.target.classList.add("disabled");
                }
            }
        });
        divContainer.addEventListener("click", function (e) {
            if (e.target.classList.contains("delete-button")) {
                const nearestDiv = e.target.closest(".row");
                const nearestAddButton = nearestDiv.querySelector(".add-button");
                if (jsonData[Number(e.target.id)].count > 0) {
                    jsonData[Number(e.target.id)].count--;
                    if (nearestAddButton.classList.contains("disabled")) {
                        nearestAddButton.classList.remove("disabled");
                    }
                }
                console.log(e.target.id);

                const countP = nearestDiv.querySelector(".count p");
                countP.textContent = jsonData[Number(e.target.id)].count;

                if (jsonData[Number(e.target.id)].count === 0) {
                    e.target.classList.add("disabled");
                }
            }
        });
    });
