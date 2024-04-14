echo "Switching to branch master"
git checkout main

echo "building app..."
npm run build

echo "deploying files to server..."
scp -r dist/* justice@51.120.242.65:/var/www/51.120.242.65

echo "Done!"