const fs = require("fs");

// * Blocking or Synchronous Method.
const file = fs.readFileSync("./files/test.txt", "utf8");
console.log("Sync", file);

const textOut = "This is a Text that is written to a file ✌";
fs.writeFileSync("./files/write.txt", textOut);

// * Asynchronous Method of IO in Files.
fs.readFile("./files/test.txt", "utf8", (err, data) => {
  console.log(data);
  fs.readFile("./files/write.txt", "utf-8", (err, data2) => {
    console.log(data2);
    fs.writeFile(`./files/final.txt`, `${data}\n${data2}`, "utf-8", (err) => {
      if (!err) {
        console.log("File Created Successfully!");
      }
    });
  });
});

