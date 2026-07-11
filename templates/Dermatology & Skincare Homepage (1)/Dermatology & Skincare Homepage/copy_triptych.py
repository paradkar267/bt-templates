import shutil
import os

source_dir = r"C:\Users\ASUS VIVOBOOK 16X\.gemini\antigravity-ide\brain\b1dcfe4b-8925-421b-afea-487e3f96d064"
dest_dir = r"c:\Users\ASUS VIVOBOOK 16X\OneDrive\Desktop\templates\Dermatology & Skincare Homepage"

files = {
    "bronze_repair_1783668746596.png": "repair.png",
    "bronze_protect_1783668774096.png": "protect.png",
    "bronze_glow_1783668799170.png": "glow.png"
}

for src, dest in files.items():
    src_path = os.path.join(source_dir, src)
    dest_path = os.path.join(dest_dir, dest)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src} to {dest}")
    else:
        print(f"File not found: {src_path}")
