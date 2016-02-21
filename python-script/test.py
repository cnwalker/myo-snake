#!python
import sys
from skimage import io as skio
import time

if __name__ == "__main__":
    # buff = ""
    # for line in fileinput.input():
    #     buff += line
    #
    # print buff
    data = sys.stdin.read()
    fname = str(time.time()) + '.png'
    f=open (fname, 'wb')
    f.write(data)
    f.close()

    img = skio.imread(fname, as_grey = True)
    print img.shape
    # new_img = np.array(img)
    # plt.imshow(new_img)
    # plt.show()



    print "done"
