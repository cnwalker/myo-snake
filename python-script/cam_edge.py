import frontier
import os
import sys
import time
import numpy as np
from skimage import io as skio
from skimage import feature
import json
##import matplotlib.pyplot as plt # Diagnostic plotting

def make_board(img,conv_x,conv_y):
    im_shape = img.shape
    map_size = (im_shape[0]/conv_y,im_shape[1]/conv_x)
    pts_y = range(0,im_shape[0],conv_y)
    pts_x = range(0,im_shape[1],conv_x)
    snake_board = np.zeros(map_size)
    for i in range(len(pts_y)-1):
        for j in range(len(pts_x)-1):
            if img[pts_y[i]:pts_y[i+1],pts_x[j]:pts_x[j+1]].sum() > max(conv_x,conv_y)*0.9: # multiplicative factor must be under 1 so it includes straight lines
                snake_board[i,j] = 1
    return snake_board

def main():
    data = sys.stdin.read()
    #create file
##    fname = 'tmp/test.png'
    fname = 'tmp/' + str(time.time()) + '.png'
    f=open (fname, 'wb')
    f.write(data)
    f.close()
    # TODO this could be done better, cv2.imdecode()?

    img = skio.imread(fname, as_grey = True)

    #remove files
    os.remove('./' + fname)

    edges = feature.canny(img,sigma=2.)#,low_threshold=0.,high_threshold=90000.)
    snake_map = make_board(edges,5,5)
    snake_list = [list(row)for row in snake_map]
##    plt.imshow(snake_map) # Diagnostic plotting
##    plt.show()
    blob = frontier.get_big_blob(snake_map)
##    for pt in blob: # Diagnostic plotting
##        snake_map[pt[0],pt[1]] = 0.5
##    plt.imshow(snake_map,cmap='gray')
##    plt.show()
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
