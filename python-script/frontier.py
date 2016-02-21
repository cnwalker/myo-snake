import numpy as np
import Queue

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


def find_blob(x, y, grid):
    '''
    Given a starting point,
    '''
    start = (x,y)
    frontier = Queue.Queue()
    frontier.put(start)
    visited = []

    while not frontier.empty():
       current = frontier.get()

       for item in find_neighbor(current[1], current[0], grid):
          if item not in visited:
             frontier.put(item)
             visited.append(item)
       if not find_neighbor(current[1], current[0], grid):
             visited.append((current[1], current[0]))

    return visited

def update_grid(visited, grid):
    temp_grid = grid
    for x,y in visited:
        temp_grid[x,y] = 0.5
    return temp_grid

def find_open(grid):
    for i in range(grid.shape[0]):
        for j in range(grid.shape[1]):
            if grid[i,j] == 0:
                return (i,j)
    return False

def get_big_blob(grid):

    start = find_open(grid)

    big_blob = []

    while start:
        cur_blob = find_blob(start[1],start[0], grid)
        grid = update_grid(cur_blob, grid)
        if len(cur_blob) > 0.5 * grid.size:
            return cur_blob
        if len(cur_blob) > len(big_blob):
            big_blob = cur_blob



        start = find_open(grid)

    return big_blob



def main():
    pass


if __name__ == '__main__':
    main()
