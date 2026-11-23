# Ljusrum – fotoworkshop

Statisk webbplats utan byggsteg. Alla filer ligger i en och samma mapp. `/` är startsidan och `/admin` är adminsidan (mockdata, ingen inloggning eller databas).

Kör lokalt: `python3 -m http.server 8000` och öppna http://localhost:8000 och http://localhost:8000/admin.html

Publicera på Vercel: lägg mappen i ett GitHub-repo, välj "Add New… Project" i Vercel, importera repot och lämna Framework Preset på "Other" utan build command. Stäng sedan av Vercel Authentication under Project Settings > Deployment Protection så att länken öppnas utan Vercel-login.
