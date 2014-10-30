cd Sportana
git init
git remote add herokuTemp git@heroku.com:quiet-lake-4361.git
git add .
git commit -m "Deploying to Heroku"
git push herokuTemp master --force
rm .git -r -f