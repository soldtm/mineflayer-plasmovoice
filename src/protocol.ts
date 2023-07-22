export default {
    "types": {
      "pstring": "native",
      "i32": "native",
      "u8": "native",
      "bool": "native",
      "string": [
        "pstring",
        {
          "countType": "u16"
        }
      ],
      "short": "i16",
      "int": "i32",
      "long": "i64",
      "uuid": [
        "container",
        [
          {
            "name": "mostSignificantBits",
            "type": "u64"
          },
          {
            "name": "lessSignificantBits",
            "type": "u64"
          }
        ]
      ],
      "hashmap": [
        "array",
        {
          "countType": "int",
          "type": [
            "container",
            [
              {
                "name": "key",
                "type": "string"
              },
              {
                "name": "value",
                "type": "string"
              }
            ]
          ]
        }
      ],
      "codecInfo": [
        "container",
        [
          {
            "name": "codec_name",
            "type": "string"
          },
          {
            "name": "codec_params",
            "type": "hashmap"
          }
        ]
      ]
    },
    "login": {
      "toClient": {
        "types": {
          "plasmovoice_ConnectionPacket": [
            "container",
            [
              {
                "name": "secret",
                "type": "uuid"
              },
              {
                "name": "ip",
                "type": "string"
              },
              {
                "name": "port",
                "type": "int"
              }
            ]
          ],
          "plasmovoice_PlayerInfoPacket": [
            "container",
            [
              {
                "name": "voiceDisabled",
                "type": "bool"
              },
              {
                "name": "microphoneMuted",
                "type": "bool"
              },
              {
                "name": "minecraftVersion",
                "type": "string"
              },
              {
                "name": "version",
                "type": "string"
              },
              {
                "name": "publicKey",
                "type": [
                  "buffer",
                  {
                    "countType": "int"
                  }
                ]
              }
            ]
          ],
          "plasmovoice_ConfigPacket": [
            "container",
            [
              {
                "name": "serverId",
                "type": "uuid"
              },
              {
                "name": "captureInfo",
                "type": [
                  "container",
                  [
                    {
                      "name": "sampleRate",
                      "type": "int"
                    },
                    {
                      "name": "mtuSize",
                      "type": "int"
                    },
                    {
                      "name": "hasEncoderInfo",
                      "type": "bool"
                    },
                    {
                      "name": "encoderInfo",
                      "type": [
                        "switch",
                        {
                          "compareTo": "hasEncoderInfo",
                          "fields": {
                            "false": "void",
                            "true": "codecInfo"
                          }
                        }
                      ]
                    }
                  ]
                ]
              },
              {
                "name": "hasEncryptionInfo",
                "type": "bool"
              },
              {
                "name": "encryptionInfo",
                "type": [
                  "switch",
                  {
                    "compareTo": "hasEncryptionInfo",
                    "fields": {
                      "false": "void",
                      "true": [
                        "container",
                        [
                          {
                            "name": "algorithm",
                            "type": "string"
                          },
                          {
                            "name": "data",
                            "type": [
                              "buffer",
                              {
                                "countType": "int"
                              }
                            ]
                          }
                        ]
                      ]
                    }
                  }
                ]
              },
              {
                "name": "sourceLines",
                "type": [
                  "array",
                  {
                    "countType": "int",
                    "type": [
                      "container",
                      [
                        {
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "name": "translation",
                          "type": "string"
                        },
                        {
                          "name": "icon",
                          "type": "string"
                        },
                        {
                          "name": "defaultVolume",
                          "type": "long"
                        },
                        {
                          "name": "weight",
                          "type": "int"
                        },
                        {
                          "name": "hasPlayers",
                          "type": "bool"
                        },
                        {
                          "name": "players",
                          "type": [
                            "switch",
                            {
                              "compareTo": "hasPlayers",
                              "fields": {
                                "false": "void",
                                "true": [
                                  "container",
                                  [
                                    {
                                      "name": "id",
                                      "type": "uuid"
                                    },
                                    {
                                      "name": "name",
                                      "type": "string"
                                    },
                                    {
                                      "name": "properties",
                                      "type": [
                                        "array",
                                        {
                                          "countType": "int",
                                          "type": [
                                            "containter",
                                            [
                                              {
                                                "name": "name",
                                                "type": "string"
                                              },
                                              {
                                                "name": "value",
                                                "type": "string"
                                              },
                                              {
                                                "name": "signature",
                                                "type": "string"
                                              }
                                            ]
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                ]
                              }
                            }
                          ]
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                "name": "activations",
                "type": [
                  "array",
                  {
                    "countType": "int",
                    "type": [
                      "container",
                      [
                        {
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "name": "translation",
                          "type": "string"
                        },
                        {
                          "name": "icon",
                          "type": "string"
                        },
                        {
                          "name": "distances",
                          "type": [
                            "array",
                            {
                              "countType": "int",
                              "type": "int"
                            }
                          ]
                        },
                        {
                          "name": "defaultDistance",
                          "type": "int"
                        },
                        {
                          "name": "proximity",
                          "type": "bool"
                        },
                        {
                          "name": "transitive",
                          "type": "bool"
                        },
                        {
                          "name": "stereoSupported",
                          "type": "bool"
                        },
                        {
                          "name": "hasEncoderInfo",
                          "type": "bool"
                        },
                        {
                          "name": "encoderInfo",
                          "type": [
                            "switch",
                            {
                              "compareTo": "hasEncoderInfo",
                              "fields": {
                                "false": "void",
                                "true": "codecInfo"
                              }
                            }
                          ]
                        },
                        {
                          "name": "weight",
                          "type": "int"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                "name": "permissions",
                "type": [
                  "array",
                  {
                    "countType": "int",
                    "type": [
                      "container",
                      [
                        {
                          "name": "key",
                          "type": "string"
                        },
                        {
                          "name": "value",
                          "type": "bool"
                        }
                      ]
                    ]
                  }
                ]
              }
            ]
          ],
          "plasmovoice_PlayerInfoRequestPacket": [
            "container",
            []
          ],
          "plasmovoice_LanguageRequestPacket": [
            "container",
            [
              {
                "name": "language",
                "type": "string"
              }
            ]
          ],
          "VoicePlayerInfo": [
            "container",
            [
              {
                "name": "playerId",
                "type": "uuid"
              },
              {
                "name": "playerNick",
                "type": "string"
              },
              {
                "name": "muted",
                "type": "bool"
              },
              {
                "name": "voiceDisabled",
                "type": "bool"
              },
              {
                "name": "microphoneMuted",
                "type": "bool"
              }
            ]
          ],
          "plasmovoice_PlayerListPacket": [
            "container",
            [
              {
                "name": "players",
                "type": [
                  "array",
                  {
                    "countType": "int",
                    "type": "VoicePlayerInfo"
                  }
                ]
              }
            ]
          ],
          "plasmovoice_PlayerInfoUpdatePacket": "VoicePlayerInfo",
          "plasmovoice_LanguagePacket": [
            "container",
            [
              {
                "name": "languageName",
                "type": "string"
              },
              {
                "name": "language",
                "type": "hashmap"
              }
            ]
          ],
          "plasmovoice_packet": [
            "container",
            [
              {
                "name": "id",
                "type": [
                  "mapper",
                  {
                    "type": "u8",
                    "mappings": {
                      "1": "ConnectionPacket",
                      "2": "PlayerInfoRequestPacket",
                      "3": "ConfigPacket",
                      "4": "ConfigPlayerInfoPacket",
                      "5": "LanguageRequestPacket",
                      "6": "LanguagePacket",
                      "7": "PlayerListPacket",
                      "8": "PlayerInfoUpdatePacket",
                      "9": "PlayerDisconnectPacket",
                      "10": "PlayerInfoPacket",
                      "11": "PlayerStatePacket",
                      "12": "PlayerAudioEndPacket",
                      "13": "PlayerActivationDistancesPacket",
                      "14": "DistanceVisualizePacket",
                      "15": "SourceInfoRequestPacket",
                      "16": "SourceInfoPacket",
                      "17": "SelfSourceInfoPacket",
                      "18": "SourceAudioEndPacket",
                      "19": "ActivationRegisterPacket",
                      "20": "ActivationUnregisterPacket",
                      "21": "SourceLineRegisterPacket",
                      "22": "SourceLineUnregisterPacket",
                      "23": "SourceLinePlayerAddPacket",
                      "24": "SourceLinePlayerRemovePacket",
                      "25": "SourceLinePlayersListPacket",
                      "26": "AnimatedActionBarPacket"
                    }
                  }
                ]
              },
              {
                "name": "data",
                "type": [
                  "switch",
                  {
                    "compareTo": "id",
                    "fields": {
                      "ConnectionPacket": "plasmovoice_ConnectionPacket",
                      "ConfigPacket": "plasmovoice_ConfigPacket",
                      "PlayerInfoPacket": "plasmovoice_PlayerInfoPacket",
                      "PlayerListPacket": "plasmovoice_PlayerListPacket",
                      "PlayerInfoUpdatePacket": "plasmovoice_PlayerInfoUpdatePacket",
                      "LanguagePacket": "plasmovoice_LanguagePacket",
                      "LanguageRequestPacket": "plasmovoice_LanguageRequestPacket"
                    },
                    "default": "void"
                  }
                ]
              }
            ]
          ]
        }
      }
    },
    "udp": {
      "types": {
        "plasmovoiceudp_PingPacket": [
          "container",
          [
            {
              "name": "currentTime",
              "type": "long"
            }
          ]
        ],
        "plasmovoiceudp_PlayerAudioPacket": [
          "container",
          [
            {
              "name": "sequenceNumber",
              "type": "long"
            },
            {
              "name": "data",
              "type": [
                "buffer",
                {
                  "countType": "int"
                }
              ]
            },
            {
              "name": "activationId",
              "type": "uuid"
            },
            {
              "name": "distance",
              "type": "short"
            },
            {
              "name": "stereo",
              "type": "bool"
            }
          ]
        ],
        "plasmovoiceudp_SelfAudioInfoPacket": [
          "container",
          [
            {
              "name": "sourceId",
              "type": "uuid"
            },
            {
              "name": "sequenceNumber",
              "type": "long"
            },
            {
              "name": "hasData",
              "type": "bool"
            },
            {
              "name": "data",
              "type": [
                "switch",
                {
                  "compareTo": "hasData",
                  "fields": {
                    "false": "void",
                    "true": [
                      "buffer",
                      {
                        "countType": "int"
                      }
                    ]
                  },
                  "default": "void"
                }
              ]
            },
            {
              "name": "distance",
              "type": "short"
            }
          ]
        ],
        "plasmovoiceudp_packet": [
          "container",
          [
            {
              "name": "magic_number",
              "type": "int"
            },
            {
              "name": "id",
              "type": [
                "mapper",
                {
                  "type": "u8",
                  "mappings": {
                    "1": "PingPacket",
                    "2": "PlayerAudioPacket",
                    "3": "SourceAudioPacket",
                    "4": "SelfAudioInfoPacket",
                    "256": "CustomPacket"
                  }
                }
              ]
            },
            {
              "name": "secret",
              "type": "uuid"
            },
            {
              "name": "currentTime",
              "type": "long"
            },
            {
              "name": "data",
              "type": [
                "switch",
                {
                  "compareTo": "id",
                  "fields": {
                    "PingPacket": "plasmovoiceudp_PingPacket",
                    "PlayerAudioPacket": "plasmovoiceudp_PlayerAudioPacket",
                    "SelfAudioInfoPacket": "plasmovoiceudp_SelfAudioInfoPacket"
                  },
                  "default": "void"
                }
              ]
            }
          ]
        ]
      }
    }
  }