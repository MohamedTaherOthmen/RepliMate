import os
import cv2

def CannyFilter(image_path=None, output_path=None, clip_limit=2.0, grid_size=(8,8), blur_size=(5,5), threshold_ratio=0.5):
    try:
        if image_path is None:
            image_path = '../uploads/image.jpg'
        if output_path is None:
            output_path = '../exports/result.jpg'
        
        if not os.path.exists(image_path):
            print(f"Error: Input file {image_path} does not exist")
            return False, None
        
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        
        if img is None:
            print(f"Error: Could not read image from {image_path}")
            return False, None
        
        clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=grid_size)
        enhanced = clahe.apply(img)
        blur = cv2.GaussianBlur(enhanced, blur_size, 0)
        
        otsu_threshold, _ = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        lower_th = int(otsu_threshold * threshold_ratio)
        upper_th = int(otsu_threshold)
        edges = cv2.Canny(blur, lower_th, upper_th, L2gradient=True)
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        cv2.imwrite(output_path, edges)
        
        print(f"Canny filter Applied to Image and saved to {output_path}")
        
        return True, edges
        
    except Exception as e:
        print(f"Error during applying Canny Filter: {str(e)}")
        return False, None