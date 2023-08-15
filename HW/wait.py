import tkinter as tk
from ttkthemes import ThemedTk
import subprocess
import sys

email = sys.argv[1]
print(email)
root = ThemedTk(theme="blue")
root.title("대기 화면")
root.geometry("720x480")
root.option_add("*Font", "돋움")

new_font = ("돋움", 30, "bold")

waiting_label = tk.Label(root, text="웹에서 동화를 선택하고\n '시작하기'를 클릭해주세요.", height=40, font=new_font)
waiting_label.pack()

subprocess.Popen(["pkill", "-f", "otp.py"])
subprocess.Popen(["python", "/home/pi/sketchbook/check.py", email])

root.mainloop()