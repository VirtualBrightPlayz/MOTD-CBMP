#include "str_util.gs"

public def OnPlayerConnect(playerid)
    SendScript(playerid, "scripts/motdclient.gsc", "motdclient.gsc")
end

public def OnReceiveRawPacket(playerid, bnk)
    if BankSize(bnk) > 0 then
        b = PeekByte(bnk)
        select b
            case 7
                fs = ReadFile("motd.txt")
                index = 0
                SendMotd(playerid, "", -1)
                while not Eof(fs)
                    motd = ReadLine(fs)
                    SendMotd(playerid, motd, index)
                    index++
                end
                CloseFile(fs)
        end
    end
end

def SendMotd(playerid, motd, index)
    strlen = len motd
    strlen = strlen + 4
    local sbnk = CreateBank(strlen)
    PokeByte(sbnk, 0, 6)
    PokeByte(sbnk, 1, index)
    PokeString(sbnk, 2, motd)
    SendRawPacket(playerid, sbnk)
    FreeBank(sbnk)
end