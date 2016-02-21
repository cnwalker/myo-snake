import frontier
import os
import sys
import time
import numpy as np
##import matplotlib.pyplot as plt
import cv2
import json

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

def get_canvas(img_g,scale_board=False,num_x=20,num_y=30):
    """Scale board asks if you want to set the scale. Num x and y will be number of
    snake boxes in the x and y directions"""
    edges = cv2.Canny(img_g,10,100,2)
    if scale_board:
        conv_x = edges.shape[1]/num_x
        conv_y = edges.shape[0]/num_y
        snake_map = make_board(edges,conv_x,conv_y)
    else:
        snake_map = make_board(edges,10,10)

    return snake_map



def main():
    data = sys.stdin.read()
    # data = data.decode("base64")
    #create file
    # fname = 'tmp/' + str(time.time()) + '.png'
    # f=open (fname, 'wb')
    # f.write(data)
    # f.close()
    nbuf = np.frombuffer(data, dtype="int8")
    img = cv2.imdecode(nbuf, 0)
    # img_g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


    #remove files
    # os.remove('./' + fname)

    s_map = get_canvas(img)
    blob = frontier.get_big_blob(s_map)
    snake_list = s_map.tolist()
    edge_array = s_map.nonzero()
    edge_pt_list = zip(edge_array[0].tolist(),edge_array[1].tolist())
    for pt in blob:
        s_map[pt[0],pt[1]] = 1
    bad_array = 1 - s_map
    bad_array_indices = bad_array.nonzero()
    bad_pt_list = zip(bad_array_indices[0].tolist(),bad_array_indices[1].tolist())
    # print type(bad_pt_list[2][1])
    result_dict = {'map_array' : snake_list, 'good_points' : blob, 'bad_points' : bad_pt_list, 'edge_list' : edge_pt_list}
    out_str = json.dumps(result_dict)
    print out_str


if __name__ == '__main__':
    main()
