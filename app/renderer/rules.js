// Show selected rule dialog
let ruleSelector = document.getElementById("available-rules-list");
ruleSelector.addEventListener("change", function (e) {
  console.log("Open form with value: ", e.target.value);
  if (e.target.value == "1") {
    openForm("prefix-form");
    return;
  }
  if (e.target.value == "2") {
    openForm("suffix-form");
    return;
  }
  if (e.target.value == "3") {
    openForm("trim-form");
    return;
  }
  if (e.target.value == "4") {
    openForm("replace-form");
    return;
  }
  if (e.target.value == "5") {
    openForm("case-change-form");
    return;
  }
  if (e.target.value == "6") {
    openForm("remove-words-form");
    return;
  }
  if (e.target.value == "7") {
    openForm("numbering-form");
    return;
  }
  if (e.target.value == "8") {
    openForm("timestamp-form");
    return;
  }
  if (e.target.value == "9") {
    openForm("insert-at-form");
    return;
  }
  if (e.target.value == "10") {
    let userPreference = { renameRule: "Reverse", renameValue: "Reverse" };
    addRulesToTableAndList(userPreference);
    return;
  }
});

// Submit selected rule dialog
let submitRule = document.querySelector(".all-rules-container");
submitRule.addEventListener("click", (e) => {
  console.log("Selected rule button id: " + e.target.id);
  
  if (e.target.id == "prefix-btn" && document.getElementById("prefix-input").checkValidity()) {
    e.preventDefault();
    let userPreference = {
      renameRule: "Prefix",
      renameValue: document.getElementById("prefix-input").value,
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
  if (e.target.id == "suffix-btn" && document.getElementById("suffix-input").checkValidity()) {
    e.preventDefault();
    let userPreference = {
      renameRule: "Suffix",
      renameValue: document.getElementById("suffix-input").value,
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
  if (e.target.id == "trim-btn" && document.getElementById("trim-length-input").checkValidity()) {
    e.preventDefault();
    let radioBtn = document.getElementsByName("trim");
    let startPosition = "";
    if (radioBtn[0].checked) {
      startPosition = radioBtn[0].id;
    } else {
      startPosition = radioBtn[1].id;
    }
    let userPreference = {
      renameRule: "Trim",
      renameValue: [document.getElementById("trim-length-input").value, startPosition],
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
  if (e.target.id == "replace-btn" && document.getElementById("replace-with").checkValidity()) {
    e.preventDefault();
    let userPreference = {
      renameRule: "Replace",
      renameValue: [
        document.getElementById("find-words-to-replace").value,
        document.getElementById("replace-with").value,
      ],
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
  if (e.target.id == "case-change-btn") {
    e.preventDefault();
    let radioBtn = document.getElementsByName("caseChange");
    let selectedCase = "";
    if (radioBtn[0].checked) {
      selectedCase = radioBtn[0].id;
    } else {
      selectedCase = radioBtn[1].id;
    }
    let userPreference = {
      renameRule: "Case-Change",
      renameValue: selectedCase,
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    return;
  }
  if (e.target.id == "remove-btn" && document.getElementById("words-to-remove").checkValidity()) {
    e.preventDefault();
    let userPreference = {
      renameRule: "Remove",
      renameValue: document.getElementById("words-to-remove").value,
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
  if (e.target.id == "numbering-btn" && document.getElementById("start-numbering-from").checkValidity()) {
    e.preventDefault();
    let userPreference = {
      renameRule: "Numbering",
      renameValue: document.getElementById("start-numbering-from").value,
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    return;
  }
  if (e.target.id == "timestamp-btn" && document.getElementById("timestamp-separator").checkValidity()) {
    e.preventDefault();
    let radioBtn = document.getElementsByName("time-stamp");
    let selectedFormat = document.getElementById("timestamp-style-list").value;
    let selectedDate = "";
    let selectedSeperator = document.getElementById("timestamp-separator")
      .value;
    let surround = document.getElementById("timestamp-surround-with").value;
    if (radioBtn[0].checked) {
      selectedDate = "ctime";
    } else if (radioBtn[1].checked) {
      selectedDate = "atime";
    } else {
      selectedDate = "mtime";
    }
    let userPreference = {
      renameRule: "Timestamp",
      renameValue: [selectedDate, selectedFormat, selectedSeperator, surround],
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
  if (e.target.id == "insert-btn" && document.getElementById("insert-input").checkValidity() && document.getElementById("insertAtPositionInput").checkValidity()) {
    e.preventDefault();
    let userPreference = {
      renameRule: "Insert",
      renameValue: [
        document.getElementById("insert-input").value,
        document.getElementById("insertAtPositionInput").value,
      ],
    };
    addRulesToTableAndList(userPreference);
    closeForm(e.path[2].id);
    ruleSelector.value = "Select";
    return;
  }
});