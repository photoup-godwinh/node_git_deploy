# Node Git Deploy

An ExpressJS implementation that listens for a git push event on a specific branch (via a webhook) and automatically updates your cloned repo in your server.

### Usage
1. Add a webhook to your repo through your repo's Settings -> Webhooks
2. Enter your Payload URL (the live URL of this cloned application)
3. Select "application/json" for the Content type. 
4. Add your secret key.
5. Select "Just the push event." for the event type.
6. Copy constants/constants.example.js and rename to constants.js
7. In the constants.js, set the branch that you want to listen to. And change the secret key that you added from step #4.
8. Copy shell_scripts/deploy.example.sh and rename to deploy.sh
9. Enter the git commands or other bower/npm commands that you want to perform on a push event.

You should be good to. Do a test push and see if the app responds to the webhook event. 