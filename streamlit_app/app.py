import streamlit as st
from PIL import Image
from datetime import datetime

# Configuration de la page
st.set_page_config(
    page_title="RepliMate",
    page_icon="🔄"
)

# Titre
st.title("🔄 RepliMate - Import d'images")

# Zone d'upload
uploaded_file = st.file_uploader(
    "Choisissez une image",
    type=['png', 'jpg', 'jpeg', 'tiff']
)

# Si un fichier est uploadé
if uploaded_file is not None:
    # Ouvrir l'image avec PIL
    image = Image.open(uploaded_file)
    
    # Afficher l'image
    st.image(image, caption="Aperçu", use_container_width=True)
    
    # Afficher les infos
    st.write("### Informations")
    st.write(f"**Nom :** {uploaded_file.name}")
    st.write(f"**Taille :** {round(uploaded_file.size / 1024, 2)} Ko")
    st.write(f"**Dimensions :** {image.size[0]} x {image.size[1]} pixels")
    
    # Bouton de succès
    st.success("✅ Image importée avec succès!")