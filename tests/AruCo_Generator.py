import cv2
import os
import numpy as np

def arucoGenerator(id, size=200):
    arucoDict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_50)
    marker_image = np.zeros((size, size), dtype=np.uint8)
    cv2.aruco.generateImageMarker(arucoDict, id=id, sidePixels=size, img=marker_image)
    return marker_image  

def saveImg(imageMat, id, path="../exports"):
    cv2.imwrite(os.path.join(path, f"Aruco_{id}.png")  , imageMat)

aruco1 = arucoGenerator(0, 200)
saveImg(aruco1, 0)
aruco2 = arucoGenerator(1, 200)
saveImg(aruco2, 1)
aruco3 = arucoGenerator(2, 200)
saveImg(aruco3, 2)
aruco4 = arucoGenerator(3, 200)
saveImg(aruco4, 3)