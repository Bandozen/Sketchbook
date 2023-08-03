import tensorflow as tf
import numpy as np
import cv2
import math
from PIL import Image

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

  cv2.circle(img, input_points[0], 5, (255, 0, 0), -1)
  cv2.circle(img, input_points[1], 5, (0, 255, 0), -1)
  cv2.circle(img, input_points[2], 5, (0, 0, 255), -1)
  cv2.circle(img, input_points[3], 5, (0, 255, 255), -1)

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

  combined.save('assemble.png')
  combined.show()
    
interpreter = tf.lite.Interpreter(model_path='lite-model_movenet_singlepose_lightning_tflite_float16_4.tflite')
interpreter.allocate_tensors()

while True:
  mv_left_eye = [0, 0]
  mv_left_wrist = [0, 0]
  mv_left_elbow = [0, 0]
  mv_left_shoulder = [0, 0]
  mv_left_hip = [0, 0]
  mv_left_knee = [0, 0]
  mv_left_ankle = [0, 0]
  mv_right_eye = [0, 0]
  mv_right_wrist = [0, 0]
  mv_right_elbow = [0, 0]
  mv_right_shoulder = [0, 0]
  mv_right_hip = [0, 0]
  mv_right_knee = [0, 0]
  mv_right_ankle = [0, 0]
  cap = cv2.VideoCapture(0)

  while cap.isOpened():
    ret, frame = cap.read()
    flipped_frame = cv2.flip(frame, 1)

    img = flipped_frame.copy()
    img = tf.image.resize_with_pad(np.expand_dims(img, axis=0), 192, 192)
    input_image = tf.cast(img, dtype=tf.uint8)

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], np.array(input_image))
    interpreter.invoke()
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])
    
    print(keypoints_with_scores[0][0][1][2], keypoints_with_scores[0][0][2][2], keypoints_with_scores[0][0][5][2], keypoints_with_scores[0][0][6][2], keypoints_with_scores[0][0][7][2], keypoints_with_scores[0][0][8][2], keypoints_with_scores[0][0][9][2], keypoints_with_scores[0][0][10][2], keypoints_with_scores[0][0][11][2], keypoints_with_scores[0][0][12][2], keypoints_with_scores[0][0][13][2], keypoints_with_scores[0][0][14][2], keypoints_with_scores[0][0][15][2], keypoints_with_scores[0][0][16][2])

    if(keypoints_with_scores[0][0][1][2] > 0.4 and keypoints_with_scores[0][0][2][2] > 0.4 and keypoints_with_scores[0][0][5][2] > 0.4 and keypoints_with_scores[0][0][6][2] > 0.4 and keypoints_with_scores[0][0][7][2] > 0.4 and keypoints_with_scores[0][0][8][2] > 0.4 and keypoints_with_scores[0][0][9][2] > 0.4 and keypoints_with_scores[0][0][10][2] > 0.4 and keypoints_with_scores[0][0][11][2] > 0.4 and keypoints_with_scores[0][0][12][2] > 0.4 and keypoints_with_scores[0][0][13][2] > 0.4 and keypoints_with_scores[0][0][14][2] > 0.4 and keypoints_with_scores[0][0][15][2] > 0.4 and keypoints_with_scores[0][0][16][2] > 0.4):
      mv_left_eye = [keypoints_with_scores[0][0][1][1] * 640, keypoints_with_scores[0][0][1][0] * 480]
      mv_right_eye = [keypoints_with_scores[0][0][2][1] * 640, keypoints_with_scores[0][0][2][0] * 480]
      mv_left_shoulder = [keypoints_with_scores[0][0][5][1] * 640, keypoints_with_scores[0][0][5][0] * 480]
      mv_right_shoulder = [keypoints_with_scores[0][0][6][1] * 640, keypoints_with_scores[0][0][6][0] * 480]
      mv_left_elbow = [keypoints_with_scores[0][0][7][1] * 640, keypoints_with_scores[0][0][7][0] * 480]
      mv_right_elbow = [keypoints_with_scores[0][0][8][1] * 640, keypoints_with_scores[0][0][8][0] * 480]
      mv_left_wrist = [keypoints_with_scores[0][0][9][1] * 640, keypoints_with_scores[0][0][9][0] * 480]
      mv_right_wrist = [keypoints_with_scores[0][0][10][1] * 640, keypoints_with_scores[0][0][10][0] * 480]
      mv_left_hip = [keypoints_with_scores[0][0][11][1] * 640, keypoints_with_scores[0][0][11][0] * 480]
      mv_right_hip = [keypoints_with_scores[0][0][12][1] * 640, keypoints_with_scores[0][0][12][0] * 480]
      mv_left_knee = [keypoints_with_scores[0][0][13][1] * 640, keypoints_with_scores[0][0][13][0] * 480]
      mv_right_knee = [keypoints_with_scores[0][0][14][1] * 640, keypoints_with_scores[0][0][14][0] * 480]
      mv_left_ankle = [keypoints_with_scores[0][0][15][1] * 640, keypoints_with_scores[0][0][15][0] * 480]
      mv_right_ankle = [keypoints_with_scores[0][0][16][1] * 640, keypoints_with_scores[0][0][16][0] * 480]
      cap.release()

    # cv2.imshow('Movenet Lightning', flipped_frame)
  
  # left_wrist to elbow
  left_wrist_elbow_points = [[544, 98], [424, 83], [416, 152], [535, 167]]
  mv_left_wtoe_wrist_point_x, mv_left_wtoe_wrist_point_y = extend(mv_left_wrist, mv_left_elbow, 40)
  mv_left_wtoe_elbow_point_x, mv_left_wtoe_elbow_point_y = extend(mv_left_elbow, mv_left_wrist, 40)

  mv_left_wrist_elbow_points = [(rotate(mv_left_wtoe_wrist_point_x, mv_left_wtoe_wrist_point_y, mv_left_wrist[0], mv_left_wrist[1], math.radians(-60))), (rotate(mv_left_wtoe_elbow_point_x, mv_left_wtoe_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(60))), (rotate(mv_left_wtoe_elbow_point_x, mv_left_wtoe_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(-60))), (rotate(mv_left_wtoe_wrist_point_x, mv_left_wtoe_wrist_point_y, mv_left_wrist[0], mv_left_wrist[1], math.radians(60)))]

  transform("left_wrist_elbow.png", "mv_left_wrist_elbow.png", left_wrist_elbow_points, mv_left_wrist_elbow_points)

  # right_wrist to elbow
  right_wrist_elbow_points = [[104, 167], [225, 152], [215, 83], [96, 98]]
  mv_right_wtoe_wrist_point_x, mv_right_wtoe_wrist_point_y = extend(mv_right_wrist, mv_right_elbow, 40)
  mv_right_wtoe_elbow_point_x, mv_right_wtoe_elbow_point_y = extend(mv_right_elbow, mv_right_wrist, 40)

  mv_right_wrist_elbow_points = [(rotate(mv_right_wtoe_wrist_point_x, mv_right_wtoe_wrist_point_y, mv_right_wrist[0], mv_right_wrist[1], math.radians(-60))), (rotate(mv_right_wtoe_elbow_point_x, mv_right_wtoe_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(60))), (rotate(mv_right_wtoe_elbow_point_x, mv_right_wtoe_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(-60))), (rotate(mv_right_wtoe_wrist_point_x, mv_right_wtoe_wrist_point_y, mv_right_wrist[0], mv_right_wrist[1], math.radians(60)))]

  transform("right_wrist_elbow.png", "mv_right_wrist_elbow.png", right_wrist_elbow_points, mv_right_wrist_elbow_points)

  # left_elbow to shoulder
  left_elbow_shoulder_points = [[469, 92], [360, 61], [341, 128], [450, 159]]
  mv_left_etos_elbow_point_x, mv_left_etos_elbow_point_y = extend(mv_left_elbow, mv_left_shoulder, 40)
  mv_left_etos_shoulder_point_x, mv_left_etos_shoulder_point_y = extend(mv_left_shoulder, mv_left_elbow, 40)

  mv_left_elbow_shoulder_points = [(rotate(mv_left_etos_elbow_point_x, mv_left_etos_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(-60))), (rotate(mv_left_etos_shoulder_point_x, mv_left_etos_shoulder_point_y, mv_left_shoulder[0], mv_left_shoulder[1], math.radians(60))), (rotate(mv_left_etos_shoulder_point_x, mv_left_etos_shoulder_point_y, mv_left_shoulder[0], mv_left_shoulder[1], math.radians(-60))), (rotate(mv_left_etos_elbow_point_x, mv_left_etos_elbow_point_y, mv_left_elbow[0], mv_left_elbow[1], math.radians(60)))]

  transform("left_elbow_shoulder.png", "mv_left_elbow_shoulder.png", left_elbow_shoulder_points, mv_left_elbow_shoulder_points)

  # right_elbow to shoulder
  right_elbow_shoulder_points = [[190, 159], [299, 128], [280, 61], [171, 92]]
  mv_right_etos_elbow_point_x, mv_right_etos_elbow_point_y = extend(mv_right_elbow, mv_right_shoulder, 40)
  mv_right_etos_shoulder_point_x, mv_right_etos_shoulder_point_y = extend(mv_right_shoulder, mv_right_elbow, 40)

  mv_right_elbow_shoulder_points = [(rotate(mv_right_etos_elbow_point_x, mv_right_etos_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(-60))), (rotate(mv_right_etos_shoulder_point_x, mv_right_etos_shoulder_point_y, mv_right_shoulder[0], mv_right_shoulder[1], math.radians(60))), (rotate(mv_right_etos_shoulder_point_x, mv_right_etos_shoulder_point_y, mv_right_shoulder[0], mv_right_shoulder[1], math.radians(-60))), (rotate(mv_right_etos_elbow_point_x, mv_right_etos_elbow_point_y, mv_right_elbow[0], mv_right_elbow[1], math.radians(60)))]

  transform("right_elbow_shoulder.png", "mv_right_elbow_shoulder.png", right_elbow_shoulder_points, mv_right_elbow_shoulder_points)

  # left_ankle to knee
  left_ankle_knee_points = [[428, 443], [400, 304], [332, 317], [360, 456]]
  mv_left_atok_ankle_point_x, mv_left_atok_ankle_point_y = extend(mv_left_ankle, mv_left_knee, 40)
  mv_left_atok_knee_point_x, mv_left_atok_knee_point_y = extend(mv_left_knee, mv_left_ankle, 40)

  mv_left_ankle_knee_points = [(rotate(mv_left_atok_ankle_point_x, mv_left_atok_ankle_point_y, mv_left_ankle[0], mv_left_ankle[1], math.radians(-60))), (rotate(mv_left_atok_knee_point_x, mv_left_atok_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(60))), (rotate(mv_left_atok_knee_point_x, mv_left_atok_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(-60))), (rotate(mv_left_atok_ankle_point_x, mv_left_atok_ankle_point_y, mv_left_ankle[0], mv_left_ankle[1], math.radians(60)))]

  transform("left_ankle_knee.png", "mv_left_ankle_knee.png", left_ankle_knee_points, mv_left_ankle_knee_points)

  # right_ankle to knee
  right_ankle_knee_points = [[280, 456], [308, 317], [240, 304], [212, 443]]
  mv_right_atok_ankle_point_x, mv_right_atok_ankle_point_y = extend(mv_right_ankle, mv_right_knee, 40)
  mv_right_atok_knee_point_x, mv_right_atok_knee_point_y = extend(mv_right_knee, mv_right_ankle, 40)

  mv_right_ankle_knee_points = [(rotate(mv_right_atok_ankle_point_x, mv_right_atok_ankle_point_y, mv_right_ankle[0], mv_right_ankle[1], math.radians(-60))), (rotate(mv_right_atok_knee_point_x, mv_right_atok_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(60))), (rotate(mv_right_atok_knee_point_x, mv_right_atok_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(-60))), (rotate(mv_right_atok_ankle_point_x, mv_right_atok_ankle_point_y, mv_right_ankle[0], mv_right_ankle[1], math.radians(60)))]

  transform("right_ankle_knee.png", "mv_right_ankle_knee.png", right_ankle_knee_points, mv_right_ankle_knee_points)

  # left_knee to hip
  left_knee_hip_points = [[408, 343], [380, 204], [312, 217], [340, 356]]
  mv_left_ktoh_knee_point_x, mv_left_ktoh_knee_point_y = extend(mv_left_knee, mv_left_hip, 40)
  mv_left_ktoh_hip_point_x, mv_left_ktoh_hip_point_y = extend(mv_left_hip, mv_left_knee, 40)

  mv_left_knee_hip_points = [(rotate(mv_left_ktoh_knee_point_x, mv_left_ktoh_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(-60))), (rotate(mv_left_ktoh_hip_point_x, mv_left_ktoh_hip_point_y, mv_left_hip[0], mv_left_hip[1], math.radians(60))), (rotate(mv_left_ktoh_hip_point_x, mv_left_ktoh_hip_point_y, mv_left_hip[0], mv_left_hip[1], math.radians(-60))), (rotate(mv_left_ktoh_knee_point_x, mv_left_ktoh_knee_point_y, mv_left_knee[0], mv_left_knee[1], math.radians(60)))]

  transform("left_knee_hip.png", "mv_left_knee_hip.png", left_knee_hip_points, mv_left_knee_hip_points)

  # right_knee to hip
  right_knee_hip_points = [[300, 356], [328, 217], [260, 204], [232, 343]]
  mv_right_ktoh_knee_point_x, mv_right_ktoh_knee_point_y = extend(mv_right_knee, mv_right_hip, 40)
  mv_right_ktoh_hip_point_x, mv_right_ktoh_hip_point_y = extend(mv_right_hip, mv_right_knee, 40)

  mv_right_knee_hip_points = [(rotate(mv_right_ktoh_knee_point_x, mv_right_ktoh_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(-60))), (rotate(mv_right_ktoh_hip_point_x, mv_right_ktoh_hip_point_y, mv_right_hip[0], mv_right_hip[1], math.radians(60))), (rotate(mv_right_ktoh_hip_point_x, mv_right_ktoh_hip_point_y, mv_right_hip[0], mv_right_hip[1], math.radians(-60))), (rotate(mv_right_ktoh_knee_point_x, mv_right_ktoh_knee_point_y, mv_right_knee[0], mv_right_knee[1], math.radians(60)))]

  transform("right_knee_hip.png", "mv_right_knee_hip.png", right_knee_hip_points, mv_right_knee_hip_points)

  # torso
  torso_points = [[380, 83], [260, 83], [280, 247], [360, 247]]
  mv_torso_points = [(extend(mv_left_shoulder, mv_right_hip, 20)), (extend(mv_right_shoulder, mv_left_hip, 20)), (extend(mv_right_hip, mv_left_shoulder, 20)), (extend(mv_left_hip, mv_right_shoulder, 20))]

  transform("torso.png", "mv_torso.png", torso_points, mv_torso_points)

  # face
  face_points = [(365, 2), (275, 2), (275, 88), (365, 88)]
  mv_left_eye_point_x, mv_left_eye_point_y = extend(mv_left_eye, mv_right_eye, 50)
  mv_right_eye_point_x, mv_right_eye_point_y = extend(mv_right_eye, mv_left_eye, 50)

  mv_face_points = [(rotate(mv_left_eye_point_x, mv_left_eye_point_y, mv_left_eye[0], mv_left_eye[1], math.radians(-60))), (rotate(mv_right_eye_point_x, mv_right_eye_point_y, mv_right_eye[0], mv_right_eye[1], math.radians(60))), (rotate(mv_right_eye_point_x, mv_right_eye_point_y, mv_right_eye[0], mv_right_eye[1], math.radians(-60))), (rotate(mv_left_eye_point_x, mv_left_eye_point_y, mv_left_eye[0], mv_left_eye[1], math.radians(60)))]

  transform("face.png", "mv_face.png", face_points, mv_face_points)

  # assemble
  first_file = 'mv_torso.png'
  overlay_files = ['mv_face.png', 'mv_right_knee_hip.png', 'mv_left_knee_hip.png', 'mv_right_ankle_knee.png', 'mv_left_ankle_knee.png','mv_right_elbow_shoulder.png', 'mv_left_elbow_shoulder.png', 'mv_right_wrist_elbow.png', 'mv_left_wrist_elbow.png']
  assemble(first_file, overlay_files)

  while cv2.waitKey(10) & 0xFF==ord('q'):
    break

if(cap.isOpened()):
  cap.release()
cv2.destroyAllWindows()