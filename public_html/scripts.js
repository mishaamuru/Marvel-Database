// Hides the tabs and only shows selected tab
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }


  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// default page when opened 
document.getElementById("defaultOpen").click();

// View data 
// Checkmarks for the dropdown
var checkList = document.getElementById('checks');

checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}

const checkedmarks = []

document.querySelectorAll("#attributes input[type='checkbox']").forEach(box => {
  box.addEventListener("change", function () {
    if (this.checked) {
      checkedmarks.push(this.value);
    } else {
      checkedmarks.splice(checkedmarks.indexOf(this.value), 1);
    }
  });
});

document.querySelector("#Load").addEventListener("click", async function () {
  if (checkedmarks.length === 0) {
    alert("Array is empty, no attributes selected");
  } else {
    const response = await fetch("/universes?fields=" + checkedmarks.join(","), {
      method: "GET"
    });

    const result = await response.json();
    const tableHead = document.querySelector("#view-thead");
    const tableBody = document.querySelector("#view-tbody");

    if (result.data.length === 0) {
      console.log("No data returned");
      tableHead.innerHTML = "";
      tableBody.innerHTML = "<tr><td>No results found</td></tr>";
    } else {
      tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
      tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
    }
    if (response.ok) {
      document.getElementById("view-message").textContent = result.success;
    } else {
      document.getElementById("view-message").textContent = result.error;
    }
  }
});

function newCondition() {
  return `<select name="search-attribute" class="search-attribute">
                            <option value="">Select Attribute</option>
                            <option value="ActorName">Actor Name</option>
                            <option value="Alias">Alias</option>
                            <option value="CharacterName">Character Name</option>
                            <option value="Standing">Standing</option>
                            <option value="Species">Species</option>
                            <option value="PublicIdentity">Public Identity</option>
                        </select>
                        <select name="equal">
                            <option value="=">=</option>
                        </select>
                        <input type="text" class="search-text" name="search"><br></br>`
}

// Select Tab
document.getElementById("search-button").addEventListener("click", async function () {
  const rows = document.querySelectorAll(".condition-row");
  const conditions = [];

  rows.forEach((row, index) => {
    const field = row.querySelector(".search-attribute").value;
    const value = row.querySelector(".search-text").value;
    const logic = row.dataset.logic;

    if (index === 0) {
      conditions.push({ field, value });
    } else {
      conditions.push({ field, value, logic });
    }
  });

  const response = await fetch("/superhero/search", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(conditions)
  });

  const result = await response.json();
  const tableHead = document.querySelector("#select-thead");
  const tableBody = document.querySelector("#select-tbody");

  if (result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
});

document.querySelector(".and").addEventListener("click", async function () {
  const newDiv = document.createElement("div");
  newDiv.classList.add("condition-row");
  newDiv.dataset.logic = "AND";
  newDiv.innerHTML = newCondition();
  document.getElementById("conditions").appendChild(newDiv);
});

document.querySelector(".or").addEventListener("click", async function () {
  const newDiv = document.createElement("div");
  newDiv.classList.add("condition-row");
  newDiv.dataset.logic = "OR";
  newDiv.innerHTML = newCondition();
  document.getElementById("conditions").appendChild(newDiv);
});

// Insert Tab
document.querySelector("#insert-button").addEventListener("click", async function () {
  const heroname = document.querySelector("#heroActorName").value;
  const heroalias = document.querySelector("#heroAlias").value;
  const powerid = document.querySelector("#powerid").value;
  const dategained = document.querySelector("#dateGained").value;

  const response = await fetch("/heroHasPower", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ heroActorName: heroname, heroAlias: heroalias, powerID: Number(powerid), dateGained: dategained })
  });
  const result = await response.json();
  console.log(result);


  if (response.ok) {
    document.getElementById("insert-message").textContent = "Successfully inserted";
    loadHeroHasPowerTable()
  } else {
    document.getElementById("insert-message").textContent = result.error;
  }

});

async function loadHeroHasPowerTable() {

  const response = await fetch("/heroHasPower");
  const result = await response.json();
  console.log(result);
  const tableHead = document.querySelector("#insert-thead");
  const tableBody = document.querySelector("#insert-tbody");

  if (!result.data || result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
}

// Update Tab
(async function () {
  const response = await fetch("/powers");
  const result = await response.json();
  const powerid = document.querySelector("#updatetable");
   powerid.innerHTML = result.data.map(val => `<option value=${val[0]}>${val[0]}</option>`).join("");
})();

document.querySelector("#update-button").addEventListener("click", async function () {
  const body = {};
  const updateid = document.getElementById("updatetable").value;
  const updateskill = document.getElementById("update-skillset").value;
  const updateweapon = document.getElementById("update-weapon").value;
  const updateweapontype = document.getElementById("update-weaponType").value;

  if (updateskill !== "") body.SkillSet = updateskill;
  if (updateweapon !== "") body.Weapon = updateweapon;
  if (updateweapontype !== "") body.WeaponType = updateweapontype;

  const response = await fetch(`/powers/${updateid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  if (response.ok) {
    document.getElementById("update-message").textContent = result.success;
  } else {
    document.getElementById("update-message").textContent = result.error;
  }
});

// Delete Tab
(async function () {
  const response = await fetch("/powers");
  const result = await response.json();
  const powerid = document.querySelector("#deletetable");
  powerid.innerHTML = result.data.map(val => `<option value=${val[0]}>${val[0]}</option>`).join("");
})();

document.querySelector("#delete-button").addEventListener("click", async function () {
  const id = document.getElementById("deletetable").value;

  const response = await fetch(`/powers/${id}`, {
    method: 'DELETE'
  });

  const result = await response.json();

  if (response.ok) {
    document.getElementById("delete-message").textContent = result.success;
  } else {
    document.getElementById("delete-message").textContent = result.error;
  }
});

//TODO
// Join 
document.querySelector("#join").addEventListener("click", async function  () {
  const species = document.querySelector("#join-attribute").value;
  const response = await fetch("/superheroes/join-species", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ species })
  });
  const result = await response.json();
  const tableHead = document.querySelector("#join-thead");
  const tableBody = document.querySelector("#join-tbody");

  if (result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
});

// Advanced Query Tab
document.querySelector("#groupby-button").addEventListener("click", async function () {
  const response = await fetch("/villains/standing-count", {
    method: 'GET'
  });

  const result = await response.json();
  const tableHead = document.querySelector("#groupby-thead");
  const tableBody = document.querySelector("#groupby-tbody");

  if (result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
});

document.querySelector("#having-button").addEventListener("click", async function () {
  const response = await fetch("/villains/species-count", {
    method: 'GET',
  });

  const result = await response.json();
  const tableHead = document.querySelector("#having-thead");
  const tableBody = document.querySelector("#having-tbody");

  if (result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
});

document.querySelector("#nested-button").addEventListener("click", async function () {
  const response = await fetch("/superheroes/top-species", {
    method: 'GET',
  });

  const result = await response.json();
  const tableHead = document.querySelector("#nested-thead");
  const tableBody = document.querySelector("#nested-tbody");

  if (result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
});

document.querySelector("#division-button").addEventListener("click", async function () {
  const response = await fetch("/superheroes/space-stone-powers", {
    method: 'GET',
  });

  const result = await response.json();
  const tableHead = document.querySelector("#division-thead");
  const tableBody = document.querySelector("#division-tbody");

  if (result.data.length === 0) {
    console.log("No data returned");
    tableHead.innerHTML = "";
    tableBody.innerHTML = "<tr><td>No results found</td></tr>";
  } else {
    tableHead.innerHTML = `<tr>${Object.keys(result.data[0]).map(item => `<th>${item}</th>`).join("")}</tr>`;
    tableBody.innerHTML = result.data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`).join("");
  }
});