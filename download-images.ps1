# Create blog images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "assets/images/blog"

# Download images
$images = @{
    "workspace.jpg" = "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=1200&q=80"
    "peaceful-workspace.jpg" = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
    "organized-desk.jpg" = "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1200&q=80"
    "world-map.jpg" = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80"
    "yoga-setting.jpg" = "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
}

foreach ($image in $images.GetEnumerator()) {
    $outputPath = "assets/images/blog/$($image.Key)"
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key)"
}

Write-Host "All images downloaded successfully!" 