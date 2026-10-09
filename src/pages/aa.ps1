$ip = "191.6.138.226"
$port = 161

$packet = [byte[]](
    0x30,0x26,
    0x02,0x01,0x01,
    0x04,0x06,0x70,0x75,0x62,0x6C,0x69,0x63,
    0xA0,0x19,
    0x02,0x04,0x00,0x00,0x00,0x01,
    0x02,0x01,0x00,
    0x02,0x01,0x00,
    0x30,0x0B,
    0x30,0x09,
    0x06,0x05,0x2B,0x06,0x01,0x02,0x01,
    0x05,0x00
)

$udp = [System.Net.Sockets.UdpClient]::new()
$udp.Client.ReceiveTimeout = 3000

try {
    $udp.Connect($ip, $port)

    [void]$udp.Send($packet, $packet.Length)

    $remote = [System.Net.IPEndPoint]::new(
        [System.Net.IPAddress]::Any,
        0
    )

    $response = $udp.Receive([ref]$remote)

    Write-Host "SNMP response received!"
    Write-Host "Source: $($remote.Address):$($remote.Port)"
    Write-Host "Bytes: $($response.Length)"
    Write-Host ""
    Write-Host "Raw response:"
    ($response | ForEach-Object { "{0:X2}" -f $_ }) -join " "
}
catch {
    Write-Host "No SNMP response: $($_.Exception.Message)"
}
finally {
    $udp.Dispose()
}
