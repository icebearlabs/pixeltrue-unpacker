const fs = require('fs');
const path = require('path');

function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

if (!fs.existsSync(process.argv[3])) {
    fs.mkdirSync(process.argv[3], 0744);
}

if (!fs.existsSync(`${process.argv[3]}/svgs/`)) {
    fs.mkdirSync(`${process.argv[3]}/svgs/`, 0744);
}

if (!fs.existsSync(`${process.argv[3]}/pngs/`)) {
    fs.mkdirSync(`${process.argv[3]}/pngs/`, 0744);
}

for (const filePath of walkSync(process.argv[2])) {
    if(filePath.indexOf(".svg") > -1) {
        const subString = filePath.substring(filePath.lastIndexOf("\\"));
        const destinationFileName = `${process.argv[3]}/svgs/${subString}`;

        console.log(subString);

        fs.copyFile(filePath, destinationFileName, (err) => {
            if (err) throw err;
            console.log(`${filePath} was copied to ${destinationFileName}`);
        });
    }

    if(filePath.indexOf(".png") > -1) {
        const subString = filePath.substring(filePath.lastIndexOf("\\"));
        const destinationFileName = `${process.argv[3]}/pngs/${subString}`;

        console.log(subString);

        fs.copyFile(filePath, destinationFileName, (err) => {
            if (err) throw err;
            console.log(`${filePath} was copied to ${destinationFileName}`);
        });
    }

}