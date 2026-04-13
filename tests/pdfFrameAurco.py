import cv2
import numpy as np
import tempfile, os
from AruCo_Generator import arucoGenerator, arucoDictInit
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

def mm2pt(x): 
    return x * mm

AruCoSizeMM = 30
marginMM = 0
AruCoResPx = 400
pageWidth, pageHeigth = A4

AruCoSizePt = mm2pt(AruCoSizeMM)
marginPt = mm2pt(marginMM)

aruco_dict = arucoDictInit()

corners = {
    0: (marginPt,pageHeigth - marginPt - AruCoSizePt),                                  # Top Left
    1: (pageWidth - marginPt - AruCoSizePt, pageHeigth - marginPt - AruCoSizePt),       # Top Right
    2: (pageWidth - marginPt - AruCoSizePt, marginPt),                                  # Bottom Right
    3: (marginPt, marginPt),                                                            # Bottom Left
}

c = canvas.Canvas("../exports/calibration_board.pdf", pagesize=A4)

# 1. Outer cadre (frame)
c.setStrokeColorRGB(0, 0, 0)
c.setLineWidth(0.5)
c.rect(marginPt, marginPt,
       pageWidth - 2*marginPt,
       pageHeigth - 2*marginPt)

# 2. Inner scanning area (dashed)
inner = marginPt + AruCoSizePt + mm2pt(5)
c.setDash(4, 4)
c.setStrokeColorRGB(0.6, 0.6, 0.6)
c.rect(inner, inner, pageWidth - 2*inner, pageHeigth - 2*inner)
c.setDash()

# 3. Center text
c.setFont("Helvetica-Bold", 16)
c.drawCentredString(pageWidth/2, pageHeigth/2 + mm2pt(5), "PLACE OBJECT HERE")
c.setFont("Helvetica", 9)
c.drawCentredString(pageWidth/2, pageHeigth/2 - mm2pt(5), "Orange Fab Lab")

# 4. Draw markers + labels
tmp_files = []
labels = {0: "TL", 1: "TR", 2: "BR", 3: "BL"}

for marker_id, (x, y) in corners.items():
    img = np.zeros((AruCoResPx, AruCoResPx), dtype=np.uint8)
    cv2.aruco.generateImageMarker(aruco_dict, marker_id, AruCoResPx, img)

    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    cv2.imwrite(tmp.name, img)
    tmp_files.append(tmp.name)

    c.drawImage(tmp.name, x, y, width=AruCoSizePt, height=AruCoSizePt)

    # Label
    c.setFont("Helvetica-Bold", 7)
    lx = x + AruCoSizePt / 2
    if marker_id in (0, 1):  # top markers → label below
        c.drawCentredString(lx, y - mm2pt(4), f"ID:{marker_id} {labels[marker_id]}")
    else:                     # bottom markers → label above
        c.drawCentredString(lx, y + AruCoSizePt + mm2pt(2), f"ID:{marker_id} {labels[marker_id]}")

c.save()

for f in tmp_files:
    os.unlink(f)

print("Done → calibration_board.pdf")
print("Hayyy Hannaa nikhdmou ya louled !!!!!")