import cv2
import numpy as np
import matplotlib.pyplot as plt

print("=" * 60)
print("🔍 TEST VECTORISATION - Canny uniquement")
print("=" * 60)

# 1. CRÉER UNE IMAGE TEST
print("\n🎨 Création d'une image test...")

# Créer une image noire 500x500
img = np.zeros((500, 500), dtype=np.uint8)

# Dessiner différentes formes géométriques
# Carré
cv2.rectangle(img, (50, 50), (150, 150), 255, -1)

# Cercle
cv2.circle(img, (250, 100), 40, 255, -1)

# Ligne diagonale
cv2.line(img, (50, 250), (350, 300), 255, 3)

# Rectangle
cv2.rectangle(img, (50, 350), (200, 450), 255, -1)

# Triangle (polygone)
pts = np.array([[300, 350], [400, 350], [350, 250]], np.int32)
cv2.fillPoly(img, [pts], 255)

print("✅ Image test créée avec 5 formes différentes")

# Afficher l'image test
plt.figure(figsize=(6, 6))
plt.imshow(img, cmap='gray')
plt.title("Image originale avec formes")
plt.axis('off')
plt.show()

# 2. APPLIQUER CANNY
print("\n🔎 Application de Canny...")

# Paramètres Canny (fixes pour le test)
seuil_bas = 50
seuil_haut = 150

edges = cv2.Canny(img, seuil_bas, seuil_haut)
print(f"✅ Canny appliqué (seuils: {seuil_bas}, {seuil_haut})")

# Afficher les contours Canny
plt.figure(figsize=(6, 6))
plt.imshow(edges, cmap='gray')
plt.title("Contours détectés par Canny")
plt.axis('off')
plt.show()

# 3. TROUVER LES CONTOURS
print("\n🔍 Recherche des contours...")

# Trouver tous les contours
contours, hierarchy = cv2.findContours(
    edges, 
    cv2.RETR_EXTERNAL,      # Seulement les contours externes
    cv2.CHAIN_APPROX_SIMPLE # Compression des contours
)

print(f"✅ {len(contours)} contours trouvés")

# 4. APPLIQUER DOUGLAS-PEUCKER AVEC DIFFÉRENTES TOLÉRANCES
print("\n📐 Test d'approximation avec différentes tolérances...")

# Tester plusieurs valeurs d'epsilon
tolerances = [1, 5, 10, 20, 30, 50]
resultats = []

for tol in tolerances:
    contours_simplifies = []
    for contour in contours:
        # Douglas-Peucker : simplifier le contour
        epsilon = tol
        approx = cv2.approxPolyDP(contour, epsilon, True)
        contours_simplifies.append(approx)
    resultats.append(contours_simplifies)
    
    # Compter le nombre total de points
    nb_points = sum(len(c) for c in contours_simplifies)
    print(f"   Tolérance {tol:2d} → {nb_points:3d} points")

# 5. VISUALISER LES RÉSULTATS
print("\n📊 Affichage des résultats...")

# Créer une figure avec plusieurs sous-graphiques
plt.figure(figsize=(15, 10))

# Image originale
plt.subplot(2, 3, 1)
plt.imshow(img, cmap='gray')
plt.title("Image originale")
plt.axis('off')

# Contours bruts (sans simplification)
plt.subplot(2, 3, 2)
img_bruts = np.zeros_like(img)
cv2.drawContours(img_bruts, contours, -1, 255, 2)
plt.imshow(img_bruts, cmap='gray')
plt.title(f"Contours bruts\n{sum(len(c) for c in contours)} points")
plt.axis('off')

# Afficher 4 niveaux de simplification
for i, tol in enumerate([1, 5, 10, 20]):
    plt.subplot(2, 3, i+3)
    img_simpl = np.zeros_like(img)
    cv2.drawContours(img_simpl, resultats[i], -1, 255, 2)
    
    # Ajouter les points de contrôle en rouge
    for contour in resultats[i]:
        for point in contour:
            cv2.circle(img_simpl, tuple(point[0]), 3, 128, -1)
    
    nb_points = sum(len(c) for c in resultats[i])
    plt.imshow(img_simpl, cmap='gray')
    plt.title(f"Tolérance {tol}\n{nb_points} points")
    plt.axis('off')

plt.tight_layout()
plt.show()

# 6. ANALYSE DÉTAILLÉE PAR CONTOUR
print("\n" + "=" * 60)
print("📊 ANALYSE DÉTAILLÉE PAR FORME")
print("=" * 60)

for i, contour in enumerate(contours):
    # Calculer les propriétés du contour original
    aire = cv2.contourArea(contour)
    perimetre = cv2.arcLength(contour, True)
    
    # Tester différentes simplifications
    print(f"\n🔸 Forme {i+1}:")
    print(f"   - Aire: {aire:.1f} pixels²")
    print(f"   - Périmètre: {perimetre:.1f} pixels")
    print(f"   - Points originaux: {len(contour)}")
    
    # Tester différentes valeurs d'epsilon (en % du périmètre)
    for pourcent in [1, 2, 5, 10]:
        epsilon = pourcent / 100 * perimetre
        approx = cv2.approxPolyDP(contour, epsilon, True)
        reduction = (1 - len(approx)/len(contour)) * 100
        print(f"   - Epsilon {pourcent}%: {len(approx)} points (réduction {reduction:.1f}%)")

# 7. IDENTIFICATION DES FORMES
print("\n" + "=" * 60)
print("🔷 IDENTIFICATION DES FORMES")
print("=" * 60)

for i, contour in enumerate(contours):
    # Prendre une simplification raisonnable (2% du périmètre)
    perimetre = cv2.arcLength(contour, True)
    epsilon = 0.02 * perimetre
    approx = cv2.approxPolyDP(contour, epsilon, True)
    
    nb_points = len(approx)
    aire = cv2.contourArea(contour)
    
    # Déterminer le type de forme
    if nb_points == 2:
        forme = "📏 Ligne"
    elif nb_points == 3:
        forme = "🔺 Triangle"
    elif nb_points == 4:
        # Vérifier si c'est un carré ou rectangle
        x, y, w, h = cv2.boundingRect(contour)
        ratio = w / h if h > 0 else 0
        if 0.9 < ratio < 1.1:
            forme = "⬛ Carré"
        else:
            forme = "📐 Rectangle"
    elif nb_points > 4:
        # Vérifier si c'est un cercle
        (x, y), rayon = cv2.minEnclosingCircle(contour)
        circularite = 4 * np.pi * aire / (perimetre * perimetre) if perimetre > 0 else 0
        if circularite > 0.8:
            forme = "⚪ Cercle"
        else:
            forme = f"🔄 Polygone ({nb_points} côtés)"
    else:
        forme = "❓ Inconnue"
    
    print(f"\n🔸 Forme {i+1}: {forme}")
    print(f"   - Points après simplification: {nb_points}")
    print(f"   - Circularité: {circularite:.2f}" if 'circularite' in locals() else "")

# 8. VISUALISATION FINALE
print("\n🎨 Création de la visualisation finale...")

# Créer une image couleur pour la visualisation
img_finale = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

# Dessiner les contours simplifiés avec des couleurs différentes
couleurs = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 0, 255)]

for i, contour in enumerate(contours):
    # Simplification optimale (2% du périmètre)
    perimetre = cv2.arcLength(contour, True)
    epsilon = 0.02 * perimetre
    approx = cv2.approxPolyDP(contour, epsilon, True)
    
    # Choisir une couleur
    couleur = couleurs[i % len(couleurs)]
    
    # Dessiner le contour simplifié
    cv2.drawContours(img_finale, [approx], -1, couleur, 3)
    
    # Dessiner les points de contrôle en jaune
    for point in approx:
        cv2.circle(img_finale, tuple(point[0]), 5, (0, 255, 255), -1)

# Afficher le résultat final
plt.figure(figsize=(10, 8))
plt.imshow(cv2.cvtColor(img_finale, cv2.COLOR_BGR2RGB))
plt.title("RÉSULTAT FINAL: Contours simplifiés avec points de contrôle")
plt.axis('off')
plt.tight_layout()
plt.show()

print("\n" + "=" * 60)
print("✅ Test de vectorisation terminé!")
print("=" * 60)

# 9. BONUS: AFFICHER LES COORDONNÉES DES POINTS
print("\n📐 Coordonnées des points simplifiés:")
for i, contour in enumerate(contours):
    perimetre = cv2.arcLength(contour, True)
    epsilon = 0.02 * perimetre
    approx = cv2.approxPolyDP(contour, epsilon, True)
    
    print(f"\nForme {i+1}: {len(approx)} points")
    for j, point in enumerate(approx):
        x, y = point[0]
        print(f"   Point {j+1}: ({x}, {y})")