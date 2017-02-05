# Node Git Deploy

An ExpressJS implementation that listens for a git push event on a specific branch (via a webhook) and automatically updates your cloned repo in your server.

### Usage
1. Add a webhook to your repo through your repo's Settings -> Webhooks
2. Enter your Payload URL (the cloned application running in your live server)
3. select "application/json" for the Content type. 
4. Add a secret key
5. Select "Just the push event." for the event type.

You should be good to. Do a test push and see if the app responds to the webhook event. 