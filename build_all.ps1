$ErrorActionPreference = "Stop"

Write-Host "Building React SaaS..."
cd "c:\Users\yashp\Desktop\BT market\templates\react-saas"
npm install
npm run build
New-Item -ItemType Directory -Force -Path "c:\Users\yashp\Desktop\BT market\frontend\public\previews\react-saas-landing-page"
Copy-Item -Path "dist\*" -Destination "c:\Users\yashp\Desktop\BT market\frontend\public\previews\react-saas-landing-page" -Recurse -Force
Remove-Item -Path "dist" -Recurse -Force
Remove-Item -Path "node_modules" -Recurse -Force

Write-Host "Building Vue Admin..."
cd "c:\Users\yashp\Desktop\BT market\templates\vue-admin"
npm install
npm run build
New-Item -ItemType Directory -Force -Path "c:\Users\yashp\Desktop\BT market\frontend\public\previews\vue-admin-dashboard"
Copy-Item -Path "dist\*" -Destination "c:\Users\yashp\Desktop\BT market\frontend\public\previews\vue-admin-dashboard" -Recurse -Force
Remove-Item -Path "dist" -Recurse -Force
Remove-Item -Path "node_modules" -Recurse -Force

Write-Host "Building Next Portfolio..."
cd "c:\Users\yashp\Desktop\BT market\templates\next-portfolio"
npm install
npm run build
New-Item -ItemType Directory -Force -Path "c:\Users\yashp\Desktop\BT market\frontend\public\previews\next-developer-portfolio"
Copy-Item -Path "out\*" -Destination "c:\Users\yashp\Desktop\BT market\frontend\public\previews\next-developer-portfolio" -Recurse -Force
Remove-Item -Path "out" -Recurse -Force
Remove-Item -Path ".next" -Recurse -Force
Remove-Item -Path "node_modules" -Recurse -Force

Write-Host "Building Svelte E-commerce..."
cd "c:\Users\yashp\Desktop\BT market\templates\svelte-ecommerce"
npm install
npm run build
New-Item -ItemType Directory -Force -Path "c:\Users\yashp\Desktop\BT market\frontend\public\previews\svelte-e-commerce"
Copy-Item -Path "dist\*" -Destination "c:\Users\yashp\Desktop\BT market\frontend\public\previews\svelte-e-commerce" -Recurse -Force
Remove-Item -Path "dist" -Recurse -Force
Remove-Item -Path "node_modules" -Recurse -Force

Write-Host "Copying HTML Fitness..."
New-Item -ItemType Directory -Force -Path "c:\Users\yashp\Desktop\BT market\frontend\public\previews\html-elite-fitness"
Copy-Item -Path "c:\Users\yashp\Desktop\BT market\templates\html-fitness\*" -Destination "c:\Users\yashp\Desktop\BT market\frontend\public\previews\html-elite-fitness" -Recurse -Force

Write-Host "Zipping all templates..."
cd "c:\Users\yashp\Desktop\BT market\templates"
if (Test-Path "react-saas.zip") { Remove-Item "react-saas.zip" }
if (Test-Path "vue-admin.zip") { Remove-Item "vue-admin.zip" }
if (Test-Path "next-portfolio.zip") { Remove-Item "next-portfolio.zip" }
if (Test-Path "svelte-ecommerce.zip") { Remove-Item "svelte-ecommerce.zip" }
if (Test-Path "html-fitness.zip") { Remove-Item "html-fitness.zip" }

Compress-Archive -Path "react-saas\*" -DestinationPath "react-saas.zip"
Compress-Archive -Path "vue-admin\*" -DestinationPath "vue-admin.zip"
Compress-Archive -Path "next-portfolio\*" -DestinationPath "next-portfolio.zip"
Compress-Archive -Path "svelte-ecommerce\*" -DestinationPath "svelte-ecommerce.zip"
Compress-Archive -Path "html-fitness\*" -DestinationPath "html-fitness.zip"

Write-Host "Done!"
