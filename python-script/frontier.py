import numpy as np
import Queue


def find_open(grid):
    for i in range(grid.shape[0]-1):
        for j in range(grid.shape[1]-1):
            if grid[i,j] == 0:
                return (i,j)
    return False

def find_neighbors(y,x,grid):
    out = []
    if x > 0:
        if grid[y, x - 1] == 0:
            out.append((y, x-1))
    if x + 1 < grid.shape[1]:
        if grid[y, x + 1] == 0:
            out.append((y, x+1))
    if y > 0:
        if grid[y - 1, x] == 0:
            out.append((y-1,x))
    if y + 1 < grid.shape[0]:
        if grid[y + 1, x] == 0:
            out.append((y+1,x))
    return out



def find_blob(y, x, grid):
    start = (y,x)
    frontier = Queue.Queue()
    frontier.put(start)
    visited = []

    while not frontier.empty():
       current = frontier.get()
       for item in find_neighbors(current[0], current[1], grid):
          if item not in visited:
             frontier.put(item)
             visited.append(item)
       if not find_neighbors(current[0], current[1], grid):
             visited.append((current[0], current[1]))

    return visited

def update_grid(visited, grid, param):
    temp_grid = grid
    for x,y in visited:
        temp_grid[x,y] = param
    return temp_grid



def get_big_blob(grid):

    start = find_open(grid)
    big_blob = []

    while start:
        cur_blob = find_blob(start[0],start[1], grid)
        grid = update_grid(cur_blob, grid, 0.1)
        if len(cur_blob) > len(big_blob):
            big_blob = cur_blob
        start = find_open(grid)

    grid = update_grid(big_blob, grid, 0.5)

    return big_blob



def main():
    pass


if __name__ == '__main__':
    main()
