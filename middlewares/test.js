import * as fs from 'fs';
import path from 'path'
const __dirname = path.resolve();
const fsPromises = fs.promises
 const logEvents = async () => {
  
    try {
       
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'req.logs'), 'someghitng')
    } catch (err) {
        console.log(err)
    }
}

logEvents()