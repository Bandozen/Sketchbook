import cv2
import mediapipe as mp
import pygame
import sys

pygame.init()

screen_width, screen_height = 640, 480
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Character Movement with Multiple Joints")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)

# character_x, character_y = screen_width // 2, screen_height // 2
# character_speed = 10

def move_character(x, y):
    # character_x, character_y = screen_width // 2, screen_height // 2
    # new_x = character_x + x
    # new_y = character_y + y
    # if 0 <= new_x <= screen_width:
    #     character_x = new_x
    # if 0 <= new_y <= screen_height:
    #     character_y = new_y
    
    draw_character(x, y)
    
def draw_character(x, y):
    screen.fill((0, 0, 0))
    pygame.draw.circle(screen, (255, 0, 0), (x, y), 20)
    pygame.display.update()

cap = cv2.VideoCapture(0)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    
    ret, image = cap.read()
    if not ret:
        break
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    
    if results.pose_landmarks:
        # left_shoulder = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
        # left_elbow = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_wrist = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        # left_hip = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        # left_knee = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
        # left_ankle = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]
        
        left_arm_dx = int(640-(left_wrist.x * 640))
        left_arm_dy = int(left_wrist.y * 480)
        # left_leg_dx = int((left_knee.x - left_hip.x) * character_speed)
        # left_leg_dy = int((left_knee.y - left_hip.y) * character_speed)
        print(left_arm_dx, left_arm_dy)
        move_character(left_arm_dx, left_arm_dy)
    
    pygame.display.update()

cap.release()