import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";


const TEMP_DIR = path.join(__dirname, "../../../temp_files");  


fs.ensureDirSync(TEMP_DIR);

export const executeCpp = async (cppCode: string): Promise<string> => {
    const filePath = path.join(TEMP_DIR, "temp.cpp");
    const exePath = path.join(TEMP_DIR, "temp.out");
    const outputPath = path.join(TEMP_DIR, "temp.txt");

    await fs.writeFile(filePath, cppCode);


    return new Promise((resolve, reject) => {

        exec(`g++ ${filePath} -o ${exePath}`, (compileError, _, stderr) => {
            if (compileError) {
                reject(`Compilation Error:\n${stderr}`);
                return
            }
            exec(`${exePath} > ${outputPath}`, (execError) => {
                if (execError) {
                    // console.log('ExecError: ', execError)
                    reject(`Runtime Error:\n${execError.message}`);
                    return;
                }

                fs.readFile(outputPath, "utf8")
                    .then((data) => resolve(data))
                    .catch((err) => reject(`File Read Error:\n${err.message}`));
            });
        });
    });
};

export default executeCpp
