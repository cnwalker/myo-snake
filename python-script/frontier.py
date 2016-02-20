import numpy as np
import matplotlib.pyplot as plt

def find_neighbor(x,y,grid):
    """ Returns a list of coordinates of good neighbors as a tuple of (y,x)"""
    out = []
    if x==0:
        pass
    else:
        if not grid[y,x-1]:
            out.append((y,x-1))
    if x == grid.shape[1]-1:
        pass
    else:
        if not grid[y,x+1]:
            out.append((y,x+1))
    if y ==0:
        pass
    else:
        if not grid[y-1,x]:
            out.append((y-1,x))
    if y == grid.shape[0]-1:
        pass
    else:
        if not grid[y+1,x]:
            out.append((y+1,x))

    return out



def main():
    a = np.zeros((10,10))
    a[3:6,4:8] = 1
    print find_neighbor(0,0,a)
    plt.imshow(a)
    plt.show()


if __name__ == '__main__':
    main()
