<img width="800" height="296" alt="image" src="https://github.com/user-attachments/assets/998dbb1e-c998-467a-9399-afd151fdeefb" />

This is MoviePin app that use Api to pull out movies data. This data is then transformed into information that will benefit the user who is searching for the best movie to watch.

Using docker, i built an image from the folder holding this app (using "docker build -t docker-username/name-of-app:tag") which will build this image based on instructions from Dockerfile document. After the image is built, i checked if it is working by running this image on localport (using "docker run -d -p 8080:80 docker-username/name-of-app:tag"). Then i logged into docker hub to push this built image on this hub. After logging in, i pushed it. 

Going on, i had to pull this image from the hub to the web01 and web02 and configure lb01 to distribute the traffic to these two webservers using round robin. Firstly, i cloned the github repo to my local computer and configured compose.yml to pull moviepin app image because docker wouldn't work in those servers(web01 & web02). After i built them images(web01, web02 & lb01), i proceeded with installing haproxy in lb01 then configured haproxy.cfg to distribute traffic using round robin. 

<img width="1919" height="1079" alt="Screenshot 2025-08-01 010821" src="https://github.com/user-attachments/assets/4e4ecebb-6d87-4bec-90cd-30e0f9f06ae9" />

This is my video talking about how it work:
