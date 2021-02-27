const fs = require("fs");
const path = require("path");

let selectedFilesAndFolders = [];
let selectedRules = [];
let objectOldNewName = {}

// Append html pages to the app
mainBody = document.querySelector(".main-window");
htmlFiles = fs.readdirSync(path.join(__dirname,"./app/view/html"))
htmlFiles.forEach((eachFile)=>{
  console.log("Loading: ",eachFile)
  let fileData = fs.readFileSync(path.join(__dirname,"./app/view/html",eachFile), "utf8")
  mainBody.insertAdjacentHTML('beforeend', fileData);
})

// Buttons event listener
mainBody.addEventListener('click',(e)=>{
    if (e.target.id == "files-window-btn"){
        showFilesAndRulesWindow(".rules-element",".files-element");
    }else if (e.target.id == "rules-window-btn"){
        showFilesAndRulesWindow(".files-element",".rules-element");
    } else if (e.target.id == "remove-all-files-btn"){
        removeAllFilesFromTableAndList()
    } else if(e.target.id == "remove-all-rules-btn"){
        removeAllRulesFromTableAndList()
    }else if(e.target.id == "analyze-filename-btn"){
        openForm("analyze-filename-form");
        analyzeFilesDialog();
    }else if(e.target.id == "close-dialog-btn"){
        closeForm(e.path[2].id)
    }else if(e.target.id == "rename-files-btn"){
        openForm("renaming-process-form");
        renameFiles();
    }else if(e.target.innerText == "info_outline"){
        openForm("app-info-form")
    }
})

// Function to show a hidden dialog
function openForm(selectedRule) {
    document.getElementById(selectedRule).style.display = "block";
}

// Function to hide a dialog
function closeForm(cancelSelectedRule) {
    document.getElementById(cancelSelectedRule).style.display = "none";
}

// Function to show main files and rules window
function showFilesAndRulesWindow(hideWindow,showWindow) {
    document.querySelector(hideWindow).classList.add("hide-all");
    document.querySelector(showWindow).classList.remove("hide-all");
}

// Show analyze dialog before renaming
function analyzeFilesDialog(){
    let analyzeTable = document.querySelector(".analyze-applied-rules")
    let removePreviousTable = analyzeTable.getElementsByTagName("table");
    if (removePreviousTable[0]){
    removePreviousTable[0].remove()
    }
    let analyzedResult = applyRules();
    appendAnalyzeTable(analyzedResult)
}

// Function to add files to the table and the list
function addFilesToTableAndList(filesAndFolders){
    appendFilesTable(filesAndFolders);
    selectedFilesAndFolders.push(...filesAndFolders);
}

// Remove single file 
function removeFileFromTableAndList(htmlParameter){
    let elementToRemove = htmlParameter.innerText
    selectedFilesAndFolders.pop(elementToRemove)
}

// Remove all files
function removeAllFilesFromTableAndList(){
    selectedFilesAndFolders.length = 0;
    let removeFiles = document.querySelector(".files-table")
    let removeFilesTable = removeFiles.getElementsByTagName("table");
    if (removeFilesTable[0]){
    removeFilesTable[0].remove()
    }
    generateEmptyTable(".files-table", "Names");
}

// Function to add rules to the table and the list
function addRulesToTableAndList(userInput){
    let userInputString = "Rule: "+userInput.renameRule+" | Value: "+userInput.renameValue
    appendRulesTable(userInputString);
    selectedRules.push(userInput);
}

// Remove single rule
function removeRuleFromTableAndList(htmlParameter){
    let elementToRemove = htmlParameter.innerText
    selectedRules.pop(elementToRemove)
}

// Remove all rules
function removeAllRulesFromTableAndList(){
    selectedRules.length = 0;
    let removeRules =  document.querySelector(".rules-table")
    let removeRulesTable = removeRules.getElementsByTagName("table");
    if (removeRulesTable[0]){
    removeRulesTable[0].remove()
    }
    generateEmptyTable(".rules-table", "Rules");
}

// Apply rules to analyze
function applyRules(){
    let dictionaryOldNewName = {}

    for (each_file of selectedFilesAndFolders) {
        let fileExtension = path.extname(each_file);
        let fileBaseName = path.basename(each_file, fileExtension);
        let filePath = path.dirname(each_file);
        dictionaryOldNewName[each_file] = {
          "fileFullName":each_file,
          "filePath": filePath,
          "fileBaseName": fileBaseName,
          "fileNewName": fileBaseName,
          "fileExtension": fileExtension,
        };}
        
    for(eachRule of selectedRules){
        console.log("Inside the for loop of rules.")
        if (eachRule.renameRule == "Prefix"){
            dictionaryOldNewName = renameRules.addPrefix({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})
            continue
        } 
        if(eachRule.renameRule == "Suffix") {
            dictionaryOldNewName = renameRules.addSuffix({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})
            continue
        } 
        if(eachRule.renameRule == "Trim"){
            dictionaryOldNewName = renameRules.trim({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})
            continue
        } 
        if(eachRule.renameRule == "Replace"){
            dictionaryOldNewName = renameRules.replace({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})
            continue
        } 
        if(eachRule.renameRule == "Case-Change"){
            dictionaryOldNewName = renameRules.caseChange({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})  
            continue
        }
        if(eachRule.renameRule == "Remove"){
            dictionaryOldNewName = renameRules.removeWords({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})  
            continue
        }
        if(eachRule.renameRule == "Numbering"){
            dictionaryOldNewName = renameRules.numbering({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})  
            continue
        }
        if(eachRule.renameRule == "Timestamp"){
            dictionaryOldNewName = renameRules.addTimestamp({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})  
            continue
        }
        if(eachRule.renameRule == "Insert"){
            dictionaryOldNewName = renameRules.insertAt({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})  
            continue
        }
        if(eachRule.renameRule == "Reverse"){
            dictionaryOldNewName = renameRules.reverseName({"renameValue":eachRule.renameValue,"files":dictionaryOldNewName})  
            continue
        }
        console.log("Value of dictionaryOldNewName",dictionaryOldNewName)
    }
    objectOldNewName = dictionaryOldNewName
 return dictionaryOldNewName
}

// Rename files
function renameFiles(){
    let nameCollision = document.getElementById("name-collision-action-list").value
    let nameCollisionNum = {}
    for (each_file in objectOldNewName){
      let newName = path.join(objectOldNewName[each_file]['filePath'],objectOldNewName[each_file]['fileNewName']+objectOldNewName[each_file]["fileExtension"]);
      if(each_file == newName){
        continue
      }
      else if(!fs.existsSync(newName)){
        fs.renameSync(each_file, newName);
      }else{

        if (nameCollision == "ignoreCollision"){
            console.log("File rename ignored: "+ newName)
            continue
        } else if(nameCollision == "numberIncrementCollision"){
            function renameCollision(){
            let newNameWithoutExt = objectOldNewName[each_file]['filePath']+objectOldNewName[each_file]['fileNewName']
            nameCollisionNum[newNameWithoutExt] = nameCollisionNum[newNameWithoutExt]+1 || 1;
            let newFileNameCollision = newNameWithoutExt+"_"+nameCollisionNum[newNameWithoutExt]+objectOldNewName[each_file]["fileExtension"]
            console.log(newFileNameCollision)
            if (!fs.existsSync(newFileNameCollision)){
          fs.renameSync(each_file,newFileNameCollision);
            } else {
                renameCollision();
            }
        };
        renameCollision();
        }else if(nameCollision == "failCollision"){
          ipcRenderer.send('open-error-dialog', each_file)
          console.log("Sent error")
        }

      }
    }
    if (selectedFilesAndFolders.length < 1){
        document.getElementById("renaming-process-status").innerText = "Please add some files."
        return
    }else if(selectedRules.length < 1){
        document.getElementById("renaming-process-status").innerText = "Please add some rules."
        return
    }
    document.getElementById("renaming-process-status").innerText = "Done"
}
module.exports = {removeAllRulesFromTableAndList,removeRuleFromTableAndList,addFilesToTableAndList,removeFileFromTableAndList,removeAllFilesFromTableAndList,addRulesToTableAndList,analyzeFilesDialog,renameFiles};
