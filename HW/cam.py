import redis
import cv2
import sys

# 외부 Redis 서버 정보
redis_host = "i9c102.p.ssafy.io"
redis_port = 6379  # Redis 포트 번호
redis_password = "3btic102"  # 사용자 인증이 설정된 경우

# 외부 Redis 서버에 연결
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, db=1)
email = sys.argv[1]

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    value = redis_client.get(email)
    value = value.decode('utf-8')
    if (value != "story"):
        break
    ret, frame = cap.read()
    flipped_frame = cv2.flip(frame, 1)
    
    cv2.imshow('cam', flipped_frame)
    
    while cv2.waitKey(10) & 0xFF==ord('q'):
        break
    
cap.release()
cv2.destroyAllWindows()