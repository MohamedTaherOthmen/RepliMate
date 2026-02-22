# RepliMate 🔧

> **Reverse Engineering Tool** — From photo to DXF in seconds.

RepliMate transforms photographs of physical 2D mechanical pieces into precise, ready-to-use DXF files for CAD software and CNC machines — no manual redrawing needed.

---

## 🎯 The Problem

Engineers and manufacturers often have physical parts with no digital documentation — broken pieces, legacy parts, or custom components with no original blueprints. Recreating them manually in CAD is slow, expensive, and error-prone.

**RepliMate automates this process.**

---

## ⚙️ How It Works

```
📷  Photo Input
      ↓
🔧  Preprocessing
    - CLAHE contrast enhancement
    - Gaussian denoising
    - Perspective correction
    - Scale detection via reference object
      ↓
✏️   Edge & Contour Detection
    - Otsu thresholding
    - Canny edge detection
    - Contour extraction & smoothing
      ↓
📐  Geometry Recognition
    - Straight lines & curves
    - Circles & holes (Hough transform)
    - Arc detection
      ↓
📄  DXF Export
    - Compatible with AutoCAD, FreeCAD, SolidWorks, CNC
```

---

## ✨ Features

- 📷 **Photo to DXF** — single photo input, clean DXF output
- 📏 **Auto scale detection** — uses a reference object in the photo for real-world dimensions
- 🔵 **Hole & circle detection** — automatically detects and places circles
- 📐 **Geometry recognition** — detects lines, arcs, and curves
- 🧹 **Noise filtering** — clean contours from real-world photos
- 🤖 **Deep learning layer** *(optional)* — piece classification with YOLOv8
- 🖥️  **Desktop GUI** — simple PyQt5 interface

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Language | Python 3.10 |
| Image Processing | OpenCV, scikit-image |
| DXF Export | ezdxf |
| Deep Learning | PyTorch, YOLOv8 (Ultralytics) |
| GUI | PyQt5 |
| Visualization | matplotlib |

---

## 📋 Requirements

- Python 3.10+
- Ubuntu 22.04 / Windows 10+ / macOS
- Camera or scanner (min 12MP recommended for precision)

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourname/replimate.git
cd replimate

# Create virtual environment
python3 -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate.bat     # Windows

# Install dependencies
pip install -r requirements.txt
```

---

## 📦 Dependencies

```
opencv-contrib-python==4.9.0.80
numpy>=1.24
ezdxf==1.3.4
scikit-image==0.22.0
matplotlib==3.8.0
Pillow==10.3.0
scipy==1.13.0
PyQt5==5.15.10
torch==2.3.0
torchvision==0.18.0
ultralytics==8.2.0
```

---

## 🖥️ Usage

```bash
# Run the GUI
python main.py

# Run from command line
python replimate.py --input photo.jpg --output piece.dxf --scale 1.0
```

---

## 📁 Project Structure

```
replimate/
├── main.py                  # Entry point / GUI launcher
├── replimate.py             # CLI entry point
├── requirements.txt
├── README.md
│
├── core/
│   ├── preprocessing.py     # CLAHE, denoising, perspective correction
│   ├── detection.py         # Edge & contour detection
│   ├── geometry.py          # Line, arc, circle recognition
│   └── exporter.py          # DXF export via ezdxf
│
├── ml/
│   ├── classifier.py        # Piece type classification
│   └── models/              # Trained model weights
│
├── ui/
│   ├── main_window.ui       # PyQt5 UI file
│   └── main_window.py       # UI logic
│
├── assets/
│   └── test_pieces/         # Sample images for testing
│
└── tests/
    ├── test_preprocessing.py
    ├── test_detection.py
    └── test_exporter.py
```

---

## 🗺️ Roadmap

- [x] Core pipeline (preprocessing → edge detection → DXF)
- [x] Circle & hole detection
- [ ] Arc & curve fitting
- [ ] Perspective correction UI
- [ ] Scale reference detection (ArUco markers)
- [ ] Deep learning piece classifier
- [ ] Batch processing (multiple photos)
- [ ] STL export for 3D printing
- [ ] Mobile app (Android/iOS)

---

## 🎯 Target Users

- Mechanical engineers
- CNC machinists
- Reverse engineering labs
- Small workshops without CMM machines
- Students in mechanical engineering

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Taher**
> Built with ❤️ for engineers who still have physical parts but no blueprints.