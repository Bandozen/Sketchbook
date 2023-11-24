import asyncio
import tflite_runtime.interpreter as tflite
import numpy as np
import cv2
import redis
import sys
import paramiko

from dotenv import load_dotenv
import os

load_dotenv()

def draw_keypoints(frame, keypoints, confidence):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y, x, 1]))
    for kp in shaped:
        ky, kx, kp_conf = kp
        if kp_conf > confidence:
            cv2.circle(frame, (int(kx), int(ky)), 4, (0, 255, 0), -1)

async def process_ssh():
    try:
        private_key = paramiko.RSAKey.from_private_key_file(ec2_private_key)
        client.connect(ec2_ip, username=ec2_username, pkey=private_key)

        remote_python_file = '/home/ubuntu/user/trans.py'
        command = f'python3 {remote_python_file} {email}'
        print(command)

        stdin, stdout, stderr = client.exec_command(command)
    except Exception as e:
        print("An error occurred:", str(e))
        
async def process_frame(frame):
    flipped_frame = cv2.flip(frame, 1)
    img = flipped_frame.copy()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    input_shape = input_details[0]['shape']

    img = cv2.resize(flipped_frame, (input_shape[2], input_shape[1]))
    img = np.expand_dims(img, axis=0)
    img = img.astype(np.uint8)

    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])
    redis_client.select(2)
    #draw_keypoints(flipped_frame, keypoints_with_scores, 0.25)
    
    return keypoints_with_scores, flipped_frame

# 외부 Redis 서버 정보
redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

# 외부 Redis 서버에 연결
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, db=2)

email = sys.argv[1]
redis_client.delete(email)

# EC2 인스턴스의 접속 정보
ec2_ip = os.getenv('SERVER_IP')  # 서버 주소
ec2_username = 'ubuntu'
ec2_private_key = '/home/pi/sketchbook/I9C102T.pem'

# SSH 클라이언트 생성
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

interpreter = tflite.Interpreter(model_path='/home/pi/sketchbook/lite-model_movenet_singlepose_lightning_tflite_float16_4.tflite')
interpreter.allocate_tensors()

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

async def main():
    flag = 0
    while cap.isOpened():
        redis_client.select(1)
        value = redis_client.get(email)
        value = value.decode('utf-8')
        if value != "mission":
            break

        ret, frame = cap.read()
        
        frame_processing_task = asyncio.create_task(process_frame(frame))
        keypoints_with_scores, flipped_frame = await frame_processing_task
        redis_client.select(2)
        
        # if(keypoints_with_scores[0][0][1][2] > 0.4 and keypoints_with_scores[0][0][2][2] > 0.4 and keypoints_with_scores[0][0][5][2] > 0.4 and keypoints_with_scores[0][0][6][2] > 0.4 and keypoints_with_scores[0][0][7][2] > 0.4 and keypoints_with_scores[0][0][8][2] > 0.4 and keypoints_with_scores[0][0][9][2] > 0.4 and keypoints_with_scores[0][0][10][2] > 0.4 and keypoints_with_scores[0][0][11][2] > 0.4 and keypoints_with_scores[0][0][12][2] > 0.4 and keypoints_with_scores[0][0][13][2] > 0.4 and keypoints_with_scores[0][0][14][2] > 0.4 and keypoints_with_scores[0][0][15][2] > 0.4 and keypoints_with_scores[0][0][16][2] > 0.4):
        if (keypoints_with_scores[0][0][1][1] < keypoints_with_scores[0][0][2][1]):
            print("좌우 반전")
            keypoints_with_scores[0][0][1][0], keypoints_with_scores[0][0][2][0] = keypoints_with_scores[0][0][2][0], keypoints_with_scores[0][0][1][0]
            keypoints_with_scores[0][0][1][1], keypoints_with_scores[0][0][2][1] = keypoints_with_scores[0][0][2][1], keypoints_with_scores[0][0][1][1]
            keypoints_with_scores[0][0][5][0], keypoints_with_scores[0][0][6][0] = keypoints_with_scores[0][0][6][0], keypoints_with_scores[0][0][5][0]
            keypoints_with_scores[0][0][5][1], keypoints_with_scores[0][0][6][1] = keypoints_with_scores[0][0][6][1], keypoints_with_scores[0][0][5][1]
            keypoints_with_scores[0][0][7][0], keypoints_with_scores[0][0][8][0] = keypoints_with_scores[0][0][8][0], keypoints_with_scores[0][0][7][0]
            keypoints_with_scores[0][0][7][1], keypoints_with_scores[0][0][8][1] = keypoints_with_scores[0][0][8][1], keypoints_with_scores[0][0][7][1]
            keypoints_with_scores[0][0][9][0], keypoints_with_scores[0][0][10][0] = keypoints_with_scores[0][0][10][0], keypoints_with_scores[0][0][9][0]
            keypoints_with_scores[0][0][9][1], keypoints_with_scores[0][0][10][1] = keypoints_with_scores[0][0][10][1], keypoints_with_scores[0][0][9][1]
            keypoints_with_scores[0][0][11][0], keypoints_with_scores[0][0][12][0] = keypoints_with_scores[0][0][12][0], keypoints_with_scores[0][0][11][0]
            keypoints_with_scores[0][0][11][1], keypoints_with_scores[0][0][12][1] = keypoints_with_scores[0][0][12][1], keypoints_with_scores[0][0][11][1]
            keypoints_with_scores[0][0][13][0], keypoints_with_scores[0][0][14][0] = keypoints_with_scores[0][0][14][0], keypoints_with_scores[0][0][13][0]
            keypoints_with_scores[0][0][13][1], keypoints_with_scores[0][0][14][1] = keypoints_with_scores[0][0][14][1], keypoints_with_scores[0][0][13][1]
            keypoints_with_scores[0][0][15][0], keypoints_with_scores[0][0][16][0] = keypoints_with_scores[0][0][16][0], keypoints_with_scores[0][0][15][0]
            keypoints_with_scores[0][0][15][1], keypoints_with_scores[0][0][16][1] = keypoints_with_scores[0][0][16][1], keypoints_with_scores[0][0][15][1]
            
        print(redis_client.llen(email))
        if (flag == 0 or redis_client.llen(email) == 28):
            print("성공")
            redis_client.rpush(email, float(keypoints_with_scores[0][0][1][1]), float(keypoints_with_scores[0][0][1][0]), float(keypoints_with_scores[0][0][2][1]), float(keypoints_with_scores[0][0][2][0]), float(keypoints_with_scores[0][0][5][1]), float(keypoints_with_scores[0][0][5][0]), float(keypoints_with_scores[0][0][6][1]), float(keypoints_with_scores[0][0][6][0]), float(keypoints_with_scores[0][0][7][1]), float(keypoints_with_scores[0][0][7][0]), float(keypoints_with_scores[0][0][8][1]), float(keypoints_with_scores[0][0][8][0]), float(keypoints_with_scores[0][0][9][1]), float(keypoints_with_scores[0][0][9][0]), float(keypoints_with_scores[0][0][10][1]), float(keypoints_with_scores[0][0][10][0]), float(keypoints_with_scores[0][0][11][1]), float(keypoints_with_scores[0][0][11][0]), float(keypoints_with_scores[0][0][12][1]), float(keypoints_with_scores[0][0][12][0]), float(keypoints_with_scores[0][0][13][1]), float(keypoints_with_scores[0][0][13][0]), float(keypoints_with_scores[0][0][14][1]), float(keypoints_with_scores[0][0][14][0]), float(keypoints_with_scores[0][0][15][1]), float(keypoints_with_scores[0][0][15][0]), float(keypoints_with_scores[0][0][16][1]), float(keypoints_with_scores[0][0][16][0]))
            
            if flag == 0:
                redis_client.rpush(email, float(keypoints_with_scores[0][0][1][1]), float(keypoints_with_scores[0][0][1][0]), float(keypoints_with_scores[0][0][2][1]), float(keypoints_with_scores[0][0][2][0]), float(keypoints_with_scores[0][0][5][1]), float(keypoints_with_scores[0][0][5][0]), float(keypoints_with_scores[0][0][6][1]), float(keypoints_with_scores[0][0][6][0]), float(keypoints_with_scores[0][0][7][1]), float(keypoints_with_scores[0][0][7][0]), float(keypoints_with_scores[0][0][8][1]), float(keypoints_with_scores[0][0][8][0]), float(keypoints_with_scores[0][0][9][1]), float(keypoints_with_scores[0][0][9][0]), float(keypoints_with_scores[0][0][10][1]), float(keypoints_with_scores[0][0][10][0]), float(keypoints_with_scores[0][0][11][1]), float(keypoints_with_scores[0][0][11][0]), float(keypoints_with_scores[0][0][12][1]), float(keypoints_with_scores[0][0][12][0]), float(keypoints_with_scores[0][0][13][1]), float(keypoints_with_scores[0][0][13][0]), float(keypoints_with_scores[0][0][14][1]), float(keypoints_with_scores[0][0][14][0]), float(keypoints_with_scores[0][0][15][1]), float(keypoints_with_scores[0][0][15][0]), float(keypoints_with_scores[0][0][16][1]), float(keypoints_with_scores[0][0][16][0]))
                flag = 1
                
            ssh_task = asyncio.create_task(process_ssh())
            await ssh_task

        #cv2.imshow('movenet', flipped_frame)

        while cv2.waitKey(10) & 0xFF == ord('q'):
            break
        
    client.close()
    cap.release()
    cv2.destroyAllWindows()

loop = asyncio.get_event_loop()
loop.run_until_complete(main())