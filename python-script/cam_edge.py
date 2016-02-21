import frontier
import numpy as np
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

def main():
    data = sys.stdin.read()
    fname = str(time.time()) + '.png'
    f=open (fname, 'wb')
    f.write(data)
    f.close()

    img = cv2.imread(fname)
    img_g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(img_g,10,100,2)
    snake_map = make_board(edges,7,7)
    snake_list = [list(row)for row in snake_map]
    blob = front.get_big_blob(snake_map)
    edge_array = snake_map.nonzero()
    edge_pt_list = zip(edge_array[0],edge_array[1])
    for pt in blob:
        snake_map[pt[0],pt[1]] = 1
    bad_array = 1 - snake_map
    bad_array_indices = bad_array.nonzero()
    bad_pt_list = zip(bad_array_indices[0],bad_array_indices[1])
    result_dict = {'map_array' : snake_list, 'good_points' : blob, 'bad_points' : bad_pt_list, 'edge_list' : edge_pt_list}
    out_str = json.dumps(result_dict)
    print out_str


if __name__ == '__main__':
    main()
