import os, sys
from PIL import Image
import glob, os

size = 128, 128

files = os.listdir("/home/jayne/Documentos/ECOMAPSS/imagens coco/REDIMENSIONADAS/59c2c57342a4ab0011559712.jpg")
print(files)
count = 0
for infile in files:
    count = count + 1
    print "----------------------"
    print count
    outfile = os.path.splitext(infile)[0] + ".thumbnail"
    if infile != outfile:
        try:
            im = Image.open(infile)
            im.thumbnail(size, Image.ANTIALIAS)
            im.save(outfile, "PNG")
        except IOError:
            print "cannot create thumbnail for '%s'" % infile
