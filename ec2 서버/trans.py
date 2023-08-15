import numpy as np
import cv2
import math
from PIL import Image
import redis
import asyncio
import aioredis
import sys


redis_host = "i9c102.p.ssafy.io"
redis_port = 6379  # Redis 포트 번호
redis_password = "3btic102"  # 사용자 인증이 설정된 경우

client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, charset="utf-8", decode_responses=True)
email = sys.argv[1]

def extend(last, start, size):
    vector_x = last[0] - start[0]
    vector_y = last[1] - start[1]
    dx = vector_x / math.sqrt(math.pow(vector_x, 2) + math.pow(vector_y, 2))
    dy = vector_y / math.sqrt(math.pow(vector_x, 2) + math.pow(vector_y, 2))
    new_x = last[0] + dx * size
    new_y = last[1] + dy * size
    return new_x, new_y
    
def rotate(x1, y1, x2, y2, rad):
    rotate_x = (x1 - x2) * math.cos(rad) - (y1 - y2) * math.sin(rad) + x2
    rotate_y = (x1 - x2) * math.sin(rad) + (y1 - y2) * math.cos(rad) + y2
    return rotate_x, rotate_y

def transform(input_img_path, output_img_path, input_points, output_points):

    img = cv2.imread(input_img_path, cv2.IMREAD_UNCHANGED)

    pts1 = np.float32(input_points)
    pts2 = np.float32(output_points)

    b, g, r, alpha = cv2.split(img)
    mtrx = cv2.getPerspectiveTransform(pts1, pts2)
    height, width = img.shape[:2]

    output_b = cv2.warpPerspective(b, mtrx, (width, height))
    output_g = cv2.warpPerspective(g, mtrx, (width, height))
    output_r = cv2.warpPerspective(r, mtrx, (width, height))
    output_alpha = cv2.warpPerspective(alpha, mtrx, (width, height))
    output = cv2.merge((output_b, output_g, output_r, output_alpha))

    cv2.imwrite(output_img_path, output)
  
def assemble(first_file, overlay_files):
    background = Image.open(first_file).convert('RGBA')
    for overlay_file in overlay_files:
        overlay = Image.open(overlay_file).convert('RGBA')
        combined = Image.alpha_composite(background, overlay)
        background = combined

    combined.save(f'/home/ubuntu/user/{email}/assemble.png')

client.select(2)
tmp_Data = client.lrange(email, 0, 55)

# 레디스에서 받아올 현재 좌표들
mv_left_eye = [float(tmp_Data[28]) * 640, float(tmp_Data[29]) * 480 + 10]
mv_right_eye = [float(tmp_Data[30]) * 640, float(tmp_Data[31]) * 480 + 10]
mv_left_shoulder = [float(tmp_Data[32]) * 640, float(tmp_Data[33]) * 480]
mv_right_shoulder = [float(tmp_Data[34]) * 640, float(tmp_Data[35]) * 480]
mv_left_elbow = [float(tmp_Data[36]) * 640, float(tmp_Data[37]) * 480]
mv_right_elbow = [float(tmp_Data[38]) * 640, float(tmp_Data[39]) * 480]
mv_left_wrist = [float(tmp_Data[40]) * 640, float(tmp_Data[41]) * 480]
mv_right_wrist = [float(tmp_Data[42]) * 640, float(tmp_Data[43]) * 480]
mv_left_hip = [float(tmp_Data[44]) * 640, float(tmp_Data[45]) * 480]
mv_right_hip = [float(tmp_Data[46]) * 640, float(tmp_Data[47]) * 480]
mv_left_knee = [float(tmp_Data[48]) * 640, float(tmp_Data[49]) * 480]
mv_right_knee = [float(tmp_Data[50]) * 640, float(tmp_Data[51]) * 480]
mv_left_ankle = [float(tmp_Data[52]) * 640, float(tmp_Data[53]) * 480]
mv_right_ankle = [float(tmp_Data[54]) * 640, float(tmp_Data[55]) * 480]

ex_left_shoulder = [float(tmp_Data[4]) * 640, float(tmp_Data[5]) * 480]
ex_right_shoulder = [float(tmp_Data[6]) * 640, float(tmp_Data[7]) * 480]
ex_left_hip = [float(tmp_Data[16]) * 640, float(tmp_Data[17]) * 480]
ex_right_hip = [float(tmp_Data[18]) * 640, float(tmp_Data[19]) * 480]
ex_left_ankle = [float(tmp_Data[24]) * 640, float(tmp_Data[25]) * 480]
ex_right_ankle = [float(tmp_Data[26]) * 640, float(tmp_Data[27]) * 480]

dx = ((mv_left_shoulder[0] - ex_left_shoulder[0]) + (mv_right_shoulder[0] - ex_right_shoulder[0]) + (mv_left_hip[0] - ex_left_hip[0]) + (mv_right_hip[0] - ex_right_hip[0])) / 4
dy = 0
if ((mv_left_ankle[1] - ex_left_ankle[1] < 0 and mv_right_ankle[1] - ex_right_ankle[1] < 0) or (mv_left_ankle[1] - ex_left_ankle[1] > 0 and mv_right_ankle[1] - ex_right_ankle[1] > 0)):
    dy = ((mv_left_ankle[1] - ex_left_ankle[1]) + (mv_right_ankle[1] - ex_right_ankle[1])) / 2
    
client.select(4)
client.rpush(email, float(dx), float(dy))
    
client.select(3)
character_Data = client.lrange(email, 0, 79)

# left_wrist to elbow
left_wrist_elbow_points = [[float(character_Data[0]), float(character_Data[1])], [float(character_Data[2]), float(character_Data[3])], [float(character_Data[4]), float(character_Data[5])], [float(character_Data[6]), float(character_Data[7])]]
mv_left_wtoe_wrist_point_x, mv_left_wtoe_wrist_point_y = extend(mv_left_wrist, mv_left_elbow, 30)
mv_left_wtoe_elbow_point_x, mv_left_wtoe_elbow_point_y = extend(mv_left_elbow, mv_left_wrist, 30)

mv_left_wrist_elbow_points = [(rotate(mv_left_wtoe_wrist_point_x, mv_left_wtoe_wrist_point_y, mv_left_wrist[0], mv_left_wrist[1], math.radians(-50))), (rotate(mv_left_wtoe_elbow_point_x, mv_left_wtoe_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(50))), (rotate(mv_left_wtoe_elbow_point_x, mv_left_wtoe_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(-50))), (rotate(mv_left_wtoe_wrist_point_x, mv_left_wtoe_wrist_point_y, mv_left_wrist[0], mv_left_wrist[1], math.radians(50)))]

transform(f"/home/ubuntu/user/{email}/left_wrist_elbow.png", f"/home/ubuntu/user/{email}/mv_left_wrist_elbow.png", left_wrist_elbow_points, mv_left_wrist_elbow_points)

# right_wrist to elbow
right_wrist_elbow_points = [[float(character_Data[8]), float(character_Data[9])], [float(character_Data[10]), float(character_Data[11])], [float(character_Data[12]), float(character_Data[13])], [float(character_Data[14]), float(character_Data[15])]]
mv_right_wtoe_wrist_point_x, mv_right_wtoe_wrist_point_y = extend(mv_right_wrist, mv_right_elbow, 30)
mv_right_wtoe_elbow_point_x, mv_right_wtoe_elbow_point_y = extend(mv_right_elbow, mv_right_wrist, 30)

mv_right_wrist_elbow_points = [(rotate(mv_right_wtoe_wrist_point_x, mv_right_wtoe_wrist_point_y, mv_right_wrist[0], mv_right_wrist[1], math.radians(-50))), (rotate(mv_right_wtoe_elbow_point_x, mv_right_wtoe_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(50))), (rotate(mv_right_wtoe_elbow_point_x, mv_right_wtoe_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(-50))), (rotate(mv_right_wtoe_wrist_point_x, mv_right_wtoe_wrist_point_y, mv_right_wrist[0], mv_right_wrist[1], math.radians(50)))]

transform(f"/home/ubuntu/user/{email}/right_wrist_elbow.png", f"/home/ubuntu/user/{email}/mv_right_wrist_elbow.png", right_wrist_elbow_points, mv_right_wrist_elbow_points)

# left_elbow to shoulder
left_elbow_shoulder_points = [[float(character_Data[16]), float(character_Data[17])], [float(character_Data[18]), float(character_Data[19])], [float(character_Data[20]), float(character_Data[21])], [float(character_Data[22]), float(character_Data[23])]]
mv_left_etos_elbow_point_x, mv_left_etos_elbow_point_y = extend(mv_left_elbow, mv_left_shoulder, 20)
mv_left_etos_shoulder_point_x, mv_left_etos_shoulder_point_y = extend(mv_left_shoulder, mv_left_elbow, 30)

mv_left_elbow_shoulder_points = [(rotate(mv_left_etos_elbow_point_x, mv_left_etos_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(-80))), (rotate(mv_left_etos_shoulder_point_x, mv_left_etos_shoulder_point_y, mv_left_shoulder[0], mv_left_shoulder[1], math.radians(80))), (rotate(mv_left_etos_shoulder_point_x, mv_left_etos_shoulder_point_y, mv_left_shoulder[0], mv_left_shoulder[1], math.radians(-80))), (rotate(mv_left_etos_elbow_point_x, mv_left_etos_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(80)))]

transform(f"/home/ubuntu/user/{email}/left_elbow_shoulder.png", f"/home/ubuntu/user/{email}/mv_left_elbow_shoulder.png", left_elbow_shoulder_points, mv_left_elbow_shoulder_points)

# right_elbow to shoulder
right_elbow_shoulder_points = [[float(character_Data[24]), float(character_Data[25])], [float(character_Data[26]), float(character_Data[27])], [float(character_Data[28]), float(character_Data[29])], [float(character_Data[30]), float(character_Data[31])]]
mv_right_etos_elbow_point_x, mv_right_etos_elbow_point_y = extend(mv_right_elbow, mv_right_shoulder, 20)
mv_right_etos_shoulder_point_x, mv_right_etos_shoulder_point_y = extend(mv_right_shoulder, mv_right_elbow, 30)

mv_right_elbow_shoulder_points = [(rotate(mv_right_etos_elbow_point_x, mv_right_etos_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(-80))), (rotate(mv_right_etos_shoulder_point_x, mv_right_etos_shoulder_point_y, mv_right_shoulder[0], mv_right_shoulder[1], math.radians(80))), (rotate(mv_right_etos_shoulder_point_x, mv_right_etos_shoulder_point_y, mv_right_shoulder[0], mv_right_shoulder[1], math.radians(-80))), (rotate(mv_right_etos_elbow_point_x, mv_right_etos_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(80)))]

transform(f"/home/ubuntu/user/{email}/right_elbow_shoulder.png", f"/home/ubuntu/user/{email}/mv_right_elbow_shoulder.png", right_elbow_shoulder_points, mv_right_elbow_shoulder_points)

# left_ankle to knee
left_ankle_knee_points = [[float(character_Data[32]), float(character_Data[33])], [float(character_Data[34]), float(character_Data[35])], [float(character_Data[36]), float(character_Data[37])], [float(character_Data[38]), float(character_Data[39])]]
mv_left_atok_ankle_point_x, mv_left_atok_ankle_point_y = extend(mv_left_ankle, mv_left_knee, 35)
mv_left_atok_knee_point_x, mv_left_atok_knee_point_y = extend(mv_left_knee, mv_left_ankle, 20)

mv_left_ankle_knee_points = [(rotate(mv_left_atok_ankle_point_x, mv_left_atok_ankle_point_y, mv_left_ankle[0], mv_left_ankle[1], math.radians(-60))), (rotate(mv_left_atok_knee_point_x, mv_left_atok_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(50))), (rotate(mv_left_atok_knee_point_x, mv_left_atok_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(-50))), (rotate(mv_left_atok_ankle_point_x, mv_left_atok_ankle_point_y, mv_left_ankle[0], mv_left_ankle[1], math.radians(60)))]

transform(f"/home/ubuntu/user/{email}/left_ankle_knee.png", f"/home/ubuntu/user/{email}/mv_left_ankle_knee.png", left_ankle_knee_points, mv_left_ankle_knee_points)

# right_ankle to knee
right_ankle_knee_points = [[float(character_Data[40]), float(character_Data[41])], [float(character_Data[42]), float(character_Data[43])], [float(character_Data[44]), float(character_Data[45])], [float(character_Data[46]), float(character_Data[47])]]
mv_right_atok_ankle_point_x, mv_right_atok_ankle_point_y = extend(mv_right_ankle, mv_right_knee, 35)
mv_right_atok_knee_point_x, mv_right_atok_knee_point_y = extend(mv_right_knee, mv_right_ankle, 20)

mv_right_ankle_knee_points = [(rotate(mv_right_atok_ankle_point_x, mv_right_atok_ankle_point_y, mv_right_ankle[0], mv_right_ankle[1], math.radians(-60))), (rotate(mv_right_atok_knee_point_x, mv_right_atok_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(50))), (rotate(mv_right_atok_knee_point_x, mv_right_atok_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(-50))), (rotate(mv_right_atok_ankle_point_x, mv_right_atok_ankle_point_y, mv_right_ankle[0], mv_right_ankle[1], math.radians(60)))]

transform(f"/home/ubuntu/user/{email}/right_ankle_knee.png", f"/home/ubuntu/user/{email}/mv_right_ankle_knee.png", right_ankle_knee_points, mv_right_ankle_knee_points)

# left_knee to hip
left_knee_hip_points = [[float(character_Data[48]), float(character_Data[49])], [float(character_Data[50]), float(character_Data[51])], [float(character_Data[52]), float(character_Data[53])], [float(character_Data[54]), float(character_Data[55])]]
mv_left_ktoh_knee_point_x, mv_left_ktoh_knee_point_y = extend(mv_left_knee, mv_left_hip, 30)
mv_left_ktoh_hip_point_x, mv_left_ktoh_hip_point_y = extend(mv_left_hip, mv_left_knee, 30)

mv_left_knee_hip_points = [(rotate(mv_left_ktoh_knee_point_x, mv_left_ktoh_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(-50))), (rotate(mv_left_ktoh_hip_point_x, mv_left_ktoh_hip_point_y, mv_left_hip[0], mv_left_hip[1], math.radians(80))), (rotate(mv_left_ktoh_hip_point_x, mv_left_ktoh_hip_point_y, mv_left_hip[0], mv_left_hip[1], math.radians(-80))), (rotate(mv_left_ktoh_knee_point_x, mv_left_ktoh_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(50)))]

transform(f"/home/ubuntu/user/{email}/left_knee_hip.png", f"/home/ubuntu/user/{email}/mv_left_knee_hip.png", left_knee_hip_points, mv_left_knee_hip_points)

# right_knee to hip
right_knee_hip_points = [[float(character_Data[56]), float(character_Data[57])], [float(character_Data[58]), float(character_Data[59])], [float(character_Data[60]), float(character_Data[61])], [float(character_Data[62]), float(character_Data[63])]]
mv_right_ktoh_knee_point_x, mv_right_ktoh_knee_point_y = extend(mv_right_knee, mv_right_hip, 30)
mv_right_ktoh_hip_point_x, mv_right_ktoh_hip_point_y = extend(mv_right_hip, mv_right_knee, 30)

mv_right_knee_hip_points = [(rotate(mv_right_ktoh_knee_point_x, mv_right_ktoh_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(-50))), (rotate(mv_right_ktoh_hip_point_x, mv_right_ktoh_hip_point_y, mv_right_hip[0], mv_right_hip[1], math.radians(80))), (rotate(mv_right_ktoh_hip_point_x, mv_right_ktoh_hip_point_y, mv_right_hip[0], mv_right_hip[1], math.radians(-80))), (rotate(mv_right_ktoh_knee_point_x, mv_right_ktoh_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(50)))]

transform(f"/home/ubuntu/user/{email}/right_knee_hip.png", f"/home/ubuntu/user/{email}/mv_right_knee_hip.png", right_knee_hip_points, mv_right_knee_hip_points)

# torso
torso_points = [[float(character_Data[64]), float(character_Data[65])], [float(character_Data[66]), float(character_Data[67])], [float(character_Data[68]), float(character_Data[69])], [float(character_Data[70]), float(character_Data[71])]]
mv_torso_points = [(extend(mv_left_shoulder, mv_right_hip, 20)), (extend(mv_right_shoulder, mv_left_hip, 20)), (extend(mv_right_hip, mv_left_shoulder, 15)), (extend(mv_left_hip, mv_right_shoulder, 15))]

transform(f"/home/ubuntu/user/{email}/torso.png", f"/home/ubuntu/user/{email}/mv_torso.png", torso_points, mv_torso_points)

# face
face_points = [[float(character_Data[72]), float(character_Data[73])], [float(character_Data[74]), float(character_Data[75])], [float(character_Data[76]), float(character_Data[77])], [float(character_Data[78]), float(character_Data[79])]]
mv_left_eye_point_x, mv_left_eye_point_y = extend(mv_left_eye, mv_right_eye, 60)
mv_right_eye_point_x, mv_right_eye_point_y = extend(mv_right_eye, mv_left_eye, 60)

mv_face_points = [(rotate(mv_left_eye_point_x, mv_left_eye_point_y, mv_left_eye[0], mv_left_eye[1], math.radians(-65))), (rotate(mv_right_eye_point_x, mv_right_eye_point_y, mv_right_eye[0], mv_right_eye[1], math.radians(65))), (rotate(mv_right_eye_point_x, mv_right_eye_point_y, mv_right_eye[0], mv_right_eye[1], math.radians(-40))), (rotate(mv_left_eye_point_x, mv_left_eye_point_y, mv_left_eye[0], mv_left_eye[1], math.radians(40)))]

transform(f"/home/ubuntu/user/{email}/face.png", f"/home/ubuntu/user/{email}/mv_face.png", face_points, mv_face_points)

# assemble
first_file = f'/home/ubuntu/user/{email}/mv_torso.png'
overlay_files = [f'/home/ubuntu/user/{email}/mv_face.png', f'/home/ubuntu/user/{email}/mv_right_knee_hip.png', f'/home/ubuntu/user/{email}/mv_left_knee_hip.png', f'/home/ubuntu/user/{email}/mv_right_ankle_knee.png', f'/home/ubuntu/user/{email}/mv_left_ankle_knee.png', f'/home/ubuntu/user/{email}/mv_right_elbow_shoulder.png', f'/home/ubuntu/user/{email}/mv_left_elbow_shoulder.png', f'/home/ubuntu/user/{email}/mv_right_wrist_elbow.png', f'/home/ubuntu/user/{email}/mv_left_wrist_elbow.png']
assemble(first_file, overlay_files)

for i in range(0, 28):
    client.select(2)
    client.lpop(email)