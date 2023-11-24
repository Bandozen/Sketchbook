import cv2
import socket
import pickle
import struct
import time
import sys
import redis

from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv('SERVER_IP')  # 서버 주소
server_port = os.getenv('SERVER_PORT')

# 외부 Redis 서버 정보
redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

# 외부 Redis 서버에 연결
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, db=1)
email = sys.argv[1]

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
    client_socket.connect((server_ip, server_port))
    print("연결 성공")
    while True:
        value = redis_client.get(email)
        value = value.decode('utf-8')
        if (value != "start"):
            break
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1)
        cv2.imshow('capture', frame)
        ret, frame = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
        frame = pickle.dumps(frame)
        
        print("전송 프레임 크기 : {} bytes".format(len(frame)))
        
        try:
            client_socket.sendall(struct.pack(">L", len(frame)) + frame)
        except Exception as e:
            print("전송 중 오류 발생:", str(e))
            break
        time.sleep(0.1)
        if cv2.waitKey(10) & 0xFF == ord("q"):
            break
        
client_socket.close()        
cap.release()