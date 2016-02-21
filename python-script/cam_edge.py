import frontier
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

def get_canvas(img_g):

    edges = cv2.Canny(img_g,10,100,2)
    snake_map = make_board(edges,7,7)

    return snake_map



def main():
##    data = sys.stdin.read()
##    #create file
    fname = 'tmp/' + str(time.time()) + '.png'
##    f=open (fname, 'wb')
##    f.write(data)
##    f.close()

    #remove files
##    os.remove('./' + fname)
    img = sc2.imread(fname)
    s_map = get_canvas(img)
    blob = frontier.get_big_blob(s_map)
    snake_list = s_map.tolist()
    edge_array = s_map.nonzero()
    edge_pt_list = zip(edge_array[0].tolist(),edge_array[1].tolist())
    for pt in blob:
        s_map[pt[0],pt[1]] = 1
    bad_array = 1 - snake_map
    bad_array_indices = bad_array.nonzero()
    bad_pt_list = zip(bad_array_indices[0].tolist(),bad_array_indices[1].tolist())
    print type(bad_pt_list[2][1])
    result_dict = {'map_array' : snake_list, 'good_points' : blob, 'bad_points' : bad_pt_list, 'edge_list' : edge_pt_list}
    out_str = json.dumps(result_dict)
    print out_str


if __name__ == '__main__':
    main()
