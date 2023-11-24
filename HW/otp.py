import redis
import tkinter as tk
import subprocess

from dotenv import load_dotenv
import os

load_dotenv()

def button_click(number):
    current = otp_entry.get()
    otp_entry.delete(0, tk.END)
    otp_entry.insert(tk.END, current + str(number))

def clear():
    otp_entry.delete(0, tk.END)

def confirm():
    value = otp_entry.get()
    email = None
    redis_client.select(0)
    email = redis_client.get(value)
    if email != None:
        redis_client.set(value, 'true')
        print(email)
        subprocess.run(["python", "/home/pi/sketchbook/wait.py", email])
    else:
        otp_entry.delete(0, tk.END)

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

# 외부 Redis 서버에 연결
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, db=0)
subprocess.Popen(["pkill", "-f", "onboard"])

otp = tk.Tk()
otp.title("OTP 입력")
otp.geometry("720x480")

otp_entry = tk.Entry(otp, font=("Helvetica", 30))
otp_entry.grid(row=0, column=0, columnspan=3, padx=10, pady=10, sticky="nsew")

buttons = [("1", 1, 0), ("2", 1, 1), ("3", 1, 2),
            ("4", 2, 0), ("5", 2, 1), ("6", 2, 2),
            ("7", 3, 0), ("8", 3, 1), ("9", 3, 2),
            ("0", 4, 1)]
    
for btn_text, row, col in buttons:
    button = tk.Button(otp, text=btn_text, font=("Helvetica", 40), command=lambda text=btn_text: button_click(text))
    button.grid(row=row, column=col, padx=10, pady=10, sticky="nsew")
    otp.grid_columnconfigure(col, weight=1)  # 가운데 정렬을 위해 열의 크기 조정
        
otp.grid_rowconfigure(0, weight=1)  # 가운데 정렬을 위해 첫 번째 행의 크기 조정
otp.grid_rowconfigure(4, weight=1)  # 가운데 정렬을 위해 다섯 번째 행의 크기 조정

clear_button = tk.Button(otp, text="지우기", font=("Helvetica", 15), command=clear)
clear_button.grid(row=4, column=0, padx=10, pady=10, sticky="nsew")

confirm_button = tk.Button(otp, text="확인", font=("Helvetica", 15), command=confirm)
confirm_button.grid(row=4, column=2, padx=10, pady=10, sticky="nsew")

subprocess.Popen(["pkill", "-f", "wifi.py"])

otp.mainloop()