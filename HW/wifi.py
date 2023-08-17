import tkinter as tk
import subprocess
import time

def restart_wifi(ssid, password):
    try:
        subprocess.run("sudo service networking restart", shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print("명령어 실행 중 오류 발생:", e)
    else:
        print("명령어 실행 성공")
        if ssid and password:
            try:
                subprocess.run("sudo ifconfig wlan0 down", shell=True, check=True)
                subprocess.run("sudo ifconfig wlan0 up", shell=True, check=True)
            except subprocess.CalledProcessError as e:
                status_label.config(text="Error connecting to WiFi.")
            else:
                status_label.config(text="WiFi connected successfully!")
                time.sleep(3)
                subprocess.Popen(["python", "/home/pi/sketchbook/otp.py"])
        else:
            status_label.config(text="Please enter SSID and password.")

def connect_wifi():
    def is_ssid_already_present(file_path, ssid):
        with open(file_path, "r") as file:
            content = file.read()
            return f'ssid="{ssid}"' in content
    
    ssid = ssid_entry.get()
    password = password_entry.get()
    config = f"network={{\n        ssid=\"{ssid}\"\n        psk=\"{password}\"\n        key_mgmt=WPA-PSK\n}}"
    file_path = "/etc/wpa_supplicant/wpa_supplicant.conf"
    
    if not is_ssid_already_present(file_path, ssid):
        with open(file_path, "a") as file:
            file.write("\n" + config)
        restart_wifi(ssid, password)
        
    else:
        print("SSID already exists in the configuration file.")
        restart_wifi(ssid, password)
        
subprocess.Popen("onboard")

# GUI 생성
root = tk.Tk()
root.title("WiFi 연결")
root.geometry("720x480")
custom_font = ("Helvetica", 15)

# SSID 입력 필드
ssid_label = tk.Label(root, text="SSID:", font = custom_font, height = 2)
ssid_label.pack()
ssid_entry = tk.Entry(root, font = custom_font)
ssid_entry.pack()

# 비밀번호 입력 필드
password_label = tk.Label(root, text="Password:", font = custom_font, height = 2)
password_label.pack()
password_entry = tk.Entry(root, font = custom_font)
password_entry.pack()

# 상태 표시 레이블
status_label = tk.Label(root, text="")
status_label.pack()

# 연결 버튼
connect_button = tk.Button(root, text="Connect", command = connect_wifi, font = custom_font, height = 2)
connect_button.pack()

root.mainloop()