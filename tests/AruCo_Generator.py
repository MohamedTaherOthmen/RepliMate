import cv2
import os
import numpy as np

def arucoDictInit():
    return cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_6X6_50)


def arucoGenerator(id, size=200):
    arucoDict = arucoDictInit()
    marker_image = np.zeros((size, size), dtype=np.uint8)
    cv2.aruco.generateImageMarker(arucoDict, id=id, sidePixels=size, img=marker_image)
    return marker_image 

def saveImg(imageMat, id, path="../exports"):
    cv2.imwrite(os.path.join(path, f"Aruco_{id}.png")  , imageMat)