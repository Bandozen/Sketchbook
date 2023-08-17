import socket
import struct
import pickle
import cv2
import sys

server_ip = '0.0.0.0'
server_port = 12345

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((server_ip, server_port))
server_socket.listen(10)
email = sys.argv[1]
print("Server listening...")

client_socket, address = server_socket.accept()
print(f"Connected from {address}")

data_buffer = b''
data_size = struct.calcsize(">L")
flag1 = 0
flag2 = 0

while True:
    while len(data_buffer) < data_size:
        data_buffer += client_socket.recv(4096)
        if (flag1 == 1 and len(data_buffer) == 0):
            flag2 = 1
            break
    
    if flag2 == 1:
        break
    packed_data_size = data_buffer[:data_size]
    data_buffer = data_buffer[data_size:]
    
    try:
        frame_size = struct.unpack(">L", packed_data_size)[0]
        
    except struct.error as e:
        print("Error unpacking frame size:", str(e))
        data_buffer = b''
        continue
        
    while len(data_buffer) < frame_size:
        data_buffer += client_socket.recv(4096)
        
    frame_data = data_buffer[:frame_size]
    data_buffer = data_buffer[frame_size:]
    
    print("frame_size : {} bytes".format(frame_size))
    
    frame = pickle.loads(frame_data)
    frame = cv2.imdecode(frame, cv2.IMREAD_COLOR)
    
    image_filename = f"/home/ubuntu/user/{email}/image.jpg"
    cv2.imwrite(image_filename, frame)
    print("Image saved")
    flag1 = 1


client_socket.close()
server_socket.close()