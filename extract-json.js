import { existsSync, mkdirSync, readdir, readFile, writeFile } from 'fs';
import { join, extname, basename } from 'path';

// 定义源目录和目标目录
const sourceDir = join(__dirname, 'src', 'assets', 'province');
const targetDir = join(__dirname, 'src', 'assets', 'mapjson');

// 确保目标目录存在
if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
}

// 读取源目录下的所有文件
readdir(sourceDir, (err, files) => {
    if (err) {
        return console.error('无法扫描目录: ' + err);
    }

    files.forEach(file => {
        // 只处理 .js 文件
        if (extname(file) === '.js') {
            const filePath = join(sourceDir, file);
            readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return console.error('无法读取文件: ' + err);
                }

                // 假设每个 .js 文件中只有一个 JSON 对象，并且是通过 export default 导出的
                try {
                    const jsonContent = JSON.parse(data.match(/export default (\{[\s\S]*\})/)[1]);
                    const targetFilePath = join(targetDir, basename(file, '.js') + '.json');
                    writeFile(targetFilePath, JSON.stringify(jsonContent, null, 2), 'utf8', (err) => {
                        if (err) {
                            return console.error('无法写入文件: ' + err);
                        }
                        console.log(`文件 ${targetFilePath} 已保存`);
                    });
                } catch (e) {
                    console.error(`解析文件 ${filePath} 时出错: ${e}`);
                }
            });
        }
    });
});