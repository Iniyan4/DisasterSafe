from pathlib import Path

# Files to create
files = [
    "app/_layout.tsx",
    "app/index.tsx",
    "app/map.tsx",
    "app/alerts.tsx",
    "app/profile.tsx",
    "src/components/ActionButton.tsx",
    "src/components/BottomNav.tsx",
    "src/theme/colors.ts",
]

# Standalone directories to create
directories = [
    "assets",
]

# Create directories
for dir_path in directories:
    Path(dir_path).mkdir(parents=True, exist_ok=True)

# Create files (and parent directories)
for file_path in files:
    path = Path(file_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.touch(exist_ok=True)

print("File structure created successfully.")