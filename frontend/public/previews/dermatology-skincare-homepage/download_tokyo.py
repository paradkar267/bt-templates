import urllib.request
import os

url = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
dest_path = r"c:\Users\ASUS VIVOBOOK 16X\OneDrive\Desktop\templates\Dermatology & Skincare Homepage\store_tokyo.png"

try:
    urllib.request.urlretrieve(url, dest_path)
    print("Downloaded store_tokyo.png")
except Exception as e:
    print(f"Failed to download: {e}")
