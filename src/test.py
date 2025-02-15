def trim(s):
    while s[:1] in [" ", "\t", "\n"]:
        s = s[1:]
    while s[-1:] in [" ", "\t", "\n"]:
        s = s[:-1]
    return s


re = trim('''	你好
  ''')
print("结果是:" + re + ".")
