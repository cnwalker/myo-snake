import front
import dicts
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
            if img[pts_y[i]:pts_y[i+1],pts_x[j]:pts_x[j+1]].sum() > max(conv_x,conv_y)*1.0:
                snake_board[i,j] = 1
    return snake_board

def get_canvas(img_g):
    
    edges = cv2.Canny(img_g,10,100,2)
    snake_map = make_board(edges,7,7)
            
    return snake_map
    

    
def main():
    img = take_pic()
    s_map = get_canvas(img)
    blob = front.get_big_blob(s_map)
    for point in blob:
        s_map[point[0], point[1]] = 0.5
    plt.imshow(s_map, cmap=cm.gray)

if __name__ == '__main__':
    main()



