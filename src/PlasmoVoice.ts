// Libraries
import VoiceServer from "./VoiceServer";
import PacketManager from "./PacketManager";
import fs from "fs";

// Types
import { Bot } from "mineflayer";
import VoiceRecoder from "./VoiceRecoder";
import Utils from "./Utils";

export let debug = false;

export default class PlasmoVoice {

    // System variables
    private readonly bot: Bot;

    // Class initialization
    constructor(bot: Bot) {
        this.bot = bot;

        // Initialize packet manager
        PacketManager.init(this.bot);
        // Initialize voice server
        VoiceServer.init(this.bot);

        // Listen plugin channels
        this.bot._client.on("plasmo:voice/v2", async (packet) => {
            
            Utils.debug(`[plasmo:voice/v2] Recieved ${packet.id}`);

            if (packet.id == 'PlayerInfoRequestPacket') {
                // PlayerInfoPacket
                Utils.debug("[plasmo:voice/v2] Sending PlayerInfoPacket");
                this.bot._client.writeChannel("plasmo:voice/v2",
                    {
                        "id": "PlayerInfoPacket",
                        "data": {
                            voiceDisabled: false,
                            microphoneMuted: false,
                            minecraftVersion: bot.version,
                            version: "2.0.3",
                            publicKey: PacketManager.publicKey
                        }
                    }
                );
                return;
            } else if (packet.id == 'ConnectionPacket') {
                const data: ConnectionPacket = packet.data;

                // Create voice server
                if (data.ip == "0.0.0.0") {
                    await VoiceServer.connect(Utils.getHost(this.bot), data.port, data.secret);
                } else {
                    await VoiceServer.connect(data.ip, data.port, data.secret);
                }

                return;
            } else if (packet.id == 'ConfigPacket') {
                const data: ConfigPacket = packet.data;

                // Save data from this packet
                PacketManager.configPacketData = data;
                PacketManager.aesKey = await PacketManager.getAESKey();

                // Check for correct encryption
                if (data.hasEncryptionInfo == false) {
                    throw new Error(`Encryption is disabled`);
                } else if (data.encryptionInfo.algorithm != "AES/CBC/PKCS5Padding") {
                    throw new Error(`Unsupported encryption type "${data.encryptionInfo.algorithm}"`);
                }

                this.bot.emit("voicechat_connected");
                
                return;
            } else if (packet.id == 'SourceInfoPacket') {
                const data: SourceInfoPacket = packet.data;

                // Don't save a player, if it's exists
                if (PacketManager.sourceById.some(item => item.playerName == data.playerInfo.playerNick)) {
                    return;
                }

                PacketManager.sourceById.push({
                    "sourceId": data.id,
                    "playerName": data.playerInfo.playerNick
                })

                Utils.debug(PacketManager.sourceById);

                return;
            } else if (packet.id == 'SourceAudioEndPacket') {
                const data: SourceAudioEndPacket = packet.data;

                const sourceData = PacketManager.sourceById.find(item => Utils.objectEquals(item.sourceId, data.sourceId));
                if (!sourceData) {
                    Utils.debug(`Unknown sourceId in SourceAudioEndPacket`);
                    return;
                }
                
                this.bot.emit("voicechat_voice_end", {
                    "player": sourceData.playerName,
                    "sequenceNumber": data.sequenceNumber
                })

                return;
            }

            Utils.debug(`[plasmo:voice/v2] Skipped ${packet.id}`);
        })
    }

    async sendAudio(file: string, distance: number = 16, speed: number = 1.0, isStereo: boolean = false): Promise<void> {
        if (!fs.existsSync(file)) {
            throw new Error("File not found");
        }

        Utils.debug("[sendAudio] Converting given soundfile to PCM")
        var pcmBuffer = await VoiceRecoder.convertToPCM(file, PacketManager.configPacketData.captureInfo.sampleRate, speed, isStereo);
        VoiceServer.sendPCM(pcmBuffer, distance, isStereo);
    }

    async sendPCM(file: string, distance: number = 16, isStereo: boolean = false): Promise<void> {
        VoiceServer.sendPCM(fs.readFileSync(file), distance, isStereo);
    }

    getSampleRate(): number {
        return PacketManager.configPacketData.captureInfo.sampleRate;
    }

    getAllowedDistances(): number[] {
        const proximity = PacketManager.getProximityActivation();
        if (!proximity) { return []; }
        return proximity?.distances;
    }

    getDefaultDistance(): number {
        const proximity = PacketManager.getProximityActivation();
        if (!proximity) { return -1; }
        return proximity?.defaultDistance;
    }

    // Asked by NonemJS
    forceConnect(): void {
        PacketManager.registerAll();
    }

    /**
     * @deprecated The method should not be used (pro-users only)
     */
    async _sendPacket(packetId: string, data: Object) {
        this.bot._client.writeChannel("plasmo:voice/v2",
            {
                "id": packetId,
                "data": data
            }
        );
    }

    /**
     * @deprecated The method should not be used (pro-users only)
     */
    async _sendPacketUDP(packetId: string, data: Object) {
        const packet = await PacketManager.encodeUDP(data, packetId, VoiceServer.udpSecret);
        VoiceServer.sendBuffer(packet);
    }

    /**
     * @deprecated The method should not be used (pro-users only)
     */
    async _getActivationName(activationName: string) {
        return await VoiceServer.getActivationUUID(activationName);
    }

    async updateState(microphoneMuted: boolean = false, voiceDisabled: boolean = false) {
        this.bot._client.writeChannel("plasmo:voice/v2",
            {
                "id": "PlayerStatePacket",
                "data": {
                    "voiceDisabled": voiceDisabled,
                    "microphoneMuted": microphoneMuted
                }
            }
        );
    }

    enableDebug(): void {
        debug = true;
    }
}
