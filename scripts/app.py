import os
import cv2
import numpy as np
from PIL import Image
import streamlit as st
from cannyFilter import CannyFilter

st.set_page_config(
    page_title="RepliMate",
    page_icon="🔄"
)
st.title("RepliMate Interface")

uploaded_file = st.file_uploader(
    "Choisissez une image",
    type=['png', 'jpg', 'jpeg', 'tiff']
)

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    array_img = np.array(image)
    cv2.imwrite("../uploads/image.jpg", array_img)

    st.image(image, caption="Aperçu", use_container_width=True)
    
    st.write("Informations")
    st.write(f"**Nom :** {uploaded_file.name}")
    st.write(f"**Taille :** {round(uploaded_file.size / 1024, 2)} Ko \t **Dimensions :** {image.size[0]} x {image.size[1]} pixels")
    
    st.success("Image importée avec succès !")
    if st.button("Traiter l'image", type="primary"):
        with st.spinner("Traitement en cours..."):
            state, imageFiltred = CannyFilter("../uploads/image.jpg", "../exports/result.jpg")
            if state and os.path.exists("../exports/result.jpg"):
                st.success("Les contoures de l'image sont detectés !")
                st.image(imageFiltred, caption="Résultat du filtre Canny", use_container_width=True)
            else:
                st.error("Error while detecting contour")
                
    