import os
import json
import glob
import re
# 定义源目录和目标目录
source_dir = os.path.join(os.path.dirname(__file__), 'src', 'assets', 'province')
target_dir = os.path.join(os.path.dirname(__file__), 'src', 'assets', 'mapjson')

# 确保目标目录存在
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

# 读取源目录下的所有 .py 文件
for file_path in glob.glob(os.path.join(source_dir, '*.js')):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            tee = re.search('''registerMap\('(\S+)', (\{"type":.*?"UTF8Encoding":true\})\);''', content,re.S)
            te = tee[2]
            name = tee[1]
            # 假设每个 .py 文件中只有一个 JSON 对象，并且是通过变量导出的
            # json_content = json.loads(content.split('=')[-1].strip())
            target_file_path = os.path.join(target_dir, f'{name}.json')
            with open(target_file_path, 'w', encoding='utf-8') as target_file:
                # json.dump(json_content, target_file, ensure_ascii=False, indent=2)
                target_file.write(te)
            print(f'文件 {target_file_path} 已保存')
    except Exception as e:
        print(f'解析文件 {file_path} 时出错: {e}')