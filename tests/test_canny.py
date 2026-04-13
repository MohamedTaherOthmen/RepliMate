import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

print("=" * 50)
print("🔍 TEST DÉTECTION DE CONTOURS - CANNY")
print("=" * 50)

# Demander le chemin de l'image
image_path = input("\n📂 Entrez le chemin de l'image (ou 'test' pour image test): ")

if image_path.lower() == 'test' or not image_path:
    print("🎨 Création d'une image test...")
    # Créer une image test avec différentes formes
    img = np.zeros((400, 400, 3), dtype=np.uint8)
    
    # Dessiner des formes
    cv2.rectangle(img, (50, 50), (150, 150), (255, 255, 255), -1)  # Carré blanc
    cv2.circle(img, (250, 100), 50, (255, 255, 255), -1)  # Cercle blanc
    cv2.line(img, (50, 250), (350, 350), (255, 255, 255), 3)  # Ligne blanche
    cv2.ellipse(img, (200, 300), (80, 40), 0, 0, 360, (255, 255, 255), -1)  # Ellipse
    
    # Ajouter du texte
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, 'TEST', (50, 380), font, 1, (255, 255, 255), 2)
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    print("✅ Image test créée")
    
elif os.path.exists(image_path):
    # Charger l'image réelle
    img = cv2.imread(image_path)
    if img is None:
        print("❌ Erreur: Impossible de charger l'image")
        exit()
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    print(f"✅ Image chargée: {image_path}")
    print(f"   Dimensions: {img.shape[1]} x {img.shape[0]}")
else:
    print("❌ Fichier non trouvé. Utilisation de l'image test.")
    # Créer une image test simple
    gray = np.zeros((300, 300), dtype=np.uint8)
    cv2.rectangle(gray, (50, 50), (150, 150), 255, -1)
    cv2.circle(gray, (200, 200), 50, 255, -1)
    cv2.line(gray, (50, 250), (250, 250), 255, 2)

print("\n" + "=" * 50)
print("🎛️  PARAMÈTRES CANNY")
print("=" * 50)

# Paramètres Canny avec explications
print("\n📌 Les paramètres Canny:")
print("   - Seuil bas: en dessous de ce seuil → pas contour")
print("   - Seuil haut: au dessus de ce seuil → contour sûr")
print("   - Entre les deux → contour seulement si connecté à un contour sûr")

# Choix des paramètres
print("\n📊 Choisissez vos paramètres:")
print("   1. Par défaut (seuil bas=50, seuil haut=150)")
print("   2. Paramètres manuels")
print("   3. Test automatique de différents seuils")

choix = input("\n👉 Votre choix (1, 2 ou 3): ")

if choix == "2":
    seuil_bas = int(input("   Seuil bas (ex: 30): "))
    seuil_haut = int(input("   Seuil haut (ex: 90): "))
    
    # Application de Canny
    edges = cv2.Canny(gray, seuil_bas, seuil_haut)
    
    print(f"\n✅ Canny appliqué avec seuil bas={seuil_bas}, seuil haut={seuil_haut}")
    
    # Affichage
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 3, 1)
    plt.imshow(gray, cmap='gray')
    plt.title('Image originale')
    plt.axis('off')
    
    plt.subplot(1, 3, 2)
    plt.imshow(edges, cmap='gray')
    plt.title(f'Canny (bas={seuil_bas}, haut={seuil_haut})')
    plt.axis('off')
    
    # Superposition
    gray_color = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR) if len(gray.shape) == 2 else img.copy()
    gray_color[edges > 0] = [0, 255, 0]  # Contours en vert
    plt.subplot(1, 3, 3)
    plt.imshow(cv2.cvtColor(gray_color, cv2.COLOR_BGR2RGB))
    plt.title('Contours superposés (vert)')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()
    
elif choix == "3":
    print("\n🔄 Test de différentes combinaisons de seuils...")
    
    # Différents seuils à tester
    seuils = [
        (30, 90),   # Bas
        (50, 150),  # Moyen
        (100, 200), # Haut
        (150, 250)  # Très haut
    ]
    
    plt.figure(figsize=(15, 10))
    
    # Image originale
    plt.subplot(3, 3, 1)
    plt.imshow(gray, cmap='gray')
    plt.title('Originale')
    plt.axis('off')
    
    # Tester chaque combinaison
    for i, (bas, haut) in enumerate(seuils, 2):
        edges = cv2.Canny(gray, bas, haut)
        plt.subplot(3, 3, i)
        plt.imshow(edges, cmap='gray')
        plt.title(f'Canny (bas={bas}, haut={haut})')
        plt.axis('off')
        
        # Statistiques
        nb_contours = np.sum(edges > 0)
        total_pixels = edges.shape[0] * edges.shape[1]
        pourcentage = (nb_contours / total_pixels) * 100
        print(f"   Seuil {bas}-{haut}: {nb_contours} pixels ({pourcentage:.2f}%)")
    
    # Histogramme pour aider à choisir les seuils
    plt.subplot(3, 3, 6)
    plt.hist(gray.ravel(), bins=256, range=[0, 256], alpha=0.7)
    plt.title('Histogramme de l\'image')
    plt.xlabel('Intensité')
    plt.ylabel('Fréquence')
    plt.axvline(x=50, color='r', linestyle='--', alpha=0.5, label='Seuil bas typique')
    plt.axvline(x=150, color='g', linestyle='--', alpha=0.5, label='Seuil haut typique')
    plt.legend()
    
    plt.tight_layout()
    plt.show()

else:  # choix 1 ou par défaut
    # Paramètres par défaut
    seuil_bas = 50
    seuil_haut = 150
    
    print(f"\n✅ Utilisation des paramètres par défaut: bas={seuil_bas}, haut={seuil_haut}")
    
    # Application de Canny
    edges = cv2.Canny(gray, seuil_bas, seuil_haut)
    
    # Comparaison avec Sobel pour voir la différence
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    sobel_mag = np.sqrt(sobel_x**2 + sobel_y**2)
    sobel_mag = cv2.normalize(sobel_mag, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
    
    print("\n📊 Comparaison Canny vs Sobel:")
    
    plt.figure(figsize=(15, 8))
    
    plt.subplot(2, 4, 1)
    plt.imshow(gray, cmap='gray')
    plt.title('Originale')
    plt.axis('off')
    
    plt.subplot(2, 4, 2)
    plt.imshow(edges, cmap='gray')
    plt.title(f'Canny (bas={seuil_bas}, haut={seuil_haut})')
    plt.axis('off')
    
    plt.subplot(2, 4, 3)
    plt.imshow(sobel_mag, cmap='gray')
    plt.title('Sobel (magnitude)')
    plt.axis('off')
    
    # Statistiques
    nb_canny = np.sum(edges > 0)
    nb_sobel = np.sum(sobel_mag > 50)  # Seuillage simple
    
    plt.subplot(2, 4, 4)
    methodes = ['Canny', 'Sobel']
    valeurs = [nb_canny, nb_sobel]
    plt.bar(methodes, valeurs, color=['blue', 'orange'])
    plt.title('Nombre de pixels contour')
    plt.ylabel('Pixels')
    
    # Afficher différents seuils Canny
    plt.subplot(2, 4, 5)
    edges2 = cv2.Canny(gray, 30, 90)
    plt.imshow(edges2, cmap='gray')
    plt.title('Canny (bas=30, haut=90)')
    plt.axis('off')
    
    plt.subplot(2, 4, 6)
    edges3 = cv2.Canny(gray, 100, 200)
    plt.imshow(edges3, cmap='gray')
    plt.title('Canny (bas=100, haut=200)')
    plt.axis('off')
    
    plt.subplot(2, 4, 7)
    # Superposition Canny sur originale
    superposition = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
    superposition[edges > 0] = [0, 255, 0]
    plt.imshow(superposition)
    plt.title('Canny superposé (vert)')
    plt.axis('off')
    
    plt.subplot(2, 4, 8)
    # Différence Canny - Sobel (là où Canny détecte mais pas Sobel)
    sobel_seuil = (sobel_mag > 50).astype(np.uint8) * 255
    diff = cv2.bitwise_and(edges, cv2.bitwise_not(sobel_seuil))
    plt.imshow(diff, cmap='gray')
    plt.title('Canny uniquement')
    plt.axis('off')
    
    plt.tight_layout()
    plt.show()

print("\n" + "=" * 50)
print("📊 STATISTIQUES FINALES")
print("=" * 50)

# Statistiques générales
print(f"\n📐 Dimensions de l'image: {gray.shape[1]} x {gray.shape[0]}")
print(f"📦 Taille totale: {gray.size} pixels")

if 'edges' in locals():
    nb_contours = np.sum(edges > 0)
    print(f"\n🔍 Résultats Canny (bas={seuil_bas}, haut={seuil_haut}):")
    print(f"   - Pixels de contours: {nb_contours}")
    print(f"   - Pourcentage: {(nb_contours / gray.size) * 100:.2f}%")

print("\n" + "=" * 50)
print("✅ Test terminé!")
print("=" * 50)