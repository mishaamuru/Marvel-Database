// Hids the tabs and only shows selected tab
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

async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("select-thead");
  const tableBody = table.querySelector("select-tbody");
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
      conditions.push({field, value});
    } else {
      conditions.push({field, value, logic});
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
  newDiv.innerHTML = `<select name="search-attribute" class="search-attribute">
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
  document.getElementById("conditions").appendChild(newDiv);
});

document.querySelector(".or").addEventListener("click", async function () {
  const newDiv = document.createElement("div");
  newDiv.classList.add("condition-row");
  newDiv.dataset.logic = "OR";
    newDiv.innerHTML = `<select name="search-attribute" class="search-attribute">
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
  document.getElementById("conditions").appendChild(newDiv);
});