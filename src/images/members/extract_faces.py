# Extract and crop faces from an image

import sys
import cv2
import glob
import os

DETECTION_SCALE = 1/8
CROP_SCALE = 2
TARGET_RESOLUTION = 256

if __name__=="__main__":
    if len(sys.argv) < 4:
        print("Usage: python {} <haar cascade> <input folder> <output folder>".format(sys.argv[0]))
        print("Edit this file itself to change some parameters")
        sys.exit(0)
    
    # Load the frontal face cascade classifier
    # http://alereimondo.no-ip.org/OpenCV/34
    faceCascade = cv2.CascadeClassifier(sys.argv[1])
    
    # List all images
    images = glob.glob(os.path.join(sys.argv[2], "*.JPG"))
    
    for imgName in images:
        # Read the image and convert it to grayscale
        img = cv2.imread(imgName)
        rimg = cv2.resize(img, None, fx=DETECTION_SCALE, fy=DETECTION_SCALE)
        gimg = cv2.cvtColor(rimg, cv2.COLOR_BGR2GRAY)
        
        # Detect features
        faces = faceCascade.detectMultiScale(gimg, 1.2, 5)
        
        # Take the higher rectangle
        if len(faces) == 0:
            print("Warning: Could not detect face for {}".format(imgName))
            continue
        
        maxface = faces[0]
        for face in faces:
            if face[1] < maxface[1]:
                maxface = face
        
        # Crop and scale the face
        maxdim = maxface[2]
        if maxface[2] < maxface[3]:
            maxdim = maxface[3]
        
        maxdim = maxdim * CROP_SCALE
        cx = maxface[0] - (maxdim - maxface[2]) / 2
        cy = maxface[1] - (maxdim - maxface[3]) / 2
        
        cx = int(cx / DETECTION_SCALE)
        cy = int(cy / DETECTION_SCALE)
        cs = int(maxdim / DETECTION_SCALE)
        scale = TARGET_RESOLUTION / cs
        
        if cx < 0:
            cx = 0
        if cy < 0:
            cy = 0
        
        cimg = img[cy:cy + cs, cx:cx + cs]
        simg = cv2.resize(cimg, None, fx=scale, fy=scale)
        
        # Save the result
        cv2.imwrite(os.path.join(sys.argv[3], os.path.basename(imgName)), simg)
        print("Wrote {}".format(imgName))
        
        # Show the result
        if len(sys.argv) > 4 and sys.argv[4] == "debug":
            cv2.imshow("tracking", simg)
            key = cv2.waitKey(0)
            if key == 27:
                break
