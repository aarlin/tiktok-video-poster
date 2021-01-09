# TikTok Video Poster

## Problem to Solve

Sharing Tiktok videos on Discord just gives the link to share.  
The users of the Discord server have to manually click the link to be sent to a browser to view the video.  
This discord bot recognizes tiktok video links and uploads the video for easier viewing.  

## Install

`docker build -t tiktok .`  
`docker run tiktok`  

## Todos

- [ ] put into ec2 w/ docker
- [ ] look at upload limits for bot
- [ ] reply to user with username of poster with link, description & tags
- [ ] fix issues with windows & linux related backslash & forward slash

## References

discord.js  
tiktok-search  
