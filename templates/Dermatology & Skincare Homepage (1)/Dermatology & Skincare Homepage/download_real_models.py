import urllib.request
import os

images = {
    "model_acne.png": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop",
    "model_hyper.png": "https://images.unsplash.com/photo-1552699611-e2c208d5d9cb?w=800&h=800&fit=crop",
    "model_mature.png": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=800&fit=crop",
    "model_sensitive.png": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&h=800&fit=crop"
}

dest_dir = r"c:\Users\ASUS VIVOBOOK 16X\OneDrive\Desktop\templates\Dermatology & Skincare Homepage"

for filename, url in images.items():
    filepath = os.path.join(dest_dir, filename)
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
