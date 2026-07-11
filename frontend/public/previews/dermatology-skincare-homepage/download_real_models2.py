import urllib.request
import os

images = {
    "model_hyper.png": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop",
}

dest_dir = r"c:\Users\ASUS VIVOBOOK 16X\OneDrive\Desktop\templates\Dermatology & Skincare Homepage"

for filename, url in images.items():
    filepath = os.path.join(dest_dir, filename)
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
