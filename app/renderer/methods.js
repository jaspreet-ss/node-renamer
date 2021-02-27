const renameRules = {
  // Prefix Function
  addPrefix: function (value) {
    let files = value.files;
    let prefix = value.renameValue;
    for (const [each_file, properties] of Object.entries(files)) {
      files[each_file]["fileNewName"] = prefix + properties["fileNewName"];
    }
    return files;
  },

  // Suffix function
  addSuffix: function (value) {
    let files = value.files;
    let suffix = value.renameValue;
    for (const [each_file, properties] of Object.entries(files)) {
      files[each_file]["fileNewName"] = properties["fileNewName"] + suffix;
    }
    return files;
  },

  // Replace function
  replace: function (value) {
    let files = value.files;
    let findWord = value.renameValue[0];
    let replaceWord = value.renameValue[1];
    for (const [each_file, properties] of Object.entries(files)) {
      files[each_file]["fileNewName"] = properties["fileNewName"].replace(
        findWord,
        replaceWord
      );
    }
    return files;
  },

  // Trim function
  trim: function (value) {
    let files = value.files;
    let trim = value.renameValue[0];
    let position = value.renameValue[1];
    if (position == "trim-begining") {
      for (const [each_file, properties] of Object.entries(files)) {
        files[each_file]["fileNewName"] = properties["fileNewName"].slice(
          0,
          trim
        );
      }
    } else {
      trim = trim - trim * 2;
      for (const [each_file, properties] of Object.entries(files)) {
        files[each_file]["fileNewName"] = properties["fileNewName"].slice(trim);
      }
    }

    return files;
  },

  // Case change function
  caseChange: function (value) {
    let files = value.files;
    let selectedCase = value.renameValue;
    if (selectedCase == "upper-case") {
      for (const [each_file, properties] of Object.entries(files)) {
        files[each_file]["fileNewName"] = properties[
          "fileNewName"
        ].toUpperCase();
      }
    } else if (selectedCase == "lower-case") {
      for (const [each_file, properties] of Object.entries(files)) {
        files[each_file]["fileNewName"] = properties[
          "fileNewName"
        ].toLowerCase();
      }
    }
    return files;
  },

  // Remove words function
  removeWords: function (value) {
    let files = value.files;
    let textToRemove = value.renameValue;
    for (const [each_file, properties] of Object.entries(files)) {
      files[each_file]["fileNewName"] = properties["fileNewName"].replace(
        textToRemove,
        ""
      );
    }
    return files;
  },

  // Numbering function
  numbering: function (value) {
    let files = value.files;
    let numberStartFrom = parseInt(value.renameValue);

    for (const [each_file, properties] of Object.entries(files)) {
      files[each_file]["fileNewName"] =
        numberStartFrom + properties["fileNewName"];
      numberStartFrom += 1;
    }
    return files;
  },

  // Insert timestamp in the names
  addTimestamp: function (value) {
    let files = value.files;
    let selectedDate = value.renameValue[0];
    let selectedFormat = value.renameValue[1];
    let selectedSeperator = value.renameValue[2];
    let surround = value.renameValue[3];
    let selectedFormatObj = JSON.parse(selectedFormat);
    let objectKey = Object.keys(selectedFormatObj)[0];
    let objectValue = selectedFormatObj[objectKey];
    for (const [each_file, properties] of Object.entries(files)) {
      each_file_stats = fs.statSync(each_file);
      let timeStamp = each_file_stats[selectedDate].toLocaleString(objectKey, objectValue).replace(/,?\s|\//g, selectedSeperator);
      files[each_file]["fileNewName"] =
        properties["fileNewName"] + " " + surround[0] + timeStamp + surround[1];
    }
    return files;
  },

  // InsertAt Function
  insertAt: function (value) {
    let files = value.files;
    let insertedInput = value.renameValue[0];
    let insertPosition = value.renameValue[1];
    for (const [each_file, properties] of Object.entries(files)) {
      let fileOldName = properties["fileNewName"];
      files[each_file]["fileNewName"] =
        fileOldName.slice(0, insertPosition) +
        insertedInput +
        fileOldName.slice(insertPosition);
    }
    return files;
  },

  // Reverse Name function
  reverseName: function (value) {
    let files = value.files;
    for (const [each_file, properties] of Object.entries(files)) {
      let fileOldName = properties["fileNewName"];
      files[each_file]["fileNewName"] = [...fileOldName].reverse().join("");
    }
    return files;
  },
};

module.exports = { renameRules };
