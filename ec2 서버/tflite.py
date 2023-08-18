import tflite_runtime.interpreter as tflite
import numpy as np
import cv2
import math
from rembg import remove
from PIL import Image
import sys
import redis

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

def crop_and_save_image(input_img_path, output_img_path, points):
    # 이미지 로드
    image = cv2.imread(input_img_path, cv2.IMREAD_UNCHANGED)

    # 4개의 꼭짓점 좌표
    pts = np.array(points, dtype=np.int32)  

    # 이미지 자르기
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    cv2.fillPoly(mask, [pts], 255)

    # 이미지의 알파 채널 가져오기
    alpha_channel = image[:, :, 3]

    # 알파 채널을 사용하여 마스킹된 이미지를 자름
    result = cv2.bitwise_and(image, image, mask=mask)
    result[:, :, 3] = alpha_channel

    # 자른 부분 외의 나머지 부분을 투명하게 만듦
    inverted_mask = cv2.bitwise_not(mask)
    result[inverted_mask == 255] = [0, 0, 0, 0]

    # 결과 이미지 저장
    cv2.imwrite(output_img_path, result)

interpreter = tflite.Interpreter(model_path="/home/ubuntu/user/lite-model_movenet_singlepose_lightning_tflite_float16_4.tflite")
interpreter.allocate_tensors()
email = sys.argv[1]

# 외부 Redis 서버 정보
redis_host = "i9c102.p.ssafy.io"
redis_port = 6379  # Redis 포트 번호
redis_password = "3btic102"  # 사용자 인증이 설정된 경우

# 외부 Redis 서버에 연결
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, db=3)

if(redis_client.llen(email) == 0):

    input = Image.open(f"/home/ubuntu/user/{email}/character.png") # load image
    output = remove(input) # remove background
    output.save(f"/home/ubuntu/user/{email}/character_rmbg.png") # save image
    image_path = f"/home/ubuntu/user/{email}/character_rmbg.png"
    frame = cv2.imread(image_path)
    
    img = frame.copy()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    input_shape = input_details[0]['shape']
    img = cv2.resize(frame, (input_shape[2], input_shape[1]))
    img = np.expand_dims(img, axis=0)
    img = img.astype(np.uint8)
    
    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])
    
    input_img_path = f"/home/ubuntu/user/{email}/character_rmbg.png"
    face_img_path = f"/home/ubuntu/user/{email}/face.png"
    torso_img_path = f"/home/ubuntu/user/{email}/torso.png"
    right_wrist_elbow_img_path = f"/home/ubuntu/user/{email}/right_wrist_elbow.png"
    right_elbow_shoulder_img_path = f"/home/ubuntu/user/{email}/right_elbow_shoulder.png"
    right_ankle_knee_img_path = f"/home/ubuntu/user/{email}/right_ankle_knee.png"
    right_knee_hip_img_path = f"/home/ubuntu/user/{email}/right_knee_hip.png"
    left_wrist_elbow_img_path = f"/home/ubuntu/user/{email}/left_wrist_elbow.png"
    left_elbow_shoulder_img_path = f"/home/ubuntu/user/{email}/left_elbow_shoulder.png"
    left_ankle_knee_img_path = f"/home/ubuntu/user/{email}/left_ankle_knee.png"
    left_knee_hip_img_path = f"/home/ubuntu/user/{email}/left_knee_hip.png"
    
    right_eye = (keypoints_with_scores[0][0][2][1] * 640 + 5, keypoints_with_scores[0][0][2][0] * 480)
    right_wrist = (keypoints_with_scores[0][0][10][1] * 640, keypoints_with_scores[0][0][10][0] * 480)
    right_elbow = (keypoints_with_scores[0][0][8][1] * 640, keypoints_with_scores[0][0][8][0] * 480)
    right_shoulder = (keypoints_with_scores[0][0][6][1] * 640, keypoints_with_scores[0][0][6][0] * 480)
    right_hip = (keypoints_with_scores[0][0][12][1] * 640, keypoints_with_scores[0][0][12][0] * 480)
    right_knee = (keypoints_with_scores[0][0][14][1] * 640, keypoints_with_scores[0][0][14][0] * 480)
    right_ankle = (keypoints_with_scores[0][0][16][1] * 640, keypoints_with_scores[0][0][16][0] * 480)
    left_eye = (keypoints_with_scores[0][0][1][1] * 640 + 5, keypoints_with_scores[0][0][1][0] * 480)
    left_wrist = (keypoints_with_scores[0][0][9][1] * 640, keypoints_with_scores[0][0][9][0] * 480)
    left_elbow = (keypoints_with_scores[0][0][7][1] * 640, keypoints_with_scores[0][0][7][0] * 480)
    left_shoulder = (keypoints_with_scores[0][0][5][1] * 640, keypoints_with_scores[0][0][5][0] * 480)
    left_hip = (keypoints_with_scores[0][0][11][1] * 640, keypoints_with_scores[0][0][11][0] * 480)
    left_knee = (keypoints_with_scores[0][0][13][1] * 640, keypoints_with_scores[0][0][13][0] * 480)
    left_ankle = (keypoints_with_scores[0][0][15][1] * 640, keypoints_with_scores[0][0][15][0] * 480)
    
    # left_wrist to elbow
    left_wtoe_wrist_point_x, left_wtoe_wrist_point_y = extend(left_wrist, left_elbow, 40)
    left_wtoe_elbow_point_x, left_wtoe_elbow_point_y = extend(left_elbow, left_wrist, 30)
    
    left_wrist_elbow_points = [(rotate(left_wtoe_wrist_point_x, left_wtoe_wrist_point_y, left_wrist[0], left_wrist[1], math.radians(-50))), (rotate(left_wtoe_elbow_point_x, left_wtoe_elbow_point_y, left_elbow[0], left_elbow[1], math.radians(50))), (rotate(left_wtoe_elbow_point_x, left_wtoe_elbow_point_y, left_elbow[0], left_elbow[1], math.radians(-50))), (rotate(left_wtoe_wrist_point_x, left_wtoe_wrist_point_y, left_wrist[0], left_wrist[1], math.radians(50)))]
    redis_client.rpush(email, float(left_wrist_elbow_points[0][0]), float(left_wrist_elbow_points[0][1]), float(left_wrist_elbow_points[1][0]), float(left_wrist_elbow_points[1][1]), float(left_wrist_elbow_points[2][0]), float(left_wrist_elbow_points[2][1]), float(left_wrist_elbow_points[3][0]), float(left_wrist_elbow_points[3][1]))
    
    # right_wrist to elbow
    right_wtoe_wrist_point_x, right_wtoe_wrist_point_y = extend(right_wrist, right_elbow, 40)
    right_wtoe_elbow_point_x, right_wtoe_elbow_point_y = extend(right_elbow, right_wrist, 30)
    
    right_wrist_elbow_points = [(rotate(right_wtoe_wrist_point_x, right_wtoe_wrist_point_y, right_wrist[0], right_wrist[1], math.radians(-50))), (rotate(right_wtoe_elbow_point_x, right_wtoe_elbow_point_y, right_elbow[0], right_elbow[1], math.radians(50))), (rotate(right_wtoe_elbow_point_x, right_wtoe_elbow_point_y, right_elbow[0], right_elbow[1], math.radians(-50))), (rotate(right_wtoe_wrist_point_x, right_wtoe_wrist_point_y, right_wrist[0], right_wrist[1], math.radians(50)))]
    redis_client.rpush(email, float(right_wrist_elbow_points[0][0]), float(right_wrist_elbow_points[0][1]), float(right_wrist_elbow_points[1][0]), float(right_wrist_elbow_points[1][1]), float(right_wrist_elbow_points[2][0]), float(right_wrist_elbow_points[2][1]), float(right_wrist_elbow_points[3][0]), float(right_wrist_elbow_points[3][1]))
    
    # left_elbow to shoulder
    left_etos_elbow_point_x, left_etos_elbow_point_y = extend(left_elbow, left_shoulder, 20)
    left_etos_shoulder_point_x, left_etos_shoulder_point_y = extend(left_shoulder, left_elbow, 30)
    
    left_elbow_shoulder_points = [(rotate(left_etos_elbow_point_x, left_etos_elbow_point_y, left_elbow[0], left_elbow[1], math.radians(-80))), (rotate(left_etos_shoulder_point_x, left_etos_shoulder_point_y, left_shoulder[0], left_shoulder[1], math.radians(80))), (rotate(left_etos_shoulder_point_x, left_etos_shoulder_point_y, left_shoulder[0], left_shoulder[1], math.radians(-80))), (rotate(left_etos_elbow_point_x, left_etos_elbow_point_y, left_elbow[0], left_elbow[1], math.radians(80)))]
    redis_client.rpush(email, float(left_elbow_shoulder_points[0][0]), float(left_elbow_shoulder_points[0][1]), float(left_elbow_shoulder_points[1][0]), float(left_elbow_shoulder_points[1][1]), float(left_elbow_shoulder_points[2][0]), float(left_elbow_shoulder_points[2][1]), float(left_elbow_shoulder_points[3][0]), float(left_elbow_shoulder_points[3][1]))
    
    #right_elbow to shoulder
    right_etos_elbow_point_x, right_etos_elbow_point_y = extend(right_elbow, right_shoulder, 20)
    right_etos_shoulder_point_x, right_etos_shoulder_point_y = extend(right_shoulder, right_elbow, 30)
    
    right_elbow_shoulder_points = [(rotate(right_etos_elbow_point_x, right_etos_elbow_point_y, right_elbow[0], right_elbow[1], math.radians(-80))), (rotate(right_etos_shoulder_point_x, right_etos_shoulder_point_y, right_shoulder[0], right_shoulder[1], math.radians(80))), (rotate(right_etos_shoulder_point_x, right_etos_shoulder_point_y, right_shoulder[0], right_shoulder[1], math.radians(-80))), (rotate(right_etos_elbow_point_x, right_etos_elbow_point_y, right_elbow[0], right_elbow[1], math.radians(80)))]
    redis_client.rpush(email, float(right_elbow_shoulder_points[0][0]), float(right_elbow_shoulder_points[0][1]), float(right_elbow_shoulder_points[1][0]), float(right_elbow_shoulder_points[1][1]), float(right_elbow_shoulder_points[2][0]), float(right_elbow_shoulder_points[2][1]), float(right_elbow_shoulder_points[3][0]), float(right_elbow_shoulder_points[3][1]))
    
    # left_ankle to knee
    left_atok_ankle_point_x, left_atok_ankle_point_y = extend(left_ankle, left_knee, 35)
    left_atok_knee_point_x, left_atok_knee_point_y = extend(left_knee, left_ankle, 20)
    
    left_ankle_knee_points = [(rotate(left_atok_ankle_point_x, left_atok_ankle_point_y, left_ankle[0], left_ankle[1], math.radians(-60))), (rotate(left_atok_knee_point_x, left_atok_knee_point_y, left_knee[0], left_knee[1], math.radians(50))), (rotate(left_atok_knee_point_x, left_atok_knee_point_y, left_knee[0], left_knee[1], math.radians(-50))), (rotate(left_atok_ankle_point_x, left_atok_ankle_point_y, left_ankle[0], left_ankle[1], math.radians(60)))]
    redis_client.rpush(email, float(left_ankle_knee_points[0][0]), float(left_ankle_knee_points[0][1]), float(left_ankle_knee_points[1][0]), float(left_ankle_knee_points[1][1]), float(left_ankle_knee_points[2][0]), float(left_ankle_knee_points[2][1]), float(left_ankle_knee_points[3][0]), float(left_ankle_knee_points[3][1]))
    
    # right_ankle to knee
    right_atok_ankle_point_x, right_atok_ankle_point_y = extend(right_ankle, right_knee, 35)
    right_atok_knee_point_x, right_atok_knee_point_y = extend(right_knee, right_ankle, 20)
    
    right_ankle_knee_points = [(rotate(right_atok_ankle_point_x, right_atok_ankle_point_y, right_ankle[0], right_ankle[1], math.radians(-60))), (rotate(right_atok_knee_point_x, right_atok_knee_point_y, right_knee[0], right_knee[1], math.radians(50))), (rotate(right_atok_knee_point_x, right_atok_knee_point_y, right_knee[0], right_knee[1], math.radians(-50))), (rotate(right_atok_ankle_point_x, right_atok_ankle_point_y, right_ankle[0], right_ankle[1], math.radians(60)))]
    redis_client.rpush(email, float(right_ankle_knee_points[0][0]), float(right_ankle_knee_points[0][1]), float(right_ankle_knee_points[1][0]), float(right_ankle_knee_points[1][1]), float(right_ankle_knee_points[2][0]), float(right_ankle_knee_points[2][1]), float(right_ankle_knee_points[3][0]), float(right_ankle_knee_points[3][1]))
    
    #left_knee to hip
    left_ktoh_knee_point_x, left_ktoh_knee_point_y = extend(left_knee, left_hip, 30)
    left_ktoh_hip_point_x, left_ktoh_hip_point_y = extend(left_hip, left_knee, 30)
    
    left_knee_hip_points = [(rotate(left_ktoh_knee_point_x, left_ktoh_knee_point_y, left_knee[0], left_knee[1], math.radians(-50))), (rotate(left_ktoh_hip_point_x, left_ktoh_hip_point_y, left_hip[0], left_hip[1], math.radians(80))), (rotate(left_ktoh_hip_point_x, left_ktoh_hip_point_y, left_hip[0], left_hip[1], math.radians(-80))), (rotate(left_ktoh_knee_point_x, left_ktoh_knee_point_y, left_knee[0], left_knee[1], math.radians(50)))]
    redis_client.rpush(email, float(left_knee_hip_points[0][0]), float(left_knee_hip_points[0][1]), float(left_knee_hip_points[1][0]), float(left_knee_hip_points[1][1]), float(left_knee_hip_points[2][0]), float(left_knee_hip_points[2][1]), float(left_knee_hip_points[3][0]), float(left_knee_hip_points[3][1]))
    
    #right_knee to hip
    right_ktoh_knee_point_x, right_ktoh_knee_point_y = extend(right_knee, right_hip, 30)
    right_ktoh_hip_point_x, right_ktoh_hip_point_y = extend(right_hip, right_knee, 30)
    
    right_knee_hip_points = [(rotate(right_ktoh_knee_point_x, right_ktoh_knee_point_y, right_knee[0], right_knee[1], math.radians(-50))), (rotate(right_ktoh_hip_point_x, right_ktoh_hip_point_y, right_hip[0], right_hip[1], math.radians(80))), (rotate(right_ktoh_hip_point_x, right_ktoh_hip_point_y, right_hip[0], right_hip[1], math.radians(-80))), (rotate(right_ktoh_knee_point_x, right_ktoh_knee_point_y, right_knee[0], right_knee[1], math.radians(50)))]
    redis_client.rpush(email, float(right_knee_hip_points[0][0]), float(right_knee_hip_points[0][1]), float(right_knee_hip_points[1][0]), float(right_knee_hip_points[1][1]), float(right_knee_hip_points[2][0]), float(right_knee_hip_points[2][1]), float(right_knee_hip_points[3][0]), float(right_knee_hip_points[3][1]))
    
    #torso
    torso_points = [(extend(left_shoulder, right_hip, 20)), (extend(right_shoulder, left_hip, 20)), (extend(right_hip, left_shoulder, 15)), (extend(left_hip, right_shoulder, 15))]
    redis_client.rpush(email, float(torso_points[0][0]), float(torso_points[0][1]), float(torso_points[1][0]), float(torso_points[1][1]), float(torso_points[2][0]), float(torso_points[2][1]), float(torso_points[3][0]), float(torso_points[3][1]))
    
    #face
    left_eye_point_x, left_eye_point_y = extend(left_eye, right_eye, 60)
    right_eye_point_x, right_eye_point_y = extend(right_eye, left_eye, 60)
    
    face_points = [(rotate(left_eye_point_x, left_eye_point_y, left_eye[0], left_eye[1], math.radians(-65))), (rotate(right_eye_point_x, right_eye_point_y, right_eye[0], right_eye[1], math.radians(65))), (rotate(right_eye_point_x, right_eye_point_y, right_eye[0], right_eye[1], math.radians(-40))), (rotate(left_eye_point_x, left_eye_point_y, left_eye[0], left_eye[1], math.radians(40)))]
    redis_client.rpush(email, float(face_points[0][0]), float(face_points[0][1]), float(face_points[1][0]), float(face_points[1][1]), float(face_points[2][0]), float(face_points[2][1]), float(face_points[3][0]), float(face_points[3][1]))
    
    crop_and_save_image(input_img_path, right_wrist_elbow_img_path, right_wrist_elbow_points)
    crop_and_save_image(input_img_path, left_wrist_elbow_img_path, left_wrist_elbow_points)
    crop_and_save_image(input_img_path, right_elbow_shoulder_img_path, right_elbow_shoulder_points)
    crop_and_save_image(input_img_path, left_elbow_shoulder_img_path, left_elbow_shoulder_points)
    crop_and_save_image(input_img_path, right_ankle_knee_img_path, right_ankle_knee_points)
    crop_and_save_image(input_img_path, left_ankle_knee_img_path, left_ankle_knee_points)
    crop_and_save_image(input_img_path, right_knee_hip_img_path, right_knee_hip_points)
    crop_and_save_image(input_img_path, left_knee_hip_img_path, left_knee_hip_points)
    crop_and_save_image(input_img_path, torso_img_path, torso_points)
    crop_and_save_image(input_img_path, face_img_path, face_points)
    
    cv2.destroyAllWindows()