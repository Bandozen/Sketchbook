import redis
import sys
import subprocess
import paramiko
import sys

# 외부 Redis 서버 정보
redis_host = "i9c102.p.ssafy.io"
redis_port = 6379  # Redis 포트 번호
redis_password = "3btic102"  # 사용자 인증이 설정된 경우

# 외부 Redis 서버에 연결
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, db=1)
email = sys.argv[1]

# EC2 인스턴스의 접속 정보
ec2_ip = 'i9c102.p.ssafy.io'
ec2_username = 'ubuntu'
ec2_private_key = '/home/pi/sketchbook/I9C102T.pem'

# SSH 클라이언트 생성
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
private_key = paramiko.RSAKey.from_private_key_file(ec2_private_key)

while True:
    value = redis_client.get(email)
    value = value.decode('utf-8')
    if (value != "ready"):
        print(value)
        if (value == "start"):
            try:
                # EC2 인스턴스에 연결
                client.connect(ec2_ip, username=ec2_username, pkey=private_key)

                # 원격에서 실행시킬 파이썬 파일 경로와 명령어
                remote_python_file = '/home/ubuntu/user/server.py'
                command = f'python3 {remote_python_file} {email}'
                print(command)

                # 명령어 실행
                stdin, stdout, stderr = client.exec_command(command)
            except Exception as e:
                print("An error occurred:", str(e))
            finally:
                # 연결 종료
                client.close()
                
            subprocess.run(["python", "/home/pi/sketchbook/capture.py", email])
            
            try:
                # EC2 인스턴스에 연결
                client.connect(ec2_ip, username=ec2_username, pkey=private_key)

                # 원격에서 실행시킬 파이썬 파일 경로와 명령어
                remote_python_file = '/home/ubuntu/user/tflite.py'
                command = f'python3 {remote_python_file} {email}'
                print(command)

                # 명령어 실행
                stdin, stdout, stderr = client.exec_command(command)
            except Exception as e:
                print("An error occurred:", str(e))
            finally:
                # 연결 종료
                client.close()
        elif (value == "record"):
            subprocess.run(["python", "/home/pi/sketchbook/record.py", email])
        elif (value == "story"):
            subprocess.run(["python", "/home/pi/sketchbook/cam.py", email])
        elif (value == "mission"):
            subprocess.run(["python", "/home/pi/sketchbook/points.py", email])
        elif (value == "stop"):
            subprocess.run(["pkill", "-f", "wait.py"])
            subprocess.Popen(["python", "/home/pi/sketchbook/wait.py", email])
            break
        elif (value == "logout"):
            subprocess.run(["pkill", "-f", "wait.py"])
            subprocess.Popen(["python", "/home/pi/sketchbook/otp.py"])
            break