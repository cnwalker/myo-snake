import numpy as np
import matplotlib.pyplot as plt
import cv2
import matplotlib.cm as cm
import json

def take_pic():
    cam = cv2.VideoCapture(1) # 1 is the connected webcam, IDK how to handle this... maybe better to have some web code which does this and just hands the image to python somehow.
    s, frame = cam.read()
    img_g = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cam.release()
    return img_g

def make_board(img,conv_x,conv_y):
    im_shape = img.shape
    map_size = (im_shape[0]/conv_y,im_shape[1]/conv_x)
    pts_y = range(0,im_shape[0],conv_y)
    pts_x = range(0,im_shape[1],conv_x)
    snake_board = np.zeros(map_size)
    for i in range(len(pts_y)-1):
        for j in range(len(pts_x)-1):
            if img[pts_y[i]:pts_y[i+1],pts_x[j]:pts_x[j+1]].sum() > max(conv_x,conv_y)*0.9:
                snake_board[i,j] = 1
    return snake_board

def main():
    img_g = take_pic()
    edges = cv2.Canny(img_g,10,100,2)
    snake_map = make_board(edges,5,5)
    snake_list = [list(row)for row in snake_map]
    out_str = json.dumps(snake_list)
    print(out_str)

if __name__ == '__main__':
    main()




