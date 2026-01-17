# JUNE-X WhatsApp Bot

## Overview
This is a WhatsApp bot (JUNE-X) that connects to WhatsApp using the Baileys library. It's a console-based application that requires authentication via a session ID or pairing code.

## Project Structure
- `index.js` - Main bot entry point (obfuscated code)
- `package.json` - Node.js dependencies
- `Dockerfile` - Docker deployment configuration
- `app.json` - Heroku deployment configuration

## Setup Requirements
- Node.js 18+
- ffmpeg, imagemagick, libwebp (system dependencies)
- SESSION_ID environment variable (obtained from WhatsApp pairing)

## Running the Bot
The bot runs as a console application via `npm start`. On first run, it will prompt to either:
1. Enter a WhatsApp phone number to get a pairing code
2. Paste an existing session ID

## Environment Variables
- `SESSION_ID` - WhatsApp session identifier (must begin with 'JUNE-MD:~')

## Recent Changes
- 2026-01-17: Initial setup for Replit environment with system dependencies (ffmpeg, imagemagick, libwebp)
