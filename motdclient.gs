#include "str_util.gs"

#define BACKSPACE = 66

global motdopen = true
global mscale = float(float(GetMonitorHeight())/1024.0)
global gamefont = LoadFont("cour", 20*menuscale, 1,0,0)
global drawntext = [255, SE_STRING]
global fsmotdsize = -1
global prevPlayerCam = 0

public def OnSpawn()
end

public def OnDisconnect()
    FreeFont(gamefont)
end

public def OnUpdate()
    if GetPlayerCamera() != prevPlayerCam then
        local bnk = CreateBank(1)
        PokeByte(bnk, 0, 7)
        SendRawPacket(bnk)
        FreeBank(bnk)
        motdopen = true
        prevPlayerCam = GetPlayerCamera()
    end
    if motdopen then
        SetFont(gamefont)
        for i=0; i<len drawntext; i++
            if drawntext[i] != 0 then
                col = DecodeColor(drawntext[i])
                Color(col[0], col[1], col[2])
                txt = Mid(drawntext[i], 10, len drawntext - 9)
                Text(20.0 * mscale, (256.0 + i * 20.0) * mscale, txt)
            end
        end
    end
    if GetPlayerCamera() != 0 and KeyHit(BACKSPACE) then
        if motdopen then
            motdopen = false
            for i=0; i<len drawntext; i++
                drawntext[i] = 0
            end
        else
            prevPlayerCam = 0
        end
    end
end

def DecodeColor(txt)
    col = [3, SE_INT]
    if len txt > 9 then
        colstr_r = Mid(txt, 1, 3)
        colstr_g = Mid(txt, 4, 3)
        colstr_b = Mid(txt, 7, 3)
        r = Int(colstr_r)
        g = Int(colstr_g)
        b = Int(colstr_b)
        col[0] = r
        col[1] = g
        col[2] = b
    end
    return col
end

public def OnReceiveRawPacket(bnk)
    if BankSize(bnk) > 0 then
        b = PeekByte(bnk, 0)
        select b
            case 6
                index = PeekByte(bnk, 1)
                if index >= 0 then
                    text = PeekString(bnk, 2)
                    drawntext[index] = text
                else
                    for i=0; i<len drawntext; i++
                        drawntext[i] = 0
                    end
                end
        end
    end
end