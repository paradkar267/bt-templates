import shutil
import os

source_dir = r"C:\Users\ASUS VIVOBOOK 16X\.gemini\antigravity-ide\brain\b1dcfe4b-8925-421b-afea-487e3f96d064"
dest_dir = r"c:\Users\ASUS VIVOBOOK 16X\OneDrive\Desktop\templates\Dermatology & Skincare Homepage"

files = {
    "model_acne_1783668239528.png": "model_acne.png",
    "model_hyperpigmentation_1783668265302.png": "model_hyper.png",
    "model_mature_1783668275328.png": "model_mature.png",
    "model_sensitive_1783668288189.png": "model_sensitive.png"
}

for src, dest in files.items():
    src_path = os.path.join(source_dir, src)
    dest_path = os.path.join(dest_dir, dest)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src} to {dest}")
    else:
        print(f"File not found: {src_path}")
