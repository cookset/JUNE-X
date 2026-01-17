const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const config = require('./config');
const messageHandler = require('./handlers/messageHandler');
const webhooks = require('./api/webhooks');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());
app.use('/api', webhooks);

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            logger.info('New QR Code generated. Scan it to log in.');
            require('qrcode-terminal').generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true;
            logger.info('Connection closed, reconnecting: ' + shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            logger.info('WhatsApp connection established!');
        }
    });

    conn.ev.on('creds.update', saveCreds);

    conn.ev.on('messages.upsert', async (m) => {
        if (m.type === 'append' || m.type === 'notify') {
            for (const msg of m.messages) {
                if (!msg.key.fromMe) {
                    await messageHandler(conn, msg);
                }
            }
        }
    });

    // Start Express Server
    app.listen(config.PORT, '0.0.0.0', () => {
        logger.info(`Server running on port ${config.PORT}`);
    });

    return conn;
}

startBot().catch(err => logger.error('Startup error: ' + err.message));
