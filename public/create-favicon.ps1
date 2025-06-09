# Simple script to create a basic favicon.ico
# This creates a minimal ICO file with FinSight branding
$icoHeader = [byte[]](0,0,1,0,1,0,16,16,0,0,1,0,32,0,64,2,0,0,22,0,0,0)
$bmpHeader = [byte[]](40,0,0,0,16,0,0,0,32,0,0,0,1,0,32,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)

# Create a simple 16x16 blue gradient icon with white chart bars
$pixels = @()
for ($y = 0; $y -lt 16; $y++) {
    for ($x = 0; $x -lt 16; $x++) {
        if (($x -eq 3 -and $y -ge 10) -or ($x -eq 6 -and $y -ge 8) -or ($x -eq 9 -and $y -ge 6) -or ($x -eq 12 -and $y -ge 12)) {
            # White bars for chart
            $pixels += [byte[]](255,255,255,255)
        } elseif ($x -lt 8 -and $y -lt 8) {
            # Light blue gradient
            $pixels += [byte[]](235,156,37,255)
        } else {
            # Dark blue gradient
            $pixels += [byte[]](225,99,37,255)
        }
    }
}

# Add alpha mask (all visible)
$mask = @()
for ($i = 0; $i -lt 32; $i++) { $mask += [byte]0 }

$icoData = $icoHeader + $bmpHeader + $pixels + $mask
[System.IO.File]::WriteAllBytes("favicon.ico", $icoData)
